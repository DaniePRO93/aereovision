import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Video, 
  Zap, 
  MapPin, 
  ArrowRight,
  Check
} from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Aerial Photography",
    description: "High-resolution aerial photography for real estate, events, and marketing campaigns.",
    features: ["4K+ Resolution", "RAW Format", "Multiple Angles", "Quick Turnaround"],
    price: "From $299",
    popular: false
  },
  {
    icon: Video,
    title: "Cinematic Videography", 
    description: "Professional drone videography with cinematic quality and smooth movements.",
    features: ["4K 60fps", "Color Grading", "Music & SFX", "Multiple Cuts"],
    price: "From $599",
    popular: true
  },
  {
    icon: Zap,
    title: "FPV Drone Tours",
    description: "Dynamic FPV drone flights through buildings, venues, and tight spaces.",
    features: ["Indoor Flying", "Smooth Tracking", "Immersive POV", "Creative Routes"],
    price: "From $799",
    popular: false
  },
  {
    icon: MapPin,
    title: "Ground Photography",
    description: "Professional ground-level photography and videography services.",
    features: ["Portrait & Landscape", "Event Coverage", "Product Shoots", "Creative Direction"],
    price: "From $199",
    popular: false
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-metallic">Professional</span> <span className="text-glow">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive drone and photography services tailored to capture your vision 
            with cutting-edge technology and creative expertise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden group hover-lift ${
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
                  <div className={`inline-flex p-3 rounded-lg ${
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
                <div className="mb-6">
                  <span className="text-2xl font-bold text-glow">{service.price}</span>
                  <span className="text-muted-foreground ml-1">/project</span>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full group ${
                    service.popular ? 'btn-hero' : 'btn-secondary-hero'
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="card-glass inline-block p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Need a <span className="text-glow">Custom Package</span>?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let's discuss your specific requirements and create a tailored solution 
              that fits your project perfectly.
            </p>
            <Button className="btn-hero">
              Contact for Custom Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;