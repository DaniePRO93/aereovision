import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/50250889835";
const INSTAGRAM_URL = "https://www.instagram.com/aerovision.gt/";

const ContactSection = () => {
  return <section id="contact" className="py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-glow">Creemos</span> <span className="text-metallic">Juntos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Listo para capturar tu visión desde nuevas perspectivas? Escríbenos y conversemos
            sobre cómo dar vida a tu proyecto con cinematografía aérea impresionante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* WhatsApp Contact */}
          <div className="lg:col-span-2">
            <Card className="card-glass p-8">
              <h3 className="text-2xl font-semibold mb-6">Contáctanos Directamente</h3>
              <p className="text-muted-foreground mb-8">
                ¿Listo para hablar de tu proyecto? Haz clic en el botón para iniciar una conversación con nosotros por WhatsApp.
              </p>

              <Button
                onClick={() => window.location.href = WHATSAPP_URL}
                className="btn-hero w-full h-14 text-lg"
              >
                Contactar por WhatsApp
                <MessageCircle className="ml-3 h-5 w-5" />
              </Button>
            </Card>
          </div>

          {/* Contact Info & Service Area */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="card-glass p-6">
              <h3 className="text-xl font-semibold mb-6">Ponte en Contacto</h3>

              <div className="space-y-4">
                <a href="mailto:ventas@aerovision.gt" className="flex items-center hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>ventas@aerovision.gt</span>
                </a>

                <a href="tel:+50250889835" className="flex items-center hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+502 5088-9835</span>
                </a>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>Ciudad de Guatemala y alrededores</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="font-semibold mb-4">Sigue Nuestro Trabajo</h4>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-primary/10"
                    onClick={() => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")}
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-primary/10"
                    onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service Area */}
            <Card className="card-glass p-6">
              <h3 className="text-xl font-semibold mb-2">Área de Servicio</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Atendemos la Ciudad de Guatemala y regiones aledañas.
                Proyectos de larga distancia disponibles bajo solicitud.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;
