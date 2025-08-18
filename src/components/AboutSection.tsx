import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Calendar,
  Target,
  ArrowRight
} from "lucide-react";

const AboutSection = () => {
  const achievements = [
    { icon: Target, label: "Projects Completed", value: "50" },
    { icon: Users, label: "Happy Clients", value: "20+" },
    { icon: Calendar, label: "Experience", value: "5+ Years" },
    { icon: Award, label: "Professional Service", value: "100%" }
  ];

  const skills = [
    "Aerial Cinematography",
    "FPV Drone Operations", 
    "Real Estate Photography",
    "Event Documentation",
    "Post-Production",
    "Color Grading"
  ];

  return (
    <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border border-primary rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-accent rounded-full animate-float" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-metallic">About</span> <span className="text-glow">AeroVision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about capturing the world from extraordinary perspectives, 
            combining cutting-edge technology with creative vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-glow">
                Cinematic Vision Meets Technical Precision
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With over 5 years of experience in aerial cinematography, I specialize in 
                creating breathtaking visual content that tells compelling stories from 
                unique perspectives. From luxury real estate showcases to dynamic FPV tours, 
                every project is approached with meticulous attention to detail and creative innovation.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                As a licensed FAA Part 107 pilot, I ensure all operations meet the highest 
                safety and legal standards while delivering exceptional results that exceed expectations.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button className="btn-hero group">
              View Full Portfolio
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats & Achievements Side */}
          <div className="space-y-6">
            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="card-glass p-6 text-center hover-lift">
                  <achievement.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-glow mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </Card>
              ))}
            </div>

            {/* Mission Statement */}
            <Card className="card-neon p-8">
              <h4 className="text-xl font-semibold mb-4 text-glow">Mission</h4>
              <p className="text-muted-foreground leading-relaxed">
                "To transform ordinary moments into extraordinary visual experiences, 
                pushing the boundaries of aerial cinematography while maintaining 
                the highest standards of professionalism and safety."
              </p>
            </Card>

            {/* Equipment Highlight */}
            <Card className="card-glass p-6">
              <h4 className="text-lg font-semibold mb-4">Professional Equipment</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Main Camera</span>
                  <span className="text-primary">4K 60fps, 10-bit</span>
                </div>
                <div className="flex justify-between">
                  <span>Flight Time</span>
                  <span className="text-primary">Up to 45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Range</span>
                  <span className="text-primary">15km transmission</span>
                </div>
                <div className="flex justify-between">
                  <span>Safety Features</span>
                  <span className="text-primary">Full redundancy</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;