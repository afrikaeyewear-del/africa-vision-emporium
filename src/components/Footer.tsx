import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-foreground py-16 px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-semibold mb-4 text-white">
              Africa <span className="text-primary">Vision</span> Emporium
            </h3>
            <p className="text-white/70 mb-6 max-w-md font-light">
              Where modern elegance meets South African heritage. Discover exclusive eyewear designs that celebrate culture and contemporary style. Proudly South African.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-white/70 hover:text-primary transition-colors font-light">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-white/70 hover:text-primary transition-colors font-light">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-primary transition-colors font-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-white/70 font-light">
              <li>info@africaeyewear.co.za</li>
              <li>+27 (0) 11 123 4567</li>
              <li className="text-sm">123 Sandton Drive, Sandton, Johannesburg, 2196</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm font-light">
          <p>&copy; {new Date().getFullYear()} Africa Vision Emporium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
