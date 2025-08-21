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

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name to continue.",
        variant: "destructive"
      });
      return;
    }

    // Build the WhatsApp message
    let message = `¡Hola AeroVision! 👋\n\n`;
    message += `Mi nombre es *${formData.name}*\n`;
    
    if (formData.email) {
      message += `📧 Email: ${formData.email}\n`;
    }
    
    if (formData.phone) {
      message += `📱 Teléfono: ${formData.phone}\n`;
    }
    
    message += `\n🎬 *SOLICITUD DE RESERVA*\n\n`;
    
    // Add package details
    packages.forEach((pkg, index) => {
      message += `📦 *Paquete ${index + 1}:*\n`;
      message += `• ${pkg.title} (${pkg.tier.toUpperCase()})\n`;
      message += `• Precio: $${pkg.price}\n`;
      
      if (pkg.extras.length > 0) {
        message += `• *Extras seleccionados:*\n`;
        pkg.extras.forEach(extra => {
          message += `  - ${extra.name} (+$${extra.price})\n`;
        });
      }
      message += `\n`;
    });
    
    message += `💰 *TOTAL: $${total}*\n\n`;
    
    if (formData.message) {
      message += `📝 *Detalles adicionales:*\n${formData.message}\n\n`;
    }
    
    message += `Estoy interesado/a en reservar estos servicios. ¿Podrían confirmar disponibilidad? ✈️📸`;

    // Create WhatsApp URL
    const phoneNumber = "50258221477"; // AeroVision phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message and close modal
    toast({
      title: "¡Redirigiendo a WhatsApp!",
      description: "Se abrirá WhatsApp con tu solicitud de reserva lista para enviar.",
    });
    
    // Reset form and close modal
    setFormData({ name: "", email: "", phone: "", message: "" });
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

        {/* Booking Form */}
        <form onSubmit={handleWhatsAppBooking} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center">
                <User className="h-4 w-4 mr-2 text-primary" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+502 1234-5678"
              className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              Project Details & Special Requirements
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Describe your project, location, timeline, and any special requirements..."
              rows={4}
              className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 py-4 border-t border-border/30">
            <div className="flex items-center text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mr-2 text-neon-green" />
              Secure Process
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="h-4 w-4 mr-2 text-neon-green" />
              24h Response
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4 mr-2 text-neon-green" />
              WhatsApp Direct
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-hero h-14 text-lg font-semibold"
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            Continue to WhatsApp - ${total}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This will open WhatsApp with your booking details pre-filled.
            No payment is required at this time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};