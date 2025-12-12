const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export async function shopify(query, variables = {}) {
  const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  return result.json();
}
