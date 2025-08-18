
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Award, Users, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start video when component mounts
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/api/placeholder/1920/1080"
        >
          <source src="/api/placeholder/video/drone-aerial.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-background via-muted to-background" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/90" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/60" />
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
          <span className="text-gradient-hero block drop-shadow-2xl">CINEMATIC</span>
          <span className="text-metallic block drop-shadow-2xl">AERIALS</span>
        </motion.h1>
        
        <p className="font-display text-2xl md:text-3xl text-primary-glow font-medium mb-6 max-w-3xl mx-auto tracking-wide">
          GROUNDBREAKING PERSPECTIVES
        </p>
        
        <p className="font-body text-xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          Professional drone aerial and ground photography services. 
          Capturing breathtaking moments from angles that inspire and elevate your vision.
        </p>

        {/* Premium CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
          <Button 
            size="lg" 
            className="btn-hero px-12 py-8 text-xl font-bold group relative"
            onClick={() => scrollToSection('contact')}
          >
            <span className="relative z-10">BOOK A FLIGHT</span>
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
            <span>VIEW PORTFOLIO</span>
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
            <div className="font-display text-4xl font-black text-gradient-hero mb-3">500+</div>
            <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Projects Completed</div>
          </div>
          <div className="text-center group cursor-pointer" onClick={() => scrollToSection('about')}>
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-neon-green/20 to-neon-green-glow/20 rounded-2xl border border-neon-green/30 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-neon-green" />
              </div>
            </div>
            <div className="font-display text-4xl font-black text-gradient-hero mb-3">50+</div>
            <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Happy Clients</div>
          </div>
          <div className="text-center group cursor-pointer" onClick={() => scrollToSection('services')}>
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-gradient-to-br from-primary/20 to-neon-green/20 rounded-2xl border border-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-primary-glow" />
              </div>
            </div>
            <div className="font-display text-4xl font-black text-gradient-hero mb-3">4K</div>
            <div className="font-body text-sm text-muted-foreground uppercase tracking-wider">Ultra HD Quality</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
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
