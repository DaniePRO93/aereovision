
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "JD",
    role: "MTB Rider",
    company: "",
    content: "The drone footage made my jumps look amazing. Every jump and turn was captured perfectly!",
    rating: 5,
    avatar: "JD"
  },
  {
    id: 2,
    name: "Maria",
    role: "Homeowner",
    company: "",
    content: "The aerial shots of our house were stunning.",
    rating: 5,
    avatar: "M"
  },
  {
    id: 3,
    name: "Leonardo R",
    role: "Homeowner", 
    company: "",
    content: "Loved the smooth drone shots. Showed our home from angles we never imagined.",
    rating: 5,
    avatar: "LR"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-glow">Client</span> <span className="text-metallic">Testimonials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear what our clients say about their experience working with us. 
            Every project is a partnership in creating something extraordinary.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <Card 
            className="card-glass p-8 md:p-12 text-center relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote className="h-12 w-12" />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {renderStars(testimonials[currentIndex].rating)}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 relative z-10">
              "{testimonials[currentIndex].content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mb-4 cursor-pointer hover:scale-110 transition-transform">
                {testimonials[currentIndex].avatar}
              </div>
              
              <h4 className="text-lg font-semibold text-glow mb-1">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-muted-foreground">
                {testimonials[currentIndex].role}
              </p>
              <p className="text-sm text-primary">
                {testimonials[currentIndex].company}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={prevTestimonial}
                className="p-2 hover:bg-primary/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={nextTestimonial}
                className="p-2 hover:bg-primary/10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </Card>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos Section */}
        <div className="mt-20">
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
            Trusted by Industry Leaders
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
            {['Luxury Homes LA', 'Elite Events', 'SkyTech Industries', 'Dreamy Weddings'].map((company, index) => (
              <div key={index} className="text-center cursor-pointer hover:opacity-75 transition-opacity">
                <div className="w-20 h-20 bg-muted/30 rounded-lg mx-auto mb-2 flex items-center justify-center hover:scale-105 transition-transform">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {company.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-glass inline-block p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Ready to join our <span className="text-glow">satisfied clients</span>?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let's create something amazing together. Contact us today to discuss your project.
            </p>
            <Button 
              className="btn-hero"
              onClick={scrollToContact}
            >
              Get Your Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
