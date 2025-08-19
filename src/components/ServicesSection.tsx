import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Video, 
  Zap, 
  MapPin, 
  Star,
  ArrowRight,
  Settings
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const serviceData = [
  {
    id: "aerial-photography",
    icon: Camera,
    title: "Aerial Photography",
    description: "High-resolution aerial shots perfect for real estate, events, and marketing campaigns.",
    startingPrice: 50,
    standardPrice: 150,
    proPrice: 250,
    features: ["High-resolution photos", "Professional editing", "Multiple angles", "Fast delivery"],
    popular: false,
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
    features: ["4K video quality", "Cinematic movements", "Professional editing", "Music overlay"],
    popular: true,
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
    features: ["FPV immersive experience", "Creative flight paths", "Advanced post-processing", "Unique perspectives"],
    popular: false,
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
    features: ["Professional photography", "Multiple setups", "High-resolution images", "Digital gallery"],
    popular: false,
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

interface ServicesSectionProps {
  onPackageSelect?: (pkg: typeof serviceData[0]) => void;
}

const ServicesSection = ({ onPackageSelect }: ServicesSectionProps) => {
  const [elementRef] = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6" ref={elementRef}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block">🚁 <span className="text-glow">Professional</span></span>
            <span className="block text-metallic">Drone Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            From budget-friendly starting packages to premium professional services. 
            Each service offers multiple tiers with customizable extras.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <Card 
              key={service.id}
              className={`group hover-lift transition-all duration-500 cursor-pointer ${
                service.popular ? 'card-neon' : 'card-glass'
              }`}
            >
              <CardContent className="p-0">
                <div className="p-6">
                  {/* Icon & Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`inline-flex p-4 rounded-xl ${
                      service.popular 
                        ? 'bg-primary/20 text-primary animate-glow' 
                        : 'bg-secondary/20 text-secondary-bright'
                    }`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    
                    {service.popular && (
                      <Badge className="bg-gradient-to-r from-primary to-neon-green text-white animate-pulse">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">From ${service.startingPrice}</span>
                        {service.popular && (
                          <Badge className="bg-gradient-to-r from-primary to-neon-green text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">Starting package price</p>
                    </div>

                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 space-y-3">
                      <Button 
                        className="w-full btn-hero group"
                        onClick={() => onPackageSelect?.(service)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Customize Package
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full btn-secondary-hero"
                        onClick={() => {
                          const element = document.getElementById('contact');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Get Quick Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;