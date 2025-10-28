import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-eyewear.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in-slow">
          <div className="mb-6 inline-block">
            <span className="text-sm font-medium tracking-wider uppercase text-primary">
              Exclusive Collection
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Where Heritage
            <br />
            <span className="text-primary">Meets Vision</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
            Discover our curated collection of elegant eyewear, thoughtfully crafted to celebrate African heritage with modern sophistication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[var(--shadow-warm)] transition-all duration-300 hover:scale-105"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Collection
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-medium transition-all duration-300"
            >
              Discover Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-tl-full blur-3xl" />
    </section>
  );
};

export default Hero;
