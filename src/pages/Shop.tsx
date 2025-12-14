import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingBag, Plus, Minus, Tag, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getCollections, getProductsByCollection } from "@/lib/services/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

// Fallback products if Shopify is not configured
const fallbackProducts: Array<{
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  handle: string;
  variantId: string;
  available: boolean;
}> = [
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
  {
    id: "6",
    name: "Winelands Vintage",
    price: "R2,899",
    image: "/placeholder.svg",
    description: "Elegant frames with a touch of sophistication",
    handle: "winelands-vintage",
    variantId: "variant-6",
    available: true,
  },
  {
    id: "7",
    name: "Karoo Sunset",
    price: "R2,399",
    image: "/placeholder.svg",
    description: "Warm tones inspired by the Karoo landscape",
    handle: "karoo-sunset",
    variantId: "variant-7",
    available: true,
  },
  {
    id: "8",
    name: "Safari Explorer",
    price: "R3,199",
    image: "/placeholder.svg",
    description: "Adventure-ready frames for the bold",
    handle: "safari-explorer",
    variantId: "variant-8",
    available: true,
  },
  {
    id: "9",
    name: "Johannesburg Urban",
    price: "R2,599",
    image: "/placeholder.svg",
    description: "Modern city style with African flair",
    handle: "johannesburg-urban",
    variantId: "variant-9",
    available: true,
  },
  {
    id: "10",
    name: "Cape Point Premium",
    price: "R3,299",
    image: "/placeholder.svg",
    description: "Luxury frames for the discerning customer",
    handle: "cape-point-premium",
    variantId: "variant-10",
    available: true,
  },
  {
    id: "11",
    name: "Blyde River Canyon",
    price: "R2,699",
    image: "/placeholder.svg",
    description: "Natural beauty captured in elegant design",
    handle: "blyde-river-canyon",
    variantId: "variant-11",
    available: true,
  },
  {
    id: "12",
    name: "Robben Island Classic",
    price: "R2,449",
    image: "/placeholder.svg",
    description: "Heritage-inspired frames with modern appeal",
    handle: "robben-island-classic",
    variantId: "variant-12",
    available: true,
  },
];

