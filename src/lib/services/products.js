import { shopify } from "src\lib\shopify.js";

export async function getProducts() {
  const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopify(query);
  return res.data.products.edges.map(e => e.node);
}
