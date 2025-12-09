import { Sparkles, Award, Globe } from "lucide-react";

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
  return (
    <section id="about" className="py-24 px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
              About Africa Vision Emporium
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
              Vision Inspired by
              <br />
              <span className="text-primary">African Excellence</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed font-light">
              At Africa Vision Emporium, we believe that eyewear is more than just an accessory—it's an expression of identity, culture, and style. Based in Johannesburg, South Africa, our exclusive collection bridges the gap between traditional African artistry and contemporary design.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed font-light">
              Every piece in our collection tells a story, celebrating the vibrant colors, patterns, and spirit of South Africa while embracing modern sophistication for today's discerning customer. We're proud to be a homegrown South African brand, crafting eyewear that reflects our rich heritage.
            </p>
          </div>

          <div className="grid gap-6 animate-fade-in-slow">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex gap-6 p-6 bg-white rounded-lg border border-border/50 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] transition-all duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 font-light">
                      {feature.description}
                    </p>
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
