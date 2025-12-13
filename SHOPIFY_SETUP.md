# Shopify Setup Guide for AFRIKA EYEWEAR

## Quick Setup Steps

### 1. Create Environment File

Create a `.env` file in the root of your project with the following:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here
VITE_SHOPIFY_API_VERSION=2024-01
```

### 2. Get Your Shopify Credentials

1. **Go to Shopify Admin** → Settings → Apps and sales channels
2. **Click "Develop apps"** → **"Create an app"**
3. **Name it** "AFRIKA EYEWEAR Storefront"
4. **Configure Storefront API scopes:**
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_write_customers`
   - `unauthenticated_read_customers`
5. **Install the app** and go to **API credentials**
6. **Reveal and copy** the Storefront API access token
7. **Copy your store domain** (e.g., `your-store.myshopify.com`)

### 3. Update Your .env File

Replace the placeholder values in `.env` with your actual credentials.

### 4. Restart Development Server

```bash
npm run dev
```

## File Structure

```
src/
├── lib/
│   ├── shopify.ts              # Main Shopify API client
│   └── services/
│       ├── products.ts         # Product fetching functions
│       └── cart.ts             # Cart management functions
└── pages/
    └── Shop.tsx                # Shop page with Shopify integration
```

## Features

✅ **Product Fetching** - Automatically loads products from Shopify  
✅ **Cart Management** - Add items to cart with persistent storage  
✅ **Fallback Products** - Shows sample products if Shopify is not configured  
✅ **Error Handling** - Graceful error handling with user-friendly messages  
✅ **TypeScript** - Fully typed for better development experience

## Testing

1. Visit `/shop` page
2. Products should load from Shopify (if configured) or show fallback products
3. Click the cart button to add items
4. Cart is stored in localStorage and persists across sessions

## Troubleshooting

**Products not loading?**

- Check your `.env` file has correct values
- Verify Storefront API token is correct
- Ensure products are published in Shopify
- Check browser console for errors

**Cart not working?**

- Verify Storefront API has write permissions
- Check that variants are available for sale
- Review browser console for API errors
