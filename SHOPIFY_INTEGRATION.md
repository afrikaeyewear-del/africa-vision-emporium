# Shopify Integration Guide for Africa Vision Emporium

This guide will help you connect your Africa Vision Emporium website to Shopify for e-commerce functionality.

## Overview

There are several ways to integrate Shopify with your React application:

1. **Shopify Storefront API** (Recommended) - Full control over your frontend
2. **Shopify Buy Button** - Simple embed solution
3. **Shopify App Bridge** - For embedded apps
4. **Shopify Admin API** - For backend operations

For this project, we'll use the **Shopify Storefront API** which gives you full control over the shopping experience while leveraging Shopify's backend.

## Prerequisites

- A Shopify store (you can start with a free trial at shopify.com)
- Admin access to your Shopify store
- Node.js and npm/yarn installed
- Basic understanding of React and API calls

## Step 1: Set Up Your Shopify Store

1. **Create a Shopify Store** (if you haven't already)
   - Go to [shopify.com](https://www.shopify.com)
   - Sign up for an account
   - Complete the store setup process

2. **Add Your Products**
   - In your Shopify admin, go to Products
   - Add all your eyewear products with:
     - Product name
     - Description
     - Images
     - Price (in ZAR - South African Rand)
     - Variants (if applicable)

## Step 2: Enable Storefront API

1. **Create a Private App**
   - In Shopify Admin, go to **Settings** → **Apps and sales channels**
   - Click **Develop apps** → **Create an app**
   - Name it "Africa Vision Emporium Storefront"
   - Click **Create app**

2. **Configure Storefront API Permissions**
   - Click **Configure Admin API scopes**
   - For Storefront API, you need:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_checkouts`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_write_customers`
     - `unauthenticated_read_customers`
   - Click **Save**

3. **Install the App**
   - Click **Install app**
   - After installation, go to **API credentials** tab
   - Under **Storefront API**, click **Reveal token once**
   - **Copy the Storefront API access token** - you'll need this!

4. **Get Your Store Domain**
   - Your store domain will be something like: `your-store-name.myshopify.com`
   - Note this down

## Step 3: Install Shopify Dependencies

In your project directory, install the Shopify Storefront API client:

```bash
npm install @shopify/storefront-api-client
# or
yarn add @shopify/storefront-api-client
```

## Step 4: Create Environment Variables

Create a `.env` file in your project root (if it doesn't exist):

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here
```

**Important:** Add `.env` to your `.gitignore` file to keep your tokens secure!

## Step 5: Create Shopify Service

Create a new file `src/lib/shopify.ts`:

```typescript
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-01',
  publicAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// GraphQL query to fetch all products
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
        }
      }
    }
  }
`;

// GraphQL query to fetch a single product
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

// GraphQL mutation to create a checkout
const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              variant {
                title
                price {
                  amount
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const shopify = {
  // Fetch all products
  async getProducts(first: number = 20) {
    const response = await client.request(PRODUCTS_QUERY, {
      variables: { first },
    });
    return response.data;
  },

  // Fetch a single product by handle
  async getProduct(handle: string) {
    const response = await client.request(PRODUCT_QUERY, {
      variables: { handle },
    });
    return response.data;
  },

  // Create a checkout
  async createCheckout(variantId: string, quantity: number = 1) {
    const response = await client.request(CHECKOUT_CREATE_MUTATION, {
      variables: {
        input: {
          lineItems: [
            {
              variantId,
              quantity,
            },
          ],
        },
      },
    });
    return response.data;
  },
};
```

## Step 6: Update Your Shop Page

Update `src/pages/Shop.tsx` to fetch products from Shopify:

```typescript
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { shopify } from "@/lib/shopify";

// ... existing imports ...

const Shop = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopify-products'],
    queryFn: () => shopify.getProducts(20),
  });

  // Transform Shopify data to match your component structure
  const products = data?.products?.edges?.map((edge: any) => ({
    id: edge.node.id,
    name: edge.node.title,
    price: `R${parseFloat(edge.node.priceRange.minVariantPrice.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    image: edge.node.images.edges[0]?.node.url || "/placeholder.svg",
    description: edge.node.description || "",
    handle: edge.node.handle,
  })) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto text-center py-20">
            <p>Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto text-center py-20">
            <p>Error loading products. Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ... rest of your component using the products array ...
};
```

## Step 7: Add Product Detail Page (Optional)

Create `src/pages/ProductDetail.tsx`:

```typescript
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shopify } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// ... other imports ...

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  
  const { data, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => shopify.getProduct(handle!),
    enabled: !!handle,
  });

  const product = data?.product;

  // ... render product details ...
};
```

## Step 8: Add to Cart Functionality

Update your product cards to add items to cart:

```typescript
import { shopify } from "@/lib/shopify";

const handleAddToCart = async (variantId: string) => {
  try {
    const result = await shopify.createCheckout(variantId, 1);
    if (result.checkoutCreate.checkout) {
      // Redirect to Shopify checkout
      window.location.href = result.checkoutCreate.checkout.webUrl;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast({
      title: "Error",
      description: "Failed to add item to cart. Please try again.",
      variant: "destructive",
    });
  }
};
```

## Step 9: Update Vite Config (if needed)

Make sure your `vite.config.ts` includes environment variable handling:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Step 10: Testing

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the integration:**
   - Visit `/shop` page
   - Verify products are loading from Shopify
   - Test adding items to cart
   - Complete a test checkout

## Additional Features to Consider

### 1. Cart Management
- Implement a local cart state
- Use Shopify's checkout API for cart operations
- Show cart count in header

### 2. Product Search & Filtering
- Add search functionality
- Filter by price, category, etc.
- Use Shopify's product filtering capabilities

### 3. Customer Accounts
- Integrate customer authentication
- Show order history
- Save addresses

### 4. Payment Methods
- Shopify handles payments automatically
- Configure payment methods in Shopify admin
- Support for South African payment methods (EFT, credit cards, etc.)

## Troubleshooting

### Products Not Loading
- Check your `.env` file has correct values
- Verify Storefront API token is correct
- Check browser console for errors
- Ensure products are published in Shopify

### CORS Issues
- Shopify Storefront API should handle CORS automatically
- If issues persist, check your Shopify app settings

### Currency Issues
- Set your store currency to ZAR in Shopify Settings → Markets
- Ensure product prices are in ZAR

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all sensitive data
3. **Limit API scopes** to only what you need
4. **Use HTTPS** in production
5. **Validate user input** before sending to Shopify

## Resources

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify GraphQL Explorer](https://shopify.dev/docs/api/storefront/2024-01/queries)
- [Shopify Storefront API Client](https://github.com/Shopify/shopify-api-js/tree/main/packages/storefront-api-client)

## Support

For issues specific to:
- **Shopify API**: Check Shopify's developer documentation
- **This integration**: Review the code comments and this guide
- **Your store setup**: Contact Shopify support

---

**Note:** This integration uses the Storefront API which is designed for public-facing storefronts. For admin operations, you'll need the Admin API with different authentication.

