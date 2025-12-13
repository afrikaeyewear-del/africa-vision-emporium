import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, X, Plus, Minus, Trash2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Cart = ({ open, onOpenChange }: CartProps) => {
  const { cart, cartCount, removeItemFromCart, updateItemQuantity, isLoading } = useCart();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleRemoveItem = async (lineId: string, productName: string) => {
    setUpdatingItems(prev => new Set(prev).add(lineId));
    try {
      await removeItemFromCart(lineId);
      toast({
        title: "Item removed",
        description: `${productName} has been removed from your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(lineId);
        return next;
      });
    }
  };

  const handleUpdateQuantity = async (lineId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity <= 0) {
      const lineItem = cart?.lines.edges.find(edge => edge.node.id === lineId);
      if (lineItem) {
        await handleRemoveItem(lineId, lineItem.node.merchandise.product.title);
      }
      return;
    }

    setUpdatingItems(prev => new Set(prev).add(lineId));
    try {
      await updateItemQuantity(lineId, newQuantity);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev);
        next.delete(lineId);
        return next;
      });
    }
  };

  const formatPrice = (amount: string): string => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      return 'R0.00';
    }
    return `R${numAmount.toLocaleString('en-ZA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const cartItems = cart?.lines.edges || [];
  const totalAmount = cart?.cost.totalAmount.amount ? formatPrice(cart.cost.totalAmount.amount) : 'R0.00';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Shopping Cart</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart.</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map(({ node: lineItem }) => {
                const isUpdating = updatingItems.has(lineItem.id);
                const productImage = lineItem.merchandise.product.images.edges[0]?.node.url || '/placeholder.svg';
                const productName = lineItem.merchandise.product.title;
                const variantTitle = lineItem.merchandise.title;
                const price = formatPrice(lineItem.merchandise.price.amount);
                const lineTotal = formatPrice((parseFloat(lineItem.merchandise.price.amount) * lineItem.quantity).toString());

                return (
                  <div key={lineItem.id} className="flex gap-4 pb-4 border-b last:border-0">
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted/10">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-base mb-1 truncate">{productName}</h4>
                      {variantTitle !== 'Default Title' && (
                        <p className="text-sm text-muted-foreground mb-2">{variantTitle}</p>
                      )}
                      <p className="text-sm font-medium text-primary mb-3">{price} each</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-md">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleUpdateQuantity(lineItem.id, lineItem.quantity, -1)}
                            disabled={isUpdating}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                            {isUpdating ? (
                              <Loader2 className="h-3 w-3 animate-spin inline" />
                            ) : (
                              lineItem.quantity
                            )}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleUpdateQuantity(lineItem.id, lineItem.quantity, 1)}
                            disabled={isUpdating}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveItem(lineItem.id, productName)}
                          disabled={isUpdating}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        {/* Line Total */}
                        <div className="ml-auto text-right">
                          <p className="text-base font-semibold">{lineTotal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Cart Summary */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary text-xl">{totalAmount}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  size="lg"
                  className="w-full"
                  asChild
                  onClick={() => onOpenChange(false)}
                >
                  <a href={cart?.checkoutUrl || '#'} target="_blank" rel="noopener noreferrer">
                    Checkout
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => onOpenChange(false)}
                  asChild
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;

