import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Camera } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'nav-solid' : 'nav-glass'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Premium Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative p-3 bg-gradient-to-br from-primary/20 to-neon-green/20 rounded-2xl border border-primary/30 hover:scale-110 transition-transform duration-300">
              <Camera className="h-7 w-7 text-primary" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-neon-green/10 rounded-2xl animate-pulse-subtle" />
            </div>
            <span className="font-display text-2xl font-bold text-gradient-hero tracking-wider">AEROVISION</span>
          </div>

          {/* Premium Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-body text-foreground hover:text-primary hover-glow transition-all duration-300 relative group font-medium tracking-wide"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-neon-green transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Premium CTA Button */}
          <div className="hidden md:block">
            <Button className="btn-hero font-body font-bold tracking-wide">
              GET QUOTE
            </Button>
          </div>

          {/* Premium Mobile Menu Button */}
          <button
            className="md:hidden p-3 text-foreground hover:text-primary hover-glow transition-all duration-300 rounded-xl border border-border/30 hover:border-primary/30"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Premium Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-border/30 bg-gradient-to-b from-card/50 to-card/30 backdrop-blur-xl">
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-body text-foreground hover:text-primary hover-glow transition-all duration-300 py-3 font-medium tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="btn-hero mt-6 self-start font-body font-bold tracking-wide">
                GET QUOTE
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;