import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/40" />
      </div>

      {/* Content with 3D elevation */}
      <div className="container relative z-10 px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in-slow" style={{ transform: 'translateZ(50px)' }}>
          <div className="mb-6 inline-block backdrop-blur-sm bg-primary/10 border border-primary/20 px-5 py-2.5 rounded-full shadow-[var(--shadow-soft)]">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">
              Proudly South African
            </span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground mb-6 leading-[1.1] tracking-tight">
            Where Heritage
            <br />
            <span className="text-primary">
              Meets Vision
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-xl leading-relaxed font-light">
            Discover our curated collection of elegant eyewear, thoughtfully crafted in South Africa to celebrate our rich heritage with modern sophistication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-base shadow-[var(--shadow-medium)] transition-all duration-200 hover:shadow-[var(--shadow-luxury)] hover:-translate-y-0.5"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
              </Button>
            </Link>
            
            <a href="/#about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-foreground/20 bg-white/80 backdrop-blur-sm text-foreground hover:bg-foreground hover:text-white hover:border-foreground font-medium px-8 py-6 text-base transition-all duration-200 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
              >
                Discover Our Story
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-tl-full blur-3xl" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/3 rounded-full blur-2xl" />
    </section>
  );
};

export default Hero;
