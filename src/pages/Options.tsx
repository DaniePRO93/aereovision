import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Camera, 
  Video, 
  Zap, 
  MapPin, 
  Check, 
  X,
  Sparkles,
  MessageCircle,
  Plus,
  Clock,
  Settings,
  Image,
  Music,
  Palette,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const servicePackages = [
  {
    id: "aerial-photography",
    icon: Camera,
    title: "Aerial Photography",
    description: "High-resolution aerial shots perfect for real estate, events, and marketing campaigns.",
    startingPrice: 50,
    standardPrice: 150,
    proPrice: 250,
    startingFeatures: [
      "5-10 high-res photos",
      "Basic editing",
      "5 min flight time",
      "JPEG format delivery"
    ],
    standardFeatures: [
      "20-30 high-res photos",
      "Professional editing & color correction",
      "10-15 min flight time",
      "JPEG + RAW format delivery",
      "Multiple angles & compositions",
      "Property highlight shots"
    ],
    proFeatures: [
      "50+ high-res photos",
      "Premium editing & advanced color grading",
      "20-25 min flight time",
      "JPEG + RAW + edited formats",
      "Multiple angles & artistic compositions",
      "Property highlight + lifestyle shots",
      "Drone + ground photography combo",
      "Same-day preview delivery",
      "Commercial usage rights"
    ],
    extras: [
      { name: "Extra flight time (per min)", price: 15 },
      { name: "Rush delivery (24hrs)", price: 25 },
      { name: "Additional editing requests", price: 20 },
      { name: "Sunset/Golden hour timing", price: 30 },
      { name: "360° panoramic shots", price: 40 }
    ]
  },
  {
    id: "cinematic-videography",
    icon: Video,
    title: "Cinematic Videography",
    description: "Professional 4K drone footage with smooth cinematic movements and color grading.",
    startingPrice: 60,
    standardPrice: 180,
    proPrice: 350,
    startingFeatures: [
      "Basic 4K drone footage",
      "3 min edited clip",
      "Basic stabilization",
      "Standard delivery (7 days)"
    ],
    standardFeatures: [
      "Professional 4K drone footage",
      "6 min edited clips (2x 3min)",
      "Smooth cinematic movements",
      "Professional color grading",
      "Royalty-free music overlay",
      "Motion graphics & titles"
    ],
    proFeatures: [
      "Premium 4K/6K drone footage",
      "12 min edited clips (4x 3min)",
      "Advanced cinematic movements & transitions",
      "Hollywood-grade color grading",
      "Custom music composition",
      "Advanced motion graphics & VFX",
      "Drone + ground video combo",
      "Multiple camera angles",
      "Commercial license included"
    ],
    extras: [
      { name: "Extra footage (per min)", price: 30 },
      { name: "Custom music licensing", price: 50 },
      { name: "Advanced VFX effects", price: 75 },
      { name: "Drone + ground combo", price: 100 },
      { name: "Multiple location shoots", price: 80 }
    ]
  },
  {
    id: "fpv-drone-tours",
    icon: Zap,
    title: "FPV Drone Tours",
    description: "Dynamic FPV drone flights through tight spaces with creative routing and post-processing.",
    startingPrice: 80,
    standardPrice: 240,
    proPrice: 450,
    startingFeatures: [
      "Basic FPV footage",
      "4 min flight time",
      "Standard post-processing",
      "Single route/path"
    ],
    standardFeatures: [
      "Professional FPV footage",
      "8 min total flight time",
      "Creative routes & tracking",
      "4K resolution + advanced post-processing",
      "Multiple creative angles",
      "Smooth transitions & cuts"
    ],
    proFeatures: [
      "Premium FPV + cinematic drone combo",
      "15 min total flight time",
      "Complex multi-path routes",
      "6K resolution + cinematic post-processing",
      "Interior & exterior seamless transitions",
      "Advanced VFX & speed ramping",
      "Custom choreographed movements",
      "Music synchronization",
      "Professional commercial delivery"
    ],
    extras: [
      { name: "Extra complex routes", price: 40 },
      { name: "Interior + exterior combo", price: 60 },
      { name: "Slow-motion sequences", price: 35 },
      { name: "Custom flight patterns", price: 50 },
      { name: "Night/low-light FPV", price: 70 }
    ]
  },
  {
    id: "ground-photography",
    icon: MapPin,
    title: "Ground Photography",
    description: "Professional ground-level photography for events, portraits, and product shoots.",
    startingPrice: 40,
    standardPrice: 100,
    proPrice: 200,
    startingFeatures: [
      "1 hour session",
      "15-20 photos",
      "Basic editing",
      "Digital delivery only"
    ],
    standardFeatures: [
      "2-3 hour session",
      "40-60 high-res photos",
      "Professional editing & correction",
      "Multiple outfit/setup changes",
      "Digital gallery + prints option",
      "Location scouting included"
    ],
    proFeatures: [
      "4-5 hour premium session",
      "100+ high-res photos",
      "Advanced editing & artistic processing",
      "Multiple locations & setups",
      "Premium digital gallery + print packages",
      "Professional styling consultation",
      "Behind-the-scenes video",
      "Commercial usage rights",
      "Same-day preview delivery"
    ],
    extras: [
      { name: "Extra hour of shooting", price: 25 },
      { name: "Additional photo edits (per 10)", price: 15 },
      { name: "Print package (20 photos)", price: 45 },
      { name: "Same-day preview delivery", price: 20 },
      { name: "Professional makeup artist", price: 80 }
    ]
  }
];

