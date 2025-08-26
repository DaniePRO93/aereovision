import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  MessageSquare
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
  const handleWhatsAppClick = () => {
    const whatsappUrl = "https://wa.me/50250889835";
    window.location.href = whatsappUrl;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border border-primary/20">
        <DialogHeader className="space-y-4 pb-6 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-neon-green bg-clip-text text-transparent text-center">
            Contact Us
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <Button
            onClick={handleWhatsAppClick}
            className="w-full btn-hero h-14 text-lg font-semibold"
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            Contact via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};