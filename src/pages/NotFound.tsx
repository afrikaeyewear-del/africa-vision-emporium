import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
              Error 404
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-foreground mb-4 lg:mb-6 tracking-tight">
            404
          </h1>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg text-foreground/60 mb-8 lg:mb-10 max-w-md mx-auto font-light leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button 
                size="lg"
                className="group bg-primary hover:bg-primary/95 text-primary-foreground font-medium px-8 lg:px-10 py-6 lg:py-7 text-base lg:text-lg shadow-[var(--shadow-medium)] transition-all duration-300 hover:shadow-[var(--shadow-luxury)] hover:-translate-y-0.5 rounded-md"
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button 
                size="lg"
                variant="outline"
                className="group border-2 border-border/50 bg-white hover:bg-foreground hover:text-white hover:border-foreground font-medium px-8 lg:px-10 py-6 lg:py-7 text-base lg:text-lg transition-all duration-300 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] rounded-md"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Browse Shop
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
