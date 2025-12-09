import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingBag } from "lucide-react";

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
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8 bg-white">
          <div className="container mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
              Shop
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4 tracking-tight">
              Our Complete Collection
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
              Discover our full range of premium eyewear, proudly crafted in South Africa
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group overflow-hidden border border-border/50 bg-white hover:border-primary/30 hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-muted/30 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                        <Button 
                          size="sm" 
                          className="w-full bg-primary hover:bg-primary/90 text-white shadow-[var(--shadow-medium)] transition-all duration-200"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                        {product.name}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-4 font-light">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-semibold text-primary">
                          {product.price}
                        </p>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

