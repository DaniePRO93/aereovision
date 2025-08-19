import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ServicePackageModal } from "@/components/ServicePackageModal";
import { 
  Camera, 
  Video, 
  Zap, 
  MapPin
} from "lucide-react";

// Service packages data
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

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<typeof servicePackages[0] | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "AeroVision - Professional Drone Aerial Photography & Videography Services";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Professional drone aerial photography and videography services in Los Angeles. Cinematic FPV tours, real estate photography, event coverage. Licensed FAA Part 107 pilot.'
      );
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'AeroVision - Professional Drone Aerial Photography & Videography');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 
        'Professional drone aerial photography and videography services. Capturing breathtaking moments from angles that inspire.'
      );
    }
  }, []);

  const handlePackageSelect = (pkg: typeof servicePackages[0]) => {
    setSelectedPackage(pkg);
    setShowPackageModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <PortfolioSection />
        <ServicesSection onPackageSelect={handlePackageSelect} />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />

      {/* Service Package Modal */}
      <ServicePackageModal
        isOpen={showPackageModal}
        onClose={() => setShowPackageModal(false)}
        package={selectedPackage}
      />
    </div>
  );
};

export default Index;
