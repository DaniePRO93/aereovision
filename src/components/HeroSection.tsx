
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Award, Users, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import carousel media
import groupPhoto from "@/assets/hero-carousel/group-photo.jpg";
import groupVideo from "@/assets/hero-carousel/group-video.mov";
import bikeTrail from "@/assets/hero-carousel/bike-trail.jpg";
import coastalAerial from "@/assets/hero-carousel/coastal-aerial.jpg";
import residentialAerial from "@/assets/hero-carousel/residential-aerial.jpg";

interface CarouselItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

const carouselItems: CarouselItem[] = [
  { type: 'image', src: coastalAerial, alt: 'Coastal aerial view' },
  { type: 'video', src: groupVideo },
  { type: 'image', src: residentialAerial, alt: 'Residential aerial photography' },
  { type: 'image', src: groupPhoto, alt: 'Group event photography' },
  { type: 'image', src: bikeTrail, alt: 'Bike trail aerial view' },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const currentItem = carouselItems[currentIndex];
    
    // For videos, wait for them to finish; for images, use a timer
    if (currentItem.type === 'image') {
      const timer = setTimeout(nextSlide, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, nextSlide]);

  // Handle video end
  const handleVideoEnd = () => {
    nextSlide();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {carouselItems.map((item, index) => (
            index === currentIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt || 'Aerial photography'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    ref={videoRef}
                    src={item.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                  />
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/90" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/60" />
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/30 backdrop-blur-sm border border-primary/30 text-foreground hover:bg-background/50 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/30 backdrop-blur-sm border border-primary/30 text-foreground hover:bg-background/50 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-foreground/40 hover:bg-foreground/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full animate-glow opacity-70" />
      <div className="absolute top-40 right-20 w-4 h-4 border-2 border-neon-green rounded-full animate-float opacity-60" />
      <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-neon-green rounded-full animate-glow opacity-80" />
      <div className="absolute top-60 left-1/3 w-1 h-1 bg-primary-glow rounded-full animate-pulse-subtle" />

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 text-center max-w-7xl mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className="font-display text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black mb-8 leading-[0.8] tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-gradient-hero block drop-shadow-2xl">TOMAS AÉREAS</span>
          <span className="text-metallic block drop-shadow-2xl">CINEMÁTICAS</span>
        </motion.h1>
        
        <p className="font-display text-2xl md:text-3xl text-primary-glow font-medium mb-6 max-w-3xl mx-auto tracking-wide">
          PERSPECTIVAS REVOLUCIONARIAS
        </p>
        
        <p className="font-body text-xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          Servicios profesionales de fotografía aérea y terrestre con drones. 
          Capturamos momentos impresionantes desde ángulos que inspiran y elevan tu visión.
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
          <Button 
            size="lg" 
            className="btn-hero px-12 py-8 text-xl font-bold group relative"
            onClick={() => scrollToSection('contact')}
          >
            <span className="relative z-10">RESERVAR VUELO</span>
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="btn-secondary-hero px-12 py-8 text-xl font-bold group"
            onClick={() => scrollToSection('portfolio')}
          >
            <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
            <span>VER PORTAFOLIO</span>
          </Button>
        </div>

        {/* Premium Stats with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center group cursor-pointer" onClick={() => scrollToSection('portfolio')}>
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-2xl border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="font-display text-4xl font-black text-gradient-hero mb-3">50+</div>
            <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Proyectos Completados</div>
          </div>
          <div className="text-center group cursor-pointer" onClick={() => scrollToSection('about')}>
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-neon-green/20 to-neon-green-glow/20 rounded-2xl border border-neon-green/30 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-neon-green" />
              </div>
            </div>
            <div className="font-display text-4xl font-black text-gradient-hero mb-3">20+</div>
            <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Clientes Satisfechos</div>
          </div>
          <div className="text-center group cursor-pointer" onClick={() => scrollToSection('services')}>
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-neon-green/20 rounded-2xl border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-primary-glow" />
              </div>
            </div>
            <div className="font-display text-4xl font-black text-gradient-hero mb-3">4K</div>
            <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Calidad Ultra HD</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20"
        onClick={() => scrollToSection('portfolio')}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
