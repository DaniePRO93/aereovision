import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Youtube,
  MessageCircle,
  ArrowUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-glow rounded-lg">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-metallic">AeroVision</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional drone aerial and ground photography services. 
              Capturing breathtaking moments from angles that inspire.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-primary mr-3" />
                <span>hello@aerovision.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-primary mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-primary mr-3" />
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-glow">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-glow">Services</h3>
            <ul className="space-y-3">
              {[
                "Aerial Photography",
                "Cinematic Videography",
                "FPV Drone Tours",
                "Ground Photography",
                "Real Estate Media",
                "Event Coverage"
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-glow">Stay Connected</h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get updates on our latest work and exclusive offers.
            </p>
            
            <div className="flex space-x-2 mb-6">
              <Input 
                placeholder="Enter your email"
                className="bg-input/50 border-border/50 focus:border-primary"
              />
              <Button className="btn-hero px-4">
                <Mail className="h-4 w-4" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-medium">Follow Our Work</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                  <Youtube className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 AeroVision. All rights reserved. | Licensed FAA Part 107 Pilot
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={scrollToTop}
              className="p-2 hover:bg-primary/10"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;