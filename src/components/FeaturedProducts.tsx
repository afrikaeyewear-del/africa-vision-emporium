import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Sahara Classic",
    price: "$249",
    image: "/placeholder.svg",
    description: "Timeless frames with desert-inspired tones"
  },
  {
    id: 2,
    name: "Serengeti Bold",
    price: "$299",
    image: "/placeholder.svg",
    description: "Statement pieces for the modern explorer"
  },
  {
    id: 3,
    name: "Kilimanjaro Elite",
    price: "$349",
    image: "/placeholder.svg",
    description: "Premium craftsmanship meets elegance"
  },
  {
    id: 4,
    name: "Zanzibar Essence",
    price: "$279",
    image: "/placeholder.svg",
    description: "Coastal-inspired sophistication"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-medium tracking-wider uppercase text-primary mb-4 block">
            Our Collection
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Eyewear
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each piece is a celebration of craftsmanship, designed to complement your unique style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-border hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button 
                      size="sm" 
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {product.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
          >
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
