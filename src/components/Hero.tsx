import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-eyewear.jpg";

const Hero = () => {
  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-white geometric-accent">
      {/* African-inspired geometric pattern overlay - very subtle */}
      <div className="absolute inset-0 african-pattern opacity-30" />
      
      {/* Background Image with elegant overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80 lg:from-white/98 lg:via-white/92 lg:to-white/70" />
      </div>

      {/* Asymmetrical Content Layout */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-7 xl:col-span-6 animate-slide-in-left">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                CRAFTED FOR THE BOLD
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            
            {/* Main Heading - Extra Large */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground mb-6 lg:mb-8 leading-[0.95] tracking-tight">
              Where Heritage
              <br />
              <span className="text-primary relative inline-block">
                Meets Vision
                <span className="absolute -bottom-3 left-0 right-0 h-1.5 bg-primary/30 transform -skew-x-12" />
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/60 mb-10 lg:mb-12 max-w-xl lg:max-w-2xl leading-relaxed font-light">
              Discover our curated collection of elegant eyewear, thoughtfully crafted in South Africa to celebrate our rich heritage with modern sophistication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Link to="/shop">
                <Button 
                  size="lg" 
                  className="btn-glow group bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-10 lg:px-12 py-7 lg:py-8 text-lg lg:text-xl shadow-[var(--shadow-luxury)] transition-all duration-300 hover:-translate-y-1 rounded-md"
                >
                  <ShoppingBag className="mr-2 h-6 w-6" />
                  Shop Collection
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              
            <a href="/#about" onClick={handleAboutClick}>
              <Button 
                size="lg" 
                variant="outline"
                className="group border-2 border-foreground/20 bg-white/95 backdrop-blur-md text-foreground hover:bg-foreground hover:text-white hover:border-foreground font-semibold px-10 lg:px-12 py-7 lg:py-8 text-lg lg:text-xl transition-all duration-300 shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-luxury)] hover:-translate-y-1 rounded-md"
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
            </div>
          </div>

          {/* Floating Decorative Elements - Right Side */}
          <div className="lg:col-span-5 xl:col-span-6 relative hidden lg:block">
            {/* Floating Circle 1 */}
            <div className="absolute top-10 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl floating" />
            
            {/* Floating Circle 2 */}
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/8 rounded-full blur-3xl floating-slow" />
            
            {/* Geometric Shape */}
            <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-primary/10 transform rotate-45 floating" />
            
            {/* Floating Accent Line */}
            <div className="absolute top-1/4 right-0 w-48 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent floating-slow" />
          </div>
        </div>
      </div>

      {/* Subtle Decorative Elements - Background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/2 rounded-tl-full blur-3xl pointer-events-none floating-slow" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-2xl pointer-events-none floating" />
      
      {/* Asymmetrical accent line */}
      <div className="absolute bottom-20 left-10 w-64 h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent transform -rotate-12 floating" />
    </section>
  );
};

export default Hero;
