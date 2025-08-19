import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookingModal } from "@/components/BookingModal";
import { 
  Check, 
  Sparkles, 
  ShoppingCart,
  X
} from "lucide-react";

interface ServicePackage {
  id: string;
  icon: any;
  title: string;
  description: string;
  startingPrice: number;
  standardPrice: number;
  proPrice: number;
  startingFeatures: string[];
  standardFeatures: string[];
  proFeatures: string[];
  extras: Array<{ name: string; price: number }>;
}

interface ServicePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: ServicePackage | null;
}

export const ServicePackageModal = ({ isOpen, onClose, package: pkg }: ServicePackageModalProps) => {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<'starting' | 'standard' | 'pro' | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!pkg) return null;

  const handleExtraToggle = (extraName: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    );
  };

  const calculateTotal = () => {
    if (!selectedTier) return 0;
    
    const basePrice = selectedTier === 'pro' ? pkg.proPrice : 
                      selectedTier === 'standard' ? pkg.standardPrice : pkg.startingPrice;
    
    const extrasPrice = selectedExtras.reduce((total, extraName) => {
      const extra = pkg.extras.find(e => e.name === extraName);
      return total + (extra?.price || 0);
    }, 0);
    
    return basePrice + extrasPrice;
  };

  const handleBookNow = () => {
    if (!selectedTier) {
      toast({
        title: "Select a Package",
        description: "Please choose Starting, Standard, or Pro package first.",
        variant: "destructive"
      });
      return;
    }
    
    setShowBookingModal(true);
  };

  const getPackageForBooking = () => {
    if (!selectedTier) return [];
    
    const tierPrice = selectedTier === 'pro' ? pkg.proPrice : 
                      selectedTier === 'standard' ? pkg.standardPrice : pkg.startingPrice;
    
    const selectedExtrasData = selectedExtras.map(extraName => {
      const extra = pkg.extras.find(e => e.name === extraName);
      return extra ? { name: extra.name, price: extra.price } : null;
    }).filter(Boolean) as Array<{ name: string; price: number }>;
    
    return [{
      title: pkg.title,
      tier: selectedTier,
      price: tierPrice,
      extras: selectedExtrasData
    }];
  };

  const handleModalClose = () => {
    setSelectedTier(null);
    setSelectedExtras([]);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border border-primary/20">
          <DialogHeader className="space-y-4 pb-6 border-b border-border/50">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-neon-green bg-clip-text text-transparent flex items-center">
              <pkg.icon className="h-8 w-8 mr-4 text-primary" />
              {pkg.title} Packages
            </DialogTitle>
            <p className="text-muted-foreground text-lg">{pkg.description}</p>
          </DialogHeader>

          {/* Package Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Starting Package */}
            <Card className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedTier === 'starting' 
                ? 'border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.2)]' 
                : 'border-border hover:border-primary/50'
            }`} onClick={() => setSelectedTier('starting')}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Starting</h4>
                <Badge variant="secondary">Budget Friendly</Badge>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">${pkg.startingPrice}</span>
                <span className="text-muted-foreground ml-2">base</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.startingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedTier === 'starting' && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <span className="text-sm font-medium text-primary">✓ Selected</span>
                </div>
              )}
            </Card>

            {/* Standard Package */}
            <Card className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedTier === 'standard' 
                ? 'border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.2)]' 
                : 'border-border hover:border-primary/50'
            }`} onClick={() => setSelectedTier('standard')}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Standard</h4>
                <Badge className="bg-gradient-to-r from-primary to-primary-glow">Popular</Badge>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">${pkg.standardPrice}</span>
                <span className="text-muted-foreground ml-2">professional</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedTier === 'standard' && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <span className="text-sm font-medium text-primary">✓ Selected</span>
                </div>
              )}
            </Card>

            {/* Pro Package */}
            <Card className={`p-6 cursor-pointer transition-all duration-300 ${
              selectedTier === 'pro' 
                ? 'border-neon-green bg-neon-green/5 shadow-[0_0_20px_hsl(var(--neon-green)/0.2)]' 
                : 'border-border hover:border-neon-green/50'
            }`} onClick={() => setSelectedTier('pro')}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Pro</h4>
                <Badge className="bg-gradient-to-r from-neon-green to-primary text-white">Premium</Badge>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-neon-green">${pkg.proPrice}</span>
                <span className="text-muted-foreground ml-2">premium</span>
              </div>

              <ul className="space-y-2 mb-6">
                {pkg.proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-neon-green mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {selectedTier === 'pro' && (
                <div className="mt-4 p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                  <span className="text-sm font-medium text-neon-green">✓ Selected</span>
                </div>
              )}
            </Card>
          </div>

          {/* Extras Section */}
          {selectedTier && (
            <Card className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 border border-primary/20">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-neon-green" />
                Add Extras
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.extras.map((extra, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30 hover:border-primary/30 transition-colors">
                    <div className="flex items-center">
                      <Checkbox
                        id={`extra-${index}`}
                        checked={selectedExtras.includes(extra.name)}
                        onCheckedChange={() => handleExtraToggle(extra.name)}
                        className="mr-3"
                      />
                      <label htmlFor={`extra-${index}`} className="text-sm font-medium cursor-pointer">
                        {extra.name}
                      </label>
                    </div>
                    <span className="text-sm font-bold text-neon-green">+${extra.price}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Total & Actions */}
          {selectedTier && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/30">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">Total Package Price</p>
                <p className="text-3xl font-bold text-primary">${calculateTotal()}</p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleModalClose}
                  className="btn-secondary-hero"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                
                <Button 
                  onClick={handleBookNow}
                  className="btn-hero px-8"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Book This Package
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          handleModalClose();
        }}
        packages={getPackageForBooking()}
        total={calculateTotal()}
      />
    </>
  );
};