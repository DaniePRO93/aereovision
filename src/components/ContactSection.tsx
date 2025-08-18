import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Send,
  Instagram,
  Youtube,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in your drone photography services. 
    
Project Type: ${formData.projectType || "General Inquiry"}
Message: ${formData.message || "Please contact me for more information."}`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-glow">Let's Create</span> <span className="text-metallic">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to capture your vision from new perspectives? Get in touch and let's discuss 
            how we can bring your project to life with stunning aerial cinematography.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-glass p-8">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="mt-2 bg-input/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                      className="mt-2 bg-input/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="mt-2 bg-input/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectType" className="text-foreground">Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                      <SelectTrigger className="mt-2 bg-input/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="events">Events</SelectItem>
                        <SelectItem value="landscapes">Landscapes</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="fpv">FPV Tours</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground">Project Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    rows={5}
                    className="mt-2 bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="btn-hero flex-1">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    type="button" 
                    onClick={handleWhatsApp}
                    className="btn-secondary-hero flex-1"
                  >
                    WhatsApp
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Contact Info & Service Area */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="card-glass p-6">
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>hello@aerovision.com</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>Los Angeles, CA & Surrounding Areas</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="font-semibold mb-4">Follow Our Work</h4>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Youtube className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Service Area Map */}
            <Card className="card-glass p-6">
              <h3 className="text-xl font-semibold mb-4">Service Area</h3>
              <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm">Interactive Map</p>
                  <p className="text-xs">Los Angeles Metro Area</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                We serve the greater Los Angeles area and surrounding regions. 
                Long-distance projects available upon request.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;