import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // If on home page, scroll to about section
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If on another page, navigate to home and then scroll
      window.location.href = "/#about";
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/98 backdrop-blur-xl border-b border-border/50 shadow-[var(--shadow-soft)]" 
          : "bg-white/0 backdrop-blur-none border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-28">
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-0.5">
            <Link 
              to="/" 
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-md ${
                isActive("/") 
                  ? "text-primary bg-primary/5" 
                  : isScrolled
                  ? "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-md ${
                isActive("/shop") 
                  ? "text-primary bg-primary/5" 
                  : isScrolled
                  ? "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md"
              }`}
            >
              Shop
            </Link>
            <a 
              href="/#about"
              onClick={handleAboutClick}
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-md ${
                isScrolled
                  ? "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md"
              }`}
            >
              About
            </a>
            <Link 
              to="/contact" 
              className={`px-5 py-2.5 text-sm font-semibold transition-all duration-200 rounded-md ${
                isActive("/contact") 
                  ? "text-primary bg-primary/5" 
                  : isScrolled
                  ? "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Logo */}
          <Link to="/" className="flex items-center group space-x-2">
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-black transition-opacity duration-500 group-hover:opacity-80">
              Afrika
            </span>
            <img 
              src={logo} 
              alt="Afrika Eyewear" 
              className={`h-6 lg:h-24 transition-opacity duration-500 ${
                isScrolled ? 'opacity-100' : 'opacity-90'
              } group-hover:opacity-80`} 
            />
            <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-black transition-opacity duration-500 group-hover:opacity-80">
              Eyewear
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link to="/shop">
              <Button 
                variant="ghost" 
                size="icon"
                className={`relative h-10 w-10 transition-all duration-200 ${
                  isScrolled
                    ? "hover:bg-primary/10 hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md"
                }`}
                aria-label="Shopping cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  0
                </span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={`md:hidden h-10 w-10 transition-all duration-200 ${
                isScrolled
                  ? "hover:bg-primary/10 hover:text-primary"
                  : "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border/50 py-4 animate-fade-in">
            <div className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/") 
                    ? "text-primary bg-primary/5" 
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/shop") 
                    ? "text-primary bg-primary/5" 
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <a 
                href="/#about"
                onClick={handleAboutClick}
                className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
              >
                About
              </a>
              <Link 
                to="/contact" 
                className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive("/contact") 
                    ? "text-primary bg-primary/5" 
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
