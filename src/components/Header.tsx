import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              Africa <span className="text-primary group-hover:text-primary/80 transition-colors">Vision</span> Emporium
            </h1>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            >
              Shop
            </Link>
            <Link 
              to="/#about" 
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/shop">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow-sm">
                  0
                </span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
