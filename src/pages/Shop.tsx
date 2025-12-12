import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { initScrollAnimations } from "@/utils/scroll-animations";
import { useEffect, useState } from "react";
import { getProducts } from "../lib/getProducts";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data.products.edges.map((e: any) => e.node));
    });
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 && <p>Loading...</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((p: any) => (
          <div key={p.id} style={{ width: 200 }}>
            <img
              src={p.images.edges[0]?.node.url}
              style={{ width: "100%", borderRadius: 10 }}
            />
            <h3>{p.title}</h3>
            <p>R{p.variants.edges[0].node.price.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
  },
  {
    id: 9,
    name: "Johannesburg Urban",
    price: "R2,599",
    image: "/placeholder.svg",
    description: "Modern city style with African flair"
  },
  {
    id: 10,
    name: "Cape Point Premium",
    price: "R3,299",
    image: "/placeholder.svg",
    description: "Luxury frames for the discerning customer"
  },
  {
    id: 11,
    name: "Blyde River Canyon",
    price: "R2,699",
    image: "/placeholder.svg",
    description: "Natural beauty captured in elegant design"
  },
  {
    id: 12,
    name: "Robben Island Classic",
    price: "R2,449",
    image: "/placeholder.svg",
    description: "Heritage-inspired frames with modern appeal"
  }
];

const Shop = () => {
  useEffect(() => {
    // Re-initialize scroll animations when component mounts
    const cleanup = initScrollAnimations();
    return cleanup;
  }, []);

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
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground mb-4 lg:mb-6 tracking-tight">
              Our Complete Collection
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
              Discover our full range of premium eyewear, proudly crafted in South Africa
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 lg:py-16 px-0 bg-white geometric-accent relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 african-pattern opacity-20" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Results count */}
            <div className="mb-10 flex items-center justify-between">
              <p className="text-sm lg:text-base text-foreground/60 font-light">
                Showing {products.length} products
              </p>
            </div>

            {/* Products Grid - Premium Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <Card 
                    className="group overflow-hidden border-0 bg-white hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-2 rounded-lg"
                  >
                    <CardContent className="p-0">
                      {/* Large Product Image */}
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
                        <div className="flex items-center justify-between">
                          <p className="text-2xl lg:text-3xl font-bold text-primary">
                            {product.price}
                          </p>
                          <Button 
                            size="icon"
                            variant="outline"
                            className="h-12 w-12 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 rounded-md btn-glow"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <ShoppingBag className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;

