import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getCollections } from "@/lib/services/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ShoppingBag, ArrowLeft, Plus, Minus, Loader2, ChevronLeft, ChevronRight, X, ZoomIn, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addItemToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomImageIndex, setZoomImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      if (!handle) return null;
      return await getProduct(handle);
    },
    enabled: !!handle,
    retry: false,
  });

  // Fetch all collections
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

  // Get all product images
  const productImages = product?.images && product.images.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : [];

  // Auto-slide images every 5 seconds (only when not zoomed)
  useEffect(() => {
    if (!product || productImages.length <= 1 || isZoomed) {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
      return;
    }

    autoSlideIntervalRef.current = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
    }, 5000);

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
    };
  }, [product, productImages.length, isZoomed]);

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

  const handleImageClick = (index: number) => {
    setZoomImageIndex(index);
    setIsZoomed(true);
  };

  const handleNextImage = () => {
    if (productImages.length === 0) return;
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    if (productImages.length === 0) return;
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleZoomNext = () => {
    if (productImages.length === 0) return;
    setZoomImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handleZoomPrev = () => {
    if (productImages.length === 0) return;
    setZoomImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && productImages.length > 1) {
      handleNextImage();
    }
    if (isRightSwipe && productImages.length > 1) {
      handlePrevImage();
    }
  };

  // Hover zoom & pan handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovering) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 50, y: 50 });
  };

  // Keyboard navigation in zoom modal
  useEffect(() => {
    if (!isZoomed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft' && productImages.length > 1) {
        setZoomImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
      } else if (e.key === 'ArrowRight' && productImages.length > 1) {
        setZoomImageIndex((prev) => (prev + 1) % productImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, productImages.length]);

  // Update zoom image index when selected image changes
  useEffect(() => {
    if (isZoomed) {
      setZoomImageIndex(selectedImageIndex);
    }
  }, [selectedImageIndex, isZoomed]);

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

  const mainImage = productImages[selectedImageIndex] || product.image;
  const zoomImage = productImages[zoomImageIndex] || product.image;

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
              {/* Main Image with Navigation */}
              <Card className="overflow-hidden border-0 relative group">
                <CardContent className="p-0">
                  <div 
                    ref={containerRef}
                    className="aspect-square bg-muted/10 overflow-hidden relative hover-zoom-pan"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      ref={imageRef}
                      src={mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleImageClick(selectedImageIndex)}
                      style={{
                        transform: isHovering 
                          ? `scale(1.6) translate(${(mousePosition.x - 50) * 0.4}%, ${(mousePosition.y - 50) * 0.4}%)`
                          : undefined,
                        transformOrigin: isHovering ? `${mousePosition.x}% ${mousePosition.y}%` : 'center center',
                        transition: isHovering ? 'transform 0.05s linear' : 'transform 0.5s ease-out',
                      }}
                    />
                    
                    {/* Navigation Arrows - Show on hover */}
                    {productImages.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full shadow-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}

                    {/* Zoom Icon */}
                    <div className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full p-2 shadow-lg">
                      <ZoomIn className="h-5 w-5 text-foreground" />
                    </div>

                    {/* Image Indicator Dots */}
                    {productImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {productImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageIndex(index);
                            }}
                            className={`h-2 rounded-full transition-all ${
                              selectedImageIndex === index
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productImages.map((image, index) => (
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

        {/* Collections Section */}
        {(product?.collections && product.collections.length > 0) || (collections && collections.length > 0) ? (
          <section className="mt-20 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
            <div className="container mx-auto">
              <div className="text-center mb-10 lg:mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-primary" />
                  <Tag className="w-5 h-5 text-primary" />
                  <div className="h-px w-8 bg-primary" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {product?.collections && product.collections.length > 0 
                    ? 'This Product\'s Collections' 
                    : 'Shop by Collection'}
                </h2>
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                  Explore our curated collections
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {(product?.collections && product.collections.length > 0 
                  ? product.collections 
                  : collections || []
                ).map((collection) => (
                  <Link
                    key={collection.id}
                    to={`/shop?collection=${collection.handle}`}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 bg-white hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-2 rounded-lg h-full">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] bg-muted/10 overflow-hidden">
                          <img
                            src={collection.image}
                            alt={collection.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-6 lg:p-8">
                          <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {collection.title}
                          </h3>
                          {collection.description && (
                            <p className="text-foreground/60 text-sm lg:text-base line-clamp-2">
                              {collection.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />

      {/* Image Zoom Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-4 bg-black/95 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={() => setIsZoomed(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Previous Button */}
            {productImages.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={handleZoomPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {/* Zoomed Image */}
            <img
              src={zoomImage}
              alt={product.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Next Button */}
            {productImages.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full"
                onClick={handleZoomNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}

            {/* Image Counter */}
            {productImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {zoomImageIndex + 1} / {productImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPage;
