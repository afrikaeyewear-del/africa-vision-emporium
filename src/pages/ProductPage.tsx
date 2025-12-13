import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/services/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, ArrowLeft, Plus, Minus, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addItemToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      if (!handle) return null;
      return await getProduct(handle);
    },
    enabled: !!handle,
    retry: false,
  });

  const handleAddToCart = async () => {
    if (!product || !product.variantId || !product.available) {
      toast({
        title: "Product unavailable",
        description: "This product is currently not available.",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      await addItemToCart(product.variantId, quantity);
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}x) has been added to your cart.`,
      });

      // Reset quantity after adding
      setQuantity(1);
      
      // Dispatch event to update cart count in header
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
              <p className="text-foreground/60 mb-6">The product you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/shop">Back to Shop</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const mainImage = product.images[selectedImageIndex] || product.image;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <Card className="overflow-hidden border-0">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/10 overflow-hidden">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-primary'
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                  {product.price}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose max-w-none">
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Variants */}
              {product.variants.length > 1 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={product.variantId === variant.id ? "default" : "outline"}
                        size="sm"
                        disabled={!variant.available}
                      >
                        {variant.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-4 border-t">
                {product.available ? (
                  <>
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <label className="font-semibold whitespace-nowrap">Quantity:</label>
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-r-none"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 text-base font-medium min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-l-none"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      size="lg"
                      className="w-full btn-glow bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-6 text-lg shadow-[var(--shadow-luxury)] transition-all duration-300 rounded-md disabled:opacity-50 flex items-center justify-center"
                      onClick={handleAddToCart}
                      disabled={isAddingToCart || !product.available}
                    >
                      {isAddingToCart ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin flex-shrink-0" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="mr-2 h-5 w-5 flex-shrink-0" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-foreground/60 font-medium">This product is currently out of stock</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

