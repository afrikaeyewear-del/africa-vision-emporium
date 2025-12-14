import { Sparkles, Award, Globe, X, ZoomIn } from "lucide-react";
import { useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import storeImage from "@/assets/store.jpg";

const features = [
  {
    icon: Sparkles,
    title: "Exclusive Designs",
    description: "Each frame is carefully curated to reflect both modern elegance and African heritage"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with the finest materials for lasting comfort and durability"
  },
  {
    icon: Globe,
    title: "Cultural Heritage",
    description: "Celebrating the rich tapestry of African artistry in every detail"
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 lg:py-32 px-0 bg-muted/10 geometric-accent relative overflow-hidden"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 african-pattern opacity-15" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                About AFRIKA EYEWEAR
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Afrika
              </span>
              <img 
                src={logo} 
                alt="Afrika Eyewear Logo" 
                className="h-12 lg:h-20" 
              />
              <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Eyewear
              </span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 tracking-tight leading-[0.95]">
              Vision Inspired by
              <br />
              <span className="text-primary relative inline-block">
                African Excellence
                <span className="absolute -bottom-3 left-0 right-0 h-1.5 bg-primary/30 transform -skew-x-12" />
              </span>
            </h2>
            <div className="space-y-6 lg:space-y-8">
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/65 leading-relaxed font-light">
                At AFRIKA EYEWEAR, we believe that eyewear is more than just an accessory—it's an expression of identity, culture, and style. Based in Johannesburg, South Africa, our exclusive collection bridges the gap between traditional African artistry and contemporary design.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/65 leading-relaxed font-light">
                Every piece in our collection tells a story, celebrating the vibrant colors, patterns, and spirit of South Africa while embracing modern sophistication for today's discerning customer. We're proud to be a homegrown South African brand, crafting eyewear that reflects our rich heritage.
              </p>
            </div>
          </div>

          {/* Store Image and Features */}
          <div className="space-y-6 lg:space-y-8">
            {/* Store Image Section */}
            <div className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
              <div 
                className="relative aspect-[4/3] bg-muted/20 rounded-lg overflow-hidden border border-border/40 shadow-[var(--shadow-soft)] group cursor-pointer"
                onClick={() => setIsImageZoomed(true)}
              >
                <img 
                  src={storeImage} 
                  alt="AFRIKA EYEWEAR Store - 43 Bradford Rd, Eastgate Mall, Bedfordview, Germiston, 2008" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <ZoomIn className="h-6 w-6 text-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-6 lg:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className={`animate-on-scroll ${isVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `${(index + 1) * 0.15}s` }}
                  >
                    <div className="group flex gap-6 lg:gap-8 p-8 lg:p-10 bg-white rounded-lg border-0 hover:shadow-[var(--shadow-3d)] transition-all duration-500 hover:-translate-y-1">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl lg:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-base lg:text-lg text-foreground/60 font-light leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Store Image Zoom Modal */}
      <Dialog open={isImageZoomed} onOpenChange={setIsImageZoomed}>
        <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] p-4 bg-black/95 border-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full"
              onClick={() => setIsImageZoomed(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <img
              src={storeImage}
              alt="AFRIKA EYEWEAR Store - 43 Bradford Rd, Eastgate Mall, Bedfordview, Germiston, 2008"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default About;
