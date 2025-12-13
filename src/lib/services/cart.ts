/**
 * Cart Service
 * Handles cart operations using Shopify Storefront API
 */

import { shopify, isShopifyConfigured } from '../shopify';

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
            images: {
              edges: Array<{
                node: {
                  url: string;
                };
              }>;
            };
          };
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

const CART_CREATE_MUTATION = `
  mutation cartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_QUERY = `
  query getCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

/**
 * Create a new cart
 */
export async function createCart(): Promise<Cart> {
  // Check if Shopify is configured
  if (!isShopifyConfigured) {
    throw new Error('Shopify is not configured');
  }

  try {
    const response = await shopify.request<{
      cartCreate: {
        cart: Cart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>(CART_CREATE_MUTATION);

    if (response.data.cartCreate.userErrors && response.data.cartCreate.userErrors.length > 0) {
      throw new Error(response.data.cartCreate.userErrors.map(e => e.message).join(', '));
    }

    if (!response.data.cartCreate.cart) {
      throw new Error('Failed to create cart');
    }

    // Store cart ID in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopify_cart_id', response.data.cartCreate.cart.id);
    }

    return response.data.cartCreate.cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

/**
 * Get existing cart by ID
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const response = await shopify.request<{
      cart: Cart | null;
    }>(CART_QUERY, { id: cartId });

    return response.data.cart;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

/**
 * Add item to cart
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  try {
    const response = await shopify.request<{
      cartLinesAdd: {
        cart: Cart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>(CART_LINES_ADD_MUTATION, {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    });

    if (response.data.cartLinesAdd.userErrors && response.data.cartLinesAdd.userErrors.length > 0) {
      throw new Error(response.data.cartLinesAdd.userErrors.map(e => e.message).join(', '));
    }

    if (!response.data.cartLinesAdd.cart) {
      throw new Error('Failed to add item to cart');
    }

    return response.data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          url
                        }
                      }
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

/**
 * Remove item from cart
 */
export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  try {
    const response = await shopify.request<{
      cartLinesRemove: {
        cart: Cart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>(CART_LINES_REMOVE_MUTATION, {
      cartId,
      lineIds: [lineId],
    });

    if (response.data.cartLinesRemove.userErrors && response.data.cartLinesRemove.userErrors.length > 0) {
      throw new Error(response.data.cartLinesRemove.userErrors.map(e => e.message).join(', '));
    }

    if (!response.data.cartLinesRemove.cart) {
      throw new Error('Failed to remove item from cart');
    }

    return response.data.cartLinesRemove.cart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

/**
 * Update item quantity in cart
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  try {
    const response = await shopify.request<{
      cartLinesUpdate: {
        cart: Cart | null;
        userErrors: Array<{ field: string[]; message: string }>;
      };
    }>(CART_LINES_UPDATE_MUTATION, {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    });

    if (response.data.cartLinesUpdate.userErrors && response.data.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(response.data.cartLinesUpdate.userErrors.map(e => e.message).join(', '));
    }

    if (!response.data.cartLinesUpdate.cart) {
      throw new Error('Failed to update cart item');
    }

    return response.data.cartLinesUpdate.cart;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

/**
 * Get or create cart (helper function)
 */
export async function getOrCreateCart(): Promise<Cart> {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not available');
  }

  const cartId = localStorage.getItem('shopify_cart_id');

  if (cartId) {
    const cart = await getCart(cartId);
    if (cart) {
      return cart;
    }
    // If cart doesn't exist, remove from localStorage
    localStorage.removeItem('shopify_cart_id');
  }

  return createCart();
}

