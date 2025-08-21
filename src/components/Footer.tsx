
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  MessageCircle,
  ArrowUp
} from "lucide-react";
import AeroVisionLogo from "@/components/ui/AeroVisionLogo";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = () => {
    if (email) {
      toast({
        title: "¡Suscrito!",
        description: "Gracias por suscribirte a nuestro boletín.",
      });
      setEmail("");
    }
  };

  const openSocialLink = (platform: string) => {
    const links = {
      instagram: "https://www.instagram.com/aereovision.gt?utm_source=ig_web_button_share_sheet&igsh=MTVjb3R4ZWo4ZmJ0bA==",
      whatsapp: "https://wa.me/50258221477"
    };
    window.open(links[platform as keyof typeof links], '_blank');
  };

  const openEmail = () => {
    window.location.href = "mailto:danielrosalesdestaracacton@gmail.com";
  };

  const openPhone = () => {
    window.location.href = "tel:+50258221477";
  };

  return (
    <footer className="bg-background border-t border-border/50 relative">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6 cursor-pointer group" onClick={scrollToTop}>
              <div className="p-2 bg-gradient-to-r from-primary to-primary-glow rounded-lg">
                <AeroVisionLogo size="small" animated />
              </div>
              <span className="text-xl font-bold text-metallic">AeroVision</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Servicios profesionales de fotografía aérea y terrestre con drones. 
              Capturamos momentos impresionantes desde ángulos que inspiran.
            </p>

            <div className="space-y-3">
              <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" onClick={openEmail}>
                <Mail className="h-4 w-4 text-primary mr-3" />
                <span>danielrosalesdestaracacton@gmail.com</span>
              </div>
              <div className="flex items-center text-sm cursor-pointer hover:text-primary transition-colors" onClick={openPhone}>
                <Phone className="h-4 w-4 text-primary mr-3" />
                <span>+502 5822-1477</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-primary mr-3" />
                <span>Guatemala City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-glow">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "home" },
                { name: "Portafolio", href: "portfolio" },
                { name: "Servicios", href: "services" },
                { name: "Acerca de", href: "about" },
                { name: "Contacto", href: "contact" }
              ].map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-glow">Servicios</h3>
            <ul className="space-y-3">
              {[
                "Fotografía Aérea",
                "Videografía Cinematográfica",
                "Tours FPV con Drones",
                "Fotografía Terrestre",
                "Medios para Bienes Raíces",
                "Cobertura de Eventos"
              ].map((service) => (
                <li key={service}>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-glow">Mantente Conectado</h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              Suscríbete para recibir actualizaciones de nuestro trabajo y ofertas exclusivas.
            </p>
            
            <div className="flex space-x-2 mb-6">
              <Input 
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input/50 border-border/50 focus:border-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
              />
              <Button 
                className="btn-hero px-4"
                onClick={handleNewsletterSubmit}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-medium">Sigue Nuestro Trabajo</h4>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-primary/10"
                  onClick={() => openSocialLink('instagram')}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-primary/10"
                  onClick={() => openSocialLink('whatsapp')}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 AeroVision. Todos los derechos reservados. | Fotografía Profesional con Drones
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              Términos de Servicio
            </button>
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
