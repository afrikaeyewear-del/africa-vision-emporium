/**
 * Shopify Storefront API Client
 * Handles all GraphQL requests to Shopify Storefront API
 */

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';

// Check if Shopify is configured
export const isShopifyConfigured = !!(STORE_DOMAIN && ACCESS_TOKEN);

if (!isShopifyConfigured) {
  console.warn('Shopify environment variables are not set. The app will use fallback products.');
}

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

/**
 * Execute a GraphQL query/mutation against Shopify Storefront API
 */
export async function shopifyRequest<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<ShopifyResponse<T>> {
  if (!isShopifyConfigured) {
    throw new Error('Shopify credentials are not configured. Please set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN in your .env file.');
  }

  try {
    const response = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const result: ShopifyResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
      console.error('Shopify GraphQL errors:', result.errors);
      throw new Error(result.errors.map(e => e.message).join(', '));
    }

    return result;
  } catch (error) {
    console.error('Error calling Shopify API:', error);
    throw error;
  }
}

/**
 * Shopify Storefront API client
 */
export const shopify = {
  request: shopifyRequest,
};

