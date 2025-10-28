import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-eyewear.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Background Image with 3D depth */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-700"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: 'translateZ(-50px) scale(1.05)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/30" />
      </div>

      {/* Content with 3D elevation */}
      <div className="container relative z-10 px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in-slow" style={{ transform: 'translateZ(50px)' }}>
          <div className="mb-6 inline-block backdrop-blur-sm bg-primary/10 px-4 py-2 rounded-full shadow-[var(--shadow-luxury)]">
            <span className="text-sm font-medium tracking-wider uppercase text-primary">
              Exclusive Collection
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight drop-shadow-2xl">
            Where Heritage
            <br />
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meets Vision
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed drop-shadow-lg">
            Discover our curated collection of elegant eyewear, thoughtfully crafted to celebrate African heritage with modern sophistication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-[var(--shadow-luxury)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Collection
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-secondary/50 backdrop-blur-sm bg-background/50 text-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary font-medium transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] hover:-translate-y-1"
            >
              Discover Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-tl-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
    </section>
  );
};

export default Hero;
