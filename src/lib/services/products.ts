/**
 * Product Service
 * Handles all product-related Shopify API calls
 */

import { shopify, isShopifyConfigured } from '../shopify';

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  handle: string;
  variantId: string;
  available: boolean;
}

export interface ProductDetail extends Product {
  images: string[];
  variants: Array<{
    id: string;
    title: string;
    price: string;
    available: boolean;
  }>;
}

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

/**
 * Fetch all products from Shopify
 */
export async function getProducts(first: number = 20): Promise<Product[]> {
  // Check if Shopify is configured
  if (!isShopifyConfigured) {
    throw new Error('Shopify is not configured');
  }

  try {
    const response = await shopify.request<{
      products: {
        edges: Array<{
          node: ShopifyProduct;
        }>;
      };
    }>(PRODUCTS_QUERY, { first });

    if (!response.data?.products?.edges) {
      return [];
    }

    return response.data.products.edges.map((edge) => {
      const product = edge.node;
      const variant = product.variants.edges[0]?.node;
      const image = product.images.edges[0]?.node;

      return {
        id: product.id,
        name: product.title,
        price: formatPrice(product.priceRange.minVariantPrice.amount),
        image: image?.url || '/placeholder.svg',
        description: product.description || '',
        handle: product.handle,
        variantId: variant?.id || '',
        available: variant?.availableForSale || false,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by handle (returns full product details)
 */
export async function getProduct(handle: string): Promise<ProductDetail | null> {
  try {
    const response = await shopify.request<{
      product: ShopifyProduct | null;
    }>(PRODUCT_QUERY, { handle });

    if (!response.data?.product) {
      return null;
    }

    const product = response.data.product;
    const variant = product.variants.edges[0]?.node;
    const firstImage = product.images.edges[0]?.node;

    // Get all images
    const images = product.images.edges.map(edge => edge.node.url);

    // Get all variants
    const variants = product.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      price: formatPrice(edge.node.price.amount),
      available: edge.node.availableForSale,
    }));

    return {
      id: product.id,
      name: product.title,
      price: formatPrice(product.priceRange.minVariantPrice.amount),
      image: firstImage?.url || '/placeholder.svg',
      images: images.length > 0 ? images : ['/placeholder.svg'],
      description: product.description || '',
      handle: product.handle,
      variantId: variant?.id || '',
      available: variant?.availableForSale || false,
      variants,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Format price in ZAR format
 */
function formatPrice(amount: string): string {
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return 'R0.00';
  }
  return `R${numAmount.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

