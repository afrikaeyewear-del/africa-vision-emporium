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
    <section className="py-24 px-6 lg:px-8 bg-secondary text-secondary-foreground">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <span className="text-sm font-medium tracking-wider uppercase text-primary mb-4 block">
              About Africa Eyewear
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Vision Inspired by
              <br />
              <span className="text-primary">African Excellence</span>
            </h2>
            <p className="text-lg text-secondary-foreground/80 mb-6 leading-relaxed">
              At Africa Eyewear, we believe that eyewear is more than just an accessory—it's an expression of identity, culture, and style. Our exclusive collection bridges the gap between traditional African artistry and contemporary design.
            </p>
            <p className="text-lg text-secondary-foreground/80 leading-relaxed">
              Every piece in our collection tells a story, celebrating the vibrant colors, patterns, and spirit of Africa while embracing modern sophistication for today's discerning customer.
            </p>
          </div>

          <div className="grid gap-8 animate-fade-in-slow">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex gap-6 p-6 bg-background/5 backdrop-blur-sm rounded-2xl border border-border/10 hover:bg-background/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary-foreground/70">
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
