# Shopify Setup Instructions for AFRIKA EYEWEAR

This guide will walk you through setting up Shopify so that your website can fetch products and enable the "Add to Cart" functionality.

## ✅ What's Already Done

Your website is already configured with:
- ✅ Product fetching from Shopify
- ✅ Add to cart functionality
- ✅ Quantity selector (1-10 items)
- ✅ Cart count in header
- ✅ Clickable products
- ✅ Toast notifications for cart actions

## 📋 Step-by-Step Shopify Setup

### Step 1: Create or Access Your Shopify Store

1. Go to [shopify.com](https://www.shopify.com)
2. Sign up for an account (or log in if you already have one)
3. Complete the store setup process
4. Note your store domain (e.g., `your-store-name.myshopify.com`)

### Step 2: Add Your Products

1. In your Shopify admin, go to **Products** → **All products**
2. Click **Add product**
3. For each product, add:
   - **Product title** (e.g., "Table Mountain Classic")
   - **Description**
   - **Images** (at least one image per product)
   - **Pricing** (in ZAR - South African Rand)
   - **Inventory** (make sure products are available for sale)
   - **Product status**: Set to **Active**

4. **Important**: Make sure products are **Published** and **Available for sale**

### Step 3: Enable Storefront API

1. In Shopify Admin, go to **Settings** → **Apps and sales channels**
2. Click **Develop apps** (at the bottom of the page)
3. Click **Create an app**
4. Name it: **"AFRIKA EYEWEAR Storefront"**
5. Click **Create app**

### Step 4: Configure Storefront API Permissions

1. In your app, click **Configure Admin API scopes**
2. Scroll down to **Storefront API** section
3. Click **Configure**
4. Enable these scopes:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_write_customers`
   - ✅ `unauthenticated_read_customers`

5. Click **Save**

### Step 5: Install the App and Get Your Token

1. Click **Install app** (top right)
2. After installation, go to the **API credentials** tab
3. Under **Storefront API**, click **Reveal token once**
4. **COPY THE TOKEN** - You'll need this! (It starts with `shpat_` or `shpca_`)
5. **Important**: Save this token securely - you can only see it once!

### Step 6: Get Your Store Domain

1. Your store domain is in the format: `your-store-name.myshopify.com`
2. You can find it in:
   - Shopify Admin → Settings → Domains
   - Or in your browser URL when logged into Shopify admin

### Step 7: Configure Your Website

1. In your project root, create or edit the `.env` file
2. Add these two lines (replace with your actual values):

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here
```

**Example:**
```env
VITE_SHOPIFY_STORE_DOMAIN=afrika-eyewear.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

3. **Important**: 
   - Do NOT include `https://` in the domain
   - Do NOT commit `.env` to git (it should already be in `.gitignore`)

### Step 8: Restart Your Development Server

1. Stop your current dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 9: Test the Integration

1. Visit your website
2. Go to the **Shop** page or check **Featured Products** on the home page
3. You should see your Shopify products
4. Click **Add to Cart** on a product
5. Check the cart icon in the header - it should show the count
6. Click the cart icon to go to checkout

## 🔍 Troubleshooting

### Products Not Showing

**Check:**
- ✅ Products are **Published** in Shopify
- ✅ Products are **Available for sale**
- ✅ Products have at least one **variant**
- ✅ Products have **images**
- ✅ `.env` file has correct values
- ✅ Restarted dev server after adding `.env` variables
- ✅ Check browser console for errors

### "Shopify is not configured" Error

**Solution:**
- Make sure `.env` file exists in project root
- Check that variable names are exactly:
  - `VITE_SHOPIFY_STORE_DOMAIN`
  - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- Restart your dev server

### "Failed to add item to cart" Error

**Check:**
- Storefront API token is correct
- Storefront API permissions are enabled (Step 4)
- Product has a variant ID
- Product is available for sale

### Cart Count Not Updating

**Solution:**
- Clear browser cache
- Check browser console for errors
- Make sure cart context is working (check Network tab for API calls)

## 📝 Important Notes

### Currency
- Make sure your Shopify store currency is set to **ZAR (South African Rand)**
- Go to: Settings → Markets → Primary market → Currency

### Product Variants
- Each product needs at least one variant
- The system uses the first variant for add to cart
- If you have multiple variants (sizes, colors), they'll all use the first one

### Cart Checkout
- When users click the cart icon, they'll be redirected to Shopify's checkout
- This is handled by Shopify - you don't need to configure anything else
- The checkout URL is automatically generated when items are added to cart

## 🎯 Quick Checklist

Before going live, make sure:

- [ ] All products are added to Shopify
- [ ] All products are published and available
- [ ] Storefront API is configured
- [ ] Storefront API token is saved
- [ ] `.env` file is configured
- [ ] Dev server restarted
- [ ] Products show on website
- [ ] Add to cart works
- [ ] Cart count updates
- [ ] Checkout redirects to Shopify

## 🚀 Going to Production

When deploying to production:

1. Add the same `.env` variables to your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Check their documentation for environment variables

2. Make sure to use the same variable names:
   - `VITE_SHOPIFY_STORE_DOMAIN`
   - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

3. Redeploy your site after adding environment variables

## 📞 Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Check the Network tab to see if API calls are being made
3. Verify your Shopify store settings
4. Make sure all steps above are completed

---

**Your website is ready! Once you complete these steps, your customers will be able to browse products and add them to cart, which will redirect them to Shopify's secure checkout.**

