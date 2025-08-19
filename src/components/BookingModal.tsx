import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Check,
  CreditCard,
  Shield,
  Star
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const packagesSummary = packages.map(pkg => {
      let summary = `${pkg.title} (${pkg.tier.toUpperCase()}) - $${pkg.price}`;
      if (pkg.extras.length > 0) {
        summary += '\nExtras:\n';
        pkg.extras.forEach(extra => {
          summary += `  - ${extra.name} (+$${extra.price})\n`;
        });
      }
      return summary;
    }).join('\n\n');

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || "No additional requirements specified.",
          type: 'booking',
          packages: packagesSummary,
          total: total
        }
      });

      if (error) throw error;

      toast({
        title: "Booking Request Sent!",
        description: `Your booking request for $${total} has been sent. We'll contact you within 24 hours.`,
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      onClose();
      
    } catch (error) {
      console.error('Error sending booking request:', error);
      toast({
        title: "Error Sending Booking",
        description: "Please try again or contact us directly at danielrosalesdestaracacton@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
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
              <CreditCard className="h-4 w-4 mr-2 text-neon-green" />
              No Payment Required
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-hero h-14 text-lg font-semibold"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" />
                Sending Booking Request...
              </>
            ) : (
              <>
                <Check className="h-5 w-5 mr-3" />
                Send Booking Request - ${total}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting this form, you agree to receive communications about your booking request.
            No payment is required at this time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};