import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Check,
  Shield,
  Star,
  MessageCircle
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: Array<{
    title: string;
    tier: string;
    price: number;
    extras: Array<{ name: string; price: number }>;
  }>;
  total: number;
}

export const BookingModal = ({ isOpen, onClose, packages, total }: BookingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleWhatsAppBooking = () => {
    // Simple WhatsApp redirect with standard message
    const message = "Hola! Estoy interesado en sus servicios de fotografía aérea. ¿Podrían darme más información?";
    const phoneNumber = "50258221477";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border border-primary/20">
        <DialogHeader className="space-y-4 pb-6 border-b border-border/50">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-neon-green bg-clip-text text-transparent">
            Complete Your Booking
          </DialogTitle>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secure booking process</span>
          </div>
        </DialogHeader>

        {/* Order Summary */}
        <Card className="bg-gradient-to-r from-primary/5 to-neon-green/5 border border-primary/20 p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <Badge className="bg-gradient-to-r from-primary to-neon-green text-white">
              <Star className="h-3 w-3 mr-1" />
              Premium Package
            </Badge>
          </div>
          
          <div className="space-y-3">
            {packages.map((pkg, index) => (
              <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/30">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{pkg.title}</h4>
                  <span className="text-primary font-semibold">${pkg.price}</span>
                </div>
                <p className="text-sm text-muted-foreground capitalize">{pkg.tier} Package</p>
                {pkg.extras.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/30">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Extras:</p>
                    {pkg.extras.map((extra, extraIndex) => (
                      <div key={extraIndex} className="flex justify-between text-xs">
                        <span>{extra.name}</span>
                        <span className="text-neon-green">+${extra.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Investment:</span>
              <span className="text-2xl bg-gradient-to-r from-primary to-neon-green bg-clip-text text-transparent">
                ${total}
              </span>
            </div>
          </div>
        </Card>

        {/* Contact via WhatsApp */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            ¿Listo para reservar estos servicios? Contáctanos directamente por WhatsApp para finalizar tu reserva.
          </p>
          
          <Button
            onClick={handleWhatsAppBooking}
            className="w-full btn-hero h-14 text-lg font-semibold"
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            Contactar por WhatsApp
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Te redirigiremos a WhatsApp para que puedas hablar directamente con nuestro equipo.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};