const Shop = () => {
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItemToCart } = useCart();
  const [searchParams] = useSearchParams();
  const collectionHandle = searchParams.get('collection');

  // Fetch products from Shopify (filtered by collection if specified)
  const { data: shopifyProducts, isLoading, error } = useQuery({
    queryKey: ['shopify-products', collectionHandle],
    queryFn: async () => {
      try {
        if (collectionHandle) {
          return await getProductsByCollection(collectionHandle, 50);
        }
        return await getProducts(50);
      } catch (err) {
        // If Shopify is not configured, return empty array to use fallback
        console.warn('Shopify products not available, using fallback:', err);
        return [];
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: true,
    // Add timeout to prevent hanging
    gcTime: 5 * 60 * 1000,
  });

  // Fetch collections from Shopify
  const { data: collections, isLoading: collectionsLoading } = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      try {
        return await getCollections(10);
      } catch (err) {
        console.warn('Collections not available:', err);
        return [];
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Use Shopify products if available, otherwise use fallback
  const products = shopifyProducts && shopifyProducts.length > 0 
    ? shopifyProducts 
    : fallbackProducts;

  const handleAddToCart = async (e: React.MouseEvent, product: typeof products[0]) => {
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

    const quantity = quantities[product.id] || 1;

    setIsAddingToCart(product.id);
    try {
      await addItemToCart(product.variantId, quantity);
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}x) has been added to your cart.`,
      });

      // Reset quantity after adding
      setQuantities(prev => ({ ...prev, [product.id]: 1 }));

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
      setIsAddingToCart(null);
    }
  };

  const handleQuantityChange = (e: React.MouseEvent, productId: string, delta: number) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(10, (prev[productId] || 1) + delta))
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-border/50">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                Shop
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 lg:mb-6 tracking-tight">
              Our Complete Collection
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
              Discover our full range of premium eyewear, proudly crafted in South Africa
            </p>
          </div>
        </section>

        {/* Collections Section */}
        {collections && collections.length > 0 && (
          <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
            <div className="container mx-auto">
              <div className="text-center mb-10 lg:mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-primary" />
                  <Tag className="w-5 h-5 text-primary" />
                  <div className="h-px w-8 bg-primary" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Shop by Collection
                </h2>
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                  Explore our curated collections
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                {collections.map((collection) => {
                  const isActive = collectionHandle === collection.handle;
                  return (
                    <Link
                      key={collection.id}
                      to={`/shop?collection=${collection.handle}`}
                      className="group"
                    >
                      <Card className={`border-0 bg-white hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-2 rounded-lg ${isActive ? 'ring-2 ring-primary shadow-[var(--shadow-luxury)] bg-primary/5' : ''}`}>
                        <CardContent className="p-6 lg:p-8">
                          <div className="flex items-center gap-2">
                            <Tag className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground/60 group-hover:text-primary'}`} />
                            <h3 className={`font-display text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                              {collection.title}
                            </h3>
                            {isActive && (
                              <span className="ml-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                                Active
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-12 lg:py-16 px-0 bg-white geometric-accent relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 african-pattern opacity-20" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Filter indicator and results count */}
            <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {collectionHandle && collections && (
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {collections.find(c => c.handle === collectionHandle)?.title || collectionHandle}
                    </span>
                    <Link
                      to="/shop"
                      className="ml-2 hover:bg-primary/20 rounded-full p-1 transition-colors"
                      aria-label="Clear filter"
                    >
                      <X className="w-4 h-4" />
                    </Link>
                  </div>
                )}
                <p className="text-sm lg:text-base text-foreground/60 font-light">
                  {isLoading ? (
                    'Loading products...'
                  ) : (
                    `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}${collectionHandle ? ' in this collection' : ''}`
                  )}
                </p>
              </div>
            </div>

            {/* Error State - Only show if there's an error and no products at all */}
            {error && !shopifyProducts && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-foreground/60 font-light mb-4">
                  Unable to load products. Please try again later.
                </p>
              </div>
            )}

            {/* Products Grid - Premium Layout - Show fallback products immediately */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {products.map((product, index) => {
                  const quantity = quantities[product.id] || 1;
                  return (
                    <div
                      key={product.id}
                      className="animate-on-scroll"
                      style={{ transitionDelay: `${index * 0.05}s` }}
                    >
                      <Card 
                        className="group overflow-hidden border-0 bg-white hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-2 rounded-lg"
                      >
                        <CardContent className="p-0">
                          {/* Large Product Image - Clickable */}
                          <Link to={`/product/${product.handle}`} className="block">
                            <div className="relative aspect-[4/5] bg-muted/10 overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                              />
                              {/* Elegant Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                                <Button 
                                  size="lg" 
                                  asChild
                                  className="btn-glow bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 shadow-[var(--shadow-luxury)] transition-all duration-300 rounded-md"
                                >
                                  <Link to={`/product/${product.handle}`}>
                                    <Eye className="mr-2 h-5 w-5" />
                                    View Details
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </Link>
                          
                          {/* Minimal Product Info */}
                          <div className="p-6 lg:p-8 bg-white">
                            <Link to={`/product/${product.handle}`}>
                              <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                                {product.name}
                              </h3>
                            </Link>
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
                                    onClick={(e) => handleQuantityChange(e, product.id, -1)}
                                    disabled={quantities[product.id] <= 1}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                    {quantities[product.id] || 1}
                                  </span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-l-none"
                                    onClick={(e) => handleQuantityChange(e, product.id, 1)}
                                    disabled={(quantities[product.id] || 1) >= 10}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                {/* Add to Cart Button */}
                                <Button 
                                  size="sm"
                                  className="flex-1 min-w-0 btn-glow bg-primary hover:bg-primary/95 text-primary-foreground font-semibold shadow-[var(--shadow-medium)] transition-all duration-300 rounded-md disabled:opacity-50 whitespace-nowrap"
                                  onClick={(e) => handleAddToCart(e, product)}
                                  disabled={isAddingToCart === product.id || !product.available}
                                >
                                  <ShoppingBag className="mr-2 h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">{isAddingToCart === product.id ? "Adding..." : "Add to Cart"}</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

