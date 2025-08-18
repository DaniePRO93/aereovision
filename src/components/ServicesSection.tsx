import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Video, 
  Zap, 
  MapPin, 
  Check, 
  Sparkles,
  MessageCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    icon: Camera,
    title: "Aerial Photography",
    description: "High-resolution aerial shots perfect for real estate, events, and marketing campaigns.",
    features: ["10–20 high-res aerial shots", "Basic editing & color correction", "JPEG/RAW format delivery", "Up to 5 min flight time"],
    price: "From $150",
    extra: "+$20 per extra minute",
    popular: false
  },
  {
    icon: Video,
    title: "Cinematic Videography", 
    description: "Professional 4K drone footage with smooth cinematic movements and color grading.",
    features: ["4K drone footage", "Basic color grading", "Royalty-free music overlay", "1–2 edited clips (up to 3 min each)"],
    price: "From $180",
    extra: "+$30 per extra minute",
    popular: true
  },
  {
    icon: Zap,
    title: "FPV Drone Tours",
    description: "Dynamic FPV drone flights through tight spaces with creative routing and post-processing.",
    features: ["FPV footage through tight spaces", "4K resolution, smooth tracking", "Creative route planning", "Professional post-processing"],
    price: "From $240",
    extra: "+$30 per extra minute",
    popular: false
  },
  {
    icon: MapPin,
    title: "Ground Photography",
    description: "Professional ground-level photography for events, portraits, and product shoots.",
    features: ["Event coverage & portraits", "Product photography", "Basic editing & correction", "20–40 high-res photos"],
    price: "From $100",
    extra: "+$10 per 10 edited photos",
    popular: false
  }
];

const ServicesSection = () => {
  const { toast } = useToast();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceInquiry = (serviceName: string) => {
    scrollToContact();
    toast({
      title: "Service Selected",
      description: `Redirecting to contact form for ${serviceName}`,
    });
  };

  return (
    <section id="services" className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block">💰 <span className="text-glow">AeroVision</span></span>
            <span className="block text-metallic">Pricing Packages</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            Professional aerial and ground cinematography services starting at $30 per minute of flight. 
            Choose the package that fits your project, or contact us for a custom solution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden group hover-lift hover:scale-105 transition-all duration-300 ${
                service.popular ? 'card-neon' : 'card-glass'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-primary px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
                    Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-3 rounded-lg cursor-pointer hover:scale-110 transition-transform ${
                    service.popular 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary/20 text-secondary-bright'
                  }`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold" style={{ color: '#FFD700' }}>{service.price}</span>
                  <span className="text-muted-foreground ml-1">/project</span>
                </div>

                {/* Extra pricing */}
                <div className="mb-6">
                  <span className="text-sm text-muted-foreground">{service.extra}</span>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full group ${
                    service.popular ? 'btn-hero' : 'btn-secondary-hero'
                  }`}
                  onClick={() => handleServiceInquiry(service.title)}
                >
                  Book a Shoot
                  <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Custom Package Section */}
        <div className="mt-16">
          <Card className="card-glass p-8 text-center max-w-4xl mx-auto hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-glow">Custom Package</span>
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Combine aerial + ground photography or request extra post-production. 
              Pricing based on flight minutes + photos + editing.
            </p>
            <p className="text-primary font-semibold mb-8" style={{ color: '#FFD700' }}>
              Example: Drone + Ground + Edited Video (10 min) → $300–$400
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-hero"
                onClick={scrollToContact}
              >
                Book a Shoot
                <Camera className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                className="btn-secondary-hero"
                onClick={() => window.open('https://wa.me/50258221477?text=Hi! I need a custom quote for my project.', '_blank')}
              >
                Contact for Custom Quote
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;