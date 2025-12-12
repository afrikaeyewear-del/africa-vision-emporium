import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash === "#about") {
      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
