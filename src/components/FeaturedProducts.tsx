import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, ShoppingBag, Plus, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, Product } from "@/lib/services/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

// Fallback products if Shopify is not configured
const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Table Mountain Classic",
    price: "R2,499",
    image: "/placeholder.svg",
    description: "Timeless frames inspired by Cape Town's iconic landmark",
    handle: "table-mountain-classic",
    variantId: "variant-1",
    available: true,
  },
  {
    id: "2",
    name: "Kruger Bold",
    price: "R2,999",
    image: "/placeholder.svg",
    description: "Statement pieces for the modern explorer",
    handle: "kruger-bold",
    variantId: "variant-2",
    available: true,
  },
  {
    id: "3",
    name: "Drakensberg Elite",
    price: "R3,499",
    image: "/placeholder.svg",
    description: "Premium craftsmanship meets elegance",
    handle: "drakensberg-elite",
    variantId: "variant-3",
    available: true,
  },
  {
    id: "4",
    name: "Garden Route Essence",
    price: "R2,799",
    image: "/placeholder.svg",
    description: "Coastal-inspired sophistication",
    handle: "garden-route-essence",
    variantId: "variant-4",
    available: true,
  },
  {
    id: "5",
    name: "Soweto Heritage",
    price: "R2,199",
    image: "/placeholder.svg",
    description: "Celebrating South African culture and style",
    handle: "soweto-heritage",
    variantId: "variant-5",
    available: true,
  },
];

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.variantId || !product.available) {
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

  const handleQuantityChange = (e: React.MouseEvent, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <div
      ref={cardRef}
      className={`animate-on-scroll ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <Link to={`/product/${product.handle}`} className="block">
        <Card 
          className="group overflow-hidden border-0 bg-white hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-2 rounded-lg"
        >
          <CardContent className="p-0">
            {/* Large Product Image - Minimal Design */}
            <div className="relative aspect-[4/5] bg-muted/10 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Elegant Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6 gap-2">
                <Button 
                  size="lg" 
                  asChild
                  className="btn-glow bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 py-5 shadow-[var(--shadow-luxury)] transition-all duration-300 rounded-md"
                >
                  <Link to={`/product/${product.handle}`}>
                    <Eye className="mr-2 h-5 w-5" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Minimal Product Info */}
            <div className="p-6 lg:p-8 bg-white">
              <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl lg:text-3xl font-bold text-primary">
                  {product.price}
                </p>
                {!product.available && (
                  <span className="text-xs text-foreground/40 px-2 py-1 bg-muted rounded">Out of stock</span>
                )}
              </div>
              
              {/* Quantity Selector and Add to Cart */}
              {product.available && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-border rounded-md flex-shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={(e) => handleQuantityChange(e, -1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={(e) => handleQuantityChange(e, 1)}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    size="sm"
                    className="flex-1 min-w-0 btn-glow bg-primary hover:bg-primary/95 text-primary-foreground font-semibold shadow-[var(--shadow-medium)] transition-all duration-300 rounded-md disabled:opacity-50 whitespace-nowrap"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !product.available}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

const FeaturedProducts = () => {
  // Fetch products from Shopify (limit to 12)
  const { data: shopifyProducts, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      try {
        return await getProducts(12);
      } catch (err) {
        // If Shopify is not configured, return empty array to use fallback
        console.warn('Shopify products not available, using fallback:', err);
        return [];
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: true,
    gcTime: 5 * 60 * 1000,
  });

  // Use Shopify products if available, otherwise use fallback
  const products = shopifyProducts && shopifyProducts.length > 0 
    ? shopifyProducts.slice(0, 12)
    : fallbackProducts.slice(0, 12);

  return (
    <section className="py-20 lg:py-32 px-0 bg-white geometric-accent relative overflow-hidden">
      {/* Full-width background pattern */}
      <div className="absolute inset-0 african-pattern opacity-20" />
      
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-24">
        <div className="text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Our Collection
            </span>
            <div className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-6 lg:mb-8 tracking-tight leading-[0.95]">
            Featured Eyewear
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground/60 max-w-3xl mx-auto font-light leading-relaxed">
            Each piece is a celebration of craftsmanship, designed to complement your unique style
          </p>
        </div>
      </div>

      {/* Full-Width Products Showcase - Show up to 12 products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60">No products available at the moment.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Button 
          asChild
          size="lg"
          variant="outline"
          className="btn-glow group border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-12 py-8 text-xl transition-all duration-300 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-luxury)] hover:-translate-y-1 rounded-md"
        >
          <Link to="/shop">
            View Full Collection
            <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
