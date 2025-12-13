import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getOrCreateCart, addToCart, getCart, removeFromCart, updateCartLine, Cart } from '@/lib/services/cart';
import { isShopifyConfigured } from '@/lib/shopify';

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  isLoading: boolean;
  addItemToCart: (variantId: string, quantity: number) => Promise<void>;
  removeItemFromCart: (lineId: string) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = async () => {
    if (!isShopifyConfigured) {
      setIsLoading(false);
      return;
    }

    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      const cartId = localStorage.getItem('shopify_cart_id');
      if (cartId) {
        const currentCart = await getCart(cartId);
        if (currentCart) {
          setCart(currentCart);
        } else {
          // Cart doesn't exist, remove from localStorage
          localStorage.removeItem('shopify_cart_id');
          setCart(null);
        }
      }
    } catch (error) {
      console.error('Error refreshing cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addItemToCart = async (variantId: string, quantity: number = 1) => {
    if (!isShopifyConfigured) {
      throw new Error('Shopify is not configured');
    }

    try {
      const currentCart = await getOrCreateCart();
      const updatedCart = await addToCart(currentCart.id, variantId, quantity);
      setCart(updatedCart);
      return;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeItemFromCart = async (lineId: string) => {
    if (!isShopifyConfigured || !cart) {
      throw new Error('Shopify is not configured or cart is empty');
    }

    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateItemQuantity = async (lineId: string, quantity: number) => {
    if (!isShopifyConfigured || !cart) {
      throw new Error('Shopify is not configured or cart is empty');
    }

    if (quantity <= 0) {
      await removeItemFromCart(lineId);
      return;
    }

    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  useEffect(() => {
    refreshCart();

    // Listen for cart updates from other components
    const handleCartUpdate = () => {
      refreshCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const cartCount = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isLoading,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

