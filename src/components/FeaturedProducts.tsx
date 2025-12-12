import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { initScrollAnimations } from "@/utils/scroll-animations";

const products = [
  {
    id: 1,
    name: "Table Mountain Classic",
    price: "R2,499",
    image: "/placeholder.svg",
    description: "Timeless frames inspired by Cape Town's iconic landmark"
  },
  {
    id: 2,
    name: "Kruger Bold",
    price: "R2,999",
    image: "/placeholder.svg",
    description: "Statement pieces for the modern explorer"
  },
  {
    id: 3,
    name: "Drakensberg Elite",
    price: "R3,499",
    image: "/placeholder.svg",
    description: "Premium craftsmanship meets elegance"
  },
  {
    id: 4,
    name: "Garden Route Essence",
    price: "R2,799",
    image: "/placeholder.svg",
    description: "Coastal-inspired sophistication"
  },
  {
    id: 5,
    name: "Soweto Heritage",
    price: "R2,199",
    image: "/placeholder.svg",
    description: "Celebrating South African culture and style"
  },
  {
    id: 6,
    name: "Winelands Vintage",
    price: "R2,899",
    image: "/placeholder.svg",
    description: "Elegant frames with a touch of sophistication"
  },
  {
    id: 7,
    name: "Karoo Sunset",
    price: "R2,399",
    image: "/placeholder.svg",
    description: "Warm tones inspired by the Karoo landscape"
  },
  {
    id: 8,
    name: "Safari Explorer",
    price: "R3,199",
    image: "/placeholder.svg",
    description: "Adventure-ready frames for the bold"
  }
];

const ProductCard = ({ product, index }: { product: typeof products[0], index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={cardRef}
      className={`animate-on-scroll ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
              <Button 
                size="lg" 
                className="btn-glow bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 py-6 shadow-[var(--shadow-luxury)] transition-all duration-300 rounded-md"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Details
              </Button>
            </div>
          </div>
          
          {/* Minimal Product Info */}
          <div className="p-6 lg:p-8 bg-white">
            <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-2xl lg:text-3xl font-bold text-primary">
              {product.price}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FeaturedProducts = () => {
  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

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

      {/* Full-Width Products Showcase - Show only 5 products on home page */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.slice(0, 5).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link to="/shop">
          <Button 
            size="lg"
            variant="outline"
            className="btn-glow group border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-12 py-8 text-xl transition-all duration-300 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-luxury)] hover:-translate-y-1 rounded-md"
          >
            View Full Collection
            <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
