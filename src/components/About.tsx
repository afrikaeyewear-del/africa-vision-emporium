import { Sparkles, Award, Globe } from "lucide-react";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

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
    </section>
  );
};

export default About;
