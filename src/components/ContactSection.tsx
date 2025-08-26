import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, MessageCircle, Instagram, Youtube, Camera } from "lucide-react";

const ContactSection = () => {
  return <section id="contact" className="py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-glow">Let's Create</span> <span className="text-metallic">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to capture your vision from new perspectives? Get in touch and let's discuss 
            how we can bring your project to life with stunning aerial cinematography.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* WhatsApp Contact */}
          <div className="lg:col-span-2">
            <Card className="card-glass p-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Us Directly</h3>
              <p className="text-muted-foreground mb-8">
                Ready to discuss your project? Click the button below to start a conversation with us on WhatsApp.
              </p>
              
              <Button 
                onClick={() => window.location.href = "https://wa.me/50250889835"}
                className="btn-hero w-full h-14 text-lg"
              >
                Contact via WhatsApp
                <MessageCircle className="ml-3 h-5 w-5" />
              </Button>
            </Card>
          </div>

          {/* Contact Info & Service Area */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="card-glass p-6">
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>ventas@aerovision.gt</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+502 5088-9835</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>Guatemala City & Surrounding Areas</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="font-semibold mb-4">Follow Our Work</h4>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Youtube className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service Area Map */}
            <Card className="card-glass p-6">
              
              
              <p className="text-sm text-muted-foreground mt-4">
                We serve Guatemala City and surrounding regions. 
                Long-distance projects available upon request.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;