const Options = () => {
  const { toast } = useToast();
  const [selectedPackages, setSelectedPackages] = useState<{[key: string]: {
    tier: 'starting' | 'standard' | 'pro',
    extras: string[]
  }}>({});

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Service Options & Pricing - AeroVision Drone Photography";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Compare starting vs standard drone photography packages. Choose from aerial photography, cinematic videography, FPV tours, and ground photography with customizable extras.'
      );
    }
  }, []);

  const handlePackageSelect = (packageId: string, tier: 'starting' | 'standard' | 'pro') => {
    setSelectedPackages(prev => ({
      ...prev,
      [packageId]: {
        tier,
        extras: prev[packageId]?.extras || []
      }
    }));
  };

  const handleExtraToggle = (packageId: string, extraName: string) => {
    setSelectedPackages(prev => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        tier: prev[packageId]?.tier || 'starting',
        extras: prev[packageId]?.extras?.includes(extraName)
          ? prev[packageId].extras.filter(e => e !== extraName)
          : [...(prev[packageId]?.extras || []), extraName]
      }
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedPackages).reduce((total, [packageId, selection]) => {
      const pkg = servicePackages.find(p => p.id === packageId);
      if (!pkg) return total;
      
      const basePrice = selection.tier === 'pro' ? pkg.proPrice : 
                        selection.tier === 'standard' ? pkg.standardPrice : pkg.startingPrice;
      const extrasPrice = selection.extras.reduce((extrasTotal, extraName) => {
        const extra = pkg.extras.find(e => e.name === extraName);
        return extrasTotal + (extra?.price || 0);
      }, 0);
      
      return total + basePrice + extrasPrice;
    }, 0);
  };

  const handleBookSelected = () => {
    const selectedCount = Object.keys(selectedPackages).length;
    if (selectedCount === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service package to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Request Prepared",
      description: `${selectedCount} service(s) selected. Total: $${calculateTotal()}. Redirecting to contact...`,
    });

    // Scroll to contact or redirect
    setTimeout(() => {
      window.location.href = "/#contact";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover-glow">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-xl font-bold text-glow">Back to Home</span>
            </Link>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Total Selected: </span>
              <span className="text-2xl font-bold text-primary">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block">⚙️ <span className="text-glow">Service</span></span>
              <span className="block text-metallic">Options & Pricing</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              Compare starting packages vs full professional services. Add extras to customize your perfect shoot package.
            </p>
          </div>

          {/* Service Packages */}
          <div className="space-y-12">
            {servicePackages.map((pkg) => {
              const selection = selectedPackages[pkg.id];
              const isSelected = !!selection;
              
              return (
                <Card key={pkg.id} className={`card-glass overflow-hidden ${isSelected ? 'card-neon' : ''}`}>
                  <div className="p-8">
                    {/* Package Header */}
                    <div className="flex items-center mb-8">
                      <div className="inline-flex p-4 rounded-lg bg-primary/20 text-primary mr-6">
                        <pkg.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{pkg.title}</h2>
                        <p className="text-muted-foreground text-lg">{pkg.description}</p>
                      </div>
                    </div>

                    {/* Pricing Comparison - Now 3 columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                      {/* Starting Package */}
                      <div className={`relative rounded-2xl border-2 p-6 transition-all duration-300 ${
                        selection?.tier === 'starting' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold">Starting Package</h3>
                          <Badge variant="secondary">School Friendly</Badge>
                        </div>
                        
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-primary">${pkg.startingPrice}</span>
                          <span className="text-muted-foreground ml-2">base price</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {pkg.startingFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className={`w-full ${selection?.tier === 'starting' ? 'btn-hero' : 'btn-secondary-hero'}`}
                          onClick={() => handlePackageSelect(pkg.id, 'starting')}
                        >
                          {selection?.tier === 'starting' ? 'Selected' : 'Select Starting'}
                          <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      {/* Standard Package */}
                      <div className={`relative rounded-2xl border-2 p-6 transition-all duration-300 ${
                        selection?.tier === 'standard' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold">Standard Package</h3>
                          <Badge className="bg-gradient-to-r from-primary to-primary-glow">Professional</Badge>
                        </div>
                        
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-primary">${pkg.standardPrice}</span>
                          <span className="text-muted-foreground ml-2">full service</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {pkg.standardFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className={`w-full ${selection?.tier === 'standard' ? 'btn-hero' : 'btn-secondary-hero'}`}
                          onClick={() => handlePackageSelect(pkg.id, 'standard')}
                        >
                          {selection?.tier === 'standard' ? 'Selected' : 'Select Standard'}
                          <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      {/* Pro Package */}
                      <div className={`relative rounded-2xl border-2 p-6 transition-all duration-300 ${
                        selection?.tier === 'pro' 
                          ? 'border-neon-green bg-neon-green/5' 
                          : 'border-border hover:border-neon-green/50'
                      }`}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold">Pro Package</h3>
                          <Badge className="bg-gradient-to-r from-neon-green to-primary text-black">Premium</Badge>
                        </div>
                        
                        <div className="mb-6">
                          <span className="text-4xl font-bold" style={{color: 'hsl(var(--neon-green))'}}>${pkg.proPrice}</span>
                          <span className="text-muted-foreground ml-2">premium</span>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {pkg.proFeatures.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-3 flex-shrink-0" style={{color: 'hsl(var(--neon-green))'}} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className={`w-full ${
                            selection?.tier === 'pro' 
                              ? 'bg-gradient-to-r from-neon-green to-primary text-black hover:scale-105' 
                              : 'btn-secondary-hero'
                          }`}
                          onClick={() => handlePackageSelect(pkg.id, 'pro')}
                        >
                          {selection?.tier === 'pro' ? 'Selected' : 'Select Pro'}
                          <Sparkles className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Add-on Extras */}
                    {isSelected && (
                      <div className="border-t border-border pt-8">
                        <h3 className="text-xl font-semibold mb-6 flex items-center">
                          <Plus className="h-5 w-5 mr-2 text-primary" />
                          Add-on Extras
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pkg.extras.map((extra, index) => {
                            const isExtraSelected = selection.extras.includes(extra.name);
                            
                            return (
                              <div 
                                key={index}
                                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                                  isExtraSelected 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => handleExtraToggle(pkg.id, extra.name)}
                              >
                                <div className="flex items-center space-x-3">
                                  <Checkbox 
                                    checked={isExtraSelected}
                                    onChange={() => {}}
                                    className="pointer-events-none"
                                  />
                                  <span className="text-sm font-medium">{extra.name}</span>
                                </div>
                                <span className="text-primary font-semibold">+${extra.price}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Summary & Booking */}
          {Object.keys(selectedPackages).length > 0 && (
            <div className="mt-16">
              <Card className="card-neon p-8 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-6 text-center">
                  <span className="text-glow">Booking Summary</span>
                </h3>
                
                <div className="space-y-4 mb-8">
                  {Object.entries(selectedPackages).map(([packageId, selection]) => {
                    const pkg = servicePackages.find(p => p.id === packageId);
                    if (!pkg) return null;
                    
                    const basePrice = selection.tier === 'pro' ? pkg.proPrice : 
                                      selection.tier === 'standard' ? pkg.standardPrice : pkg.startingPrice;
                    const extrasPrice = selection.extras.reduce((total, extraName) => {
                      const extra = pkg.extras.find(e => e.name === extraName);
                      return total + (extra?.price || 0);
                    }, 0);
                    
                    return (
                      <div key={packageId} className="flex justify-between items-center p-4 bg-card/50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">{pkg.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {selection.tier} package
                            {selection.extras.length > 0 && ` + ${selection.extras.length} extras`}
                          </p>
                        </div>
                        <span className="text-xl font-bold text-primary">
                          ${basePrice + extrasPrice}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border pt-6 mb-8">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span>Total Cost:</span>
                    <span className="text-primary">${calculateTotal()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="btn-hero text-lg px-8 py-4"
                    onClick={handleBookSelected}
                  >
                    Book Selected Services
                    <Camera className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button 
                    className="btn-secondary-hero text-lg px-8 py-4"
                    onClick={() => window.open('https://wa.me/50258221477?text=Hi! I need a custom quote for my selected services.', '_blank')}
                  >
                    Get Custom Quote
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Options;