
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Eye } from "lucide-react";
import fpvImage from "@/assets/fpv-drone-action.jpg";
import realEstateImage from "@/assets/real-estate-aerial.jpg";
import landscapeImage from "@/assets/mountain-lake-aerial.jpg";

const portfolioItems = [
  {
    id: 1,
    title: "Luxury Real Estate Tour",
    category: "Real Estate",
    type: "video",
    image: realEstateImage,
    description: "Cinematic aerial tour showcasing premium property features",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 2,
    title: "Epic Mountain Landscapes",
    category: "Landscapes",
    type: "photo",
    image: landscapeImage,
    description: "Breathtaking aerial photography of natural landscapes",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 3,
    title: "FPV Racing Action",
    category: "Sports",
    type: "video",
    image: fpvImage,
    description: "High-speed FPV drone racing with dynamic cinematography",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 4,
    title: "Corporate Event Coverage",
    category: "Events",
    type: "video",
    image: realEstateImage,
    description: "Professional event documentation from unique perspectives",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 5,
    title: "Architectural Showcase",
    category: "Real Estate",
    type: "photo",
    image: fpvImage,
    description: "Modern architecture captured with precision and style",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 6,
    title: "Coastal Aerials",
    category: "Landscapes",
    type: "photo",
    image: landscapeImage,
    description: "Stunning coastal views and seascapes from above",
    url: "https://instagram.com/aereovision.gt"
  }
];

const categories = ["All", "Real Estate", "Landscapes", "Sports", "Events"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(6);

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const displayedItems = filteredItems.slice(0, visibleItems);

  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, filteredItems.length));
  };

  const openProject = (url: string) => {
    window.open(url, '_blank');
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-glow">Portfolio</span> & <span className="text-metallic">Showcase</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of stunning aerial and ground photography work, 
            spanning multiple industries and creative projects.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category);
                setVisibleItems(6);
              }}
              className={activeCategory === category ? "btn-hero" : "btn-secondary-hero"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item) => (
            <Card 
              key={item.id} 
              className="card-glass group hover-lift overflow-hidden cursor-pointer"
              onClick={() => openProject(item.url)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play/View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="btn-hero rounded-full p-4">
                    {item.type === "video" ? <Play className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {item.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-primary hover:text-primary-glow"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProject(item.url);
                  }}
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < filteredItems.length && (
          <div className="text-center mt-12">
            <Button 
              className="btn-secondary-hero px-8 py-3"
              onClick={loadMore}
            >
              Load More Projects
            </Button>
          </div>
        )}

        {/* CTA for Custom Work */}
        <div className="text-center mt-16">
          <div className="card-glass inline-block p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Like what you see? <span className="text-glow">Let's work together</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Ready to create something amazing for your project? Get in touch and let's discuss your vision.
            </p>
            <Button 
              className="btn-hero"
              onClick={scrollToContact}
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
