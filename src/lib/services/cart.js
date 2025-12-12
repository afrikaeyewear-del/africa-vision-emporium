import { shopify } from "src\lib\shopify.js";

export async function createCart() {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;
  const res = await shopify(query);
  return res.data.cartCreate.cart;
}

export async function addToCart(cartId, variantId, quantity = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  };
  const res = await shopify(query, variables);
  return res.data.cartLinesAdd.cart;
}
