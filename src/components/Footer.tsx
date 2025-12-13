import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 african-pattern opacity-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4 lg:mb-6 group">
                <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white transition-opacity duration-500 group-hover:opacity-80">
                  Afrika
                </span>
                <img 
                  src={logo} 
                  alt="Afrika Eyewear Logo" 
                  className="h-8 lg:h-16 transition-opacity duration-500 group-hover:opacity-80" 
                />
                <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white transition-opacity duration-500 group-hover:opacity-80">
                  Eyewear
                </span>
              </Link>
              <p className="text-white/70 mb-2 max-w-md font-light leading-relaxed text-sm lg:text-base">
                CRAFTED FOR THE BOLD
              </p>
              <p className="text-white/70 mb-6 lg:mb-8 max-w-md font-light leading-relaxed text-sm lg:text-base">
              Where modern elegance meets South African heritage. Discover exclusive eyewear designs that celebrate culture and contemporary style. Proudly South African.
            </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
              </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
              </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary border border-white/10 hover:border-primary flex items-center justify-center transition-all duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
              <h4 className="font-semibold text-base lg:text-lg mb-5 lg:mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                  <Link 
                    to="/shop" 
                    className="text-white/70 hover:text-primary transition-colors duration-200 font-light text-sm lg:text-base inline-block"
                  >
                  Shop
                </Link>
              </li>
              <li>
                <a 
                  href="/#about"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === "/") {
                      const aboutSection = document.getElementById("about");
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    } else {
                      window.location.href = "/#about";
                    }
                  }}
                  className="text-white/70 hover:text-primary transition-colors duration-200 font-light text-sm lg:text-base inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                  <Link 
                    to="/contact" 
                    className="text-white/70 hover:text-primary transition-colors duration-200 font-light text-sm lg:text-base inline-block"
                  >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
              <h4 className="font-semibold text-base lg:text-lg mb-5 lg:mb-6">Contact</h4>
              <ul className="space-y-3 text-white/70 font-light text-sm lg:text-base">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@afrikaeyewear.co.za" className="hover:text-primary transition-colors duration-200">
                    info@afrikaeyewear.co.za
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="tel:+27111234567" className="hover:text-primary transition-colors duration-200">
                    +27 (0) 11 123 4567
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>123 Sandton Drive,<br />Sandton, Johannesburg, 2196</span>
                </li>
            </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-xs lg:text-sm font-light">
              &copy; {new Date().getFullYear()} AFRIKA EYEWEAR. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs lg:text-sm text-white/60 font-light">
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
