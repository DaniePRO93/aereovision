
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
    title: "Tour de Inmuebles de Lujo",
    category: "Bienes Raíces",
    type: "video",
    image: realEstateImage,
    description: "Tour aéreo cinemático mostrando características de propiedades premium",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 2,
    title: "Paisajes Montañosos Épicos",
    category: "Paisajes",
    type: "photo",
    image: landscapeImage,
    description: "Fotografía aérea impresionante de paisajes naturales",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 3,
    title: "Acción de Carreras FPV",
    category: "Deportes",
    type: "video",
    image: fpvImage,
    description: "Carreras de drones FPV de alta velocidad con cinematografía dinámica",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 4,
    title: "Cobertura de Eventos Corporativos",
    category: "Eventos",
    type: "video",
    image: realEstateImage,
    description: "Documentación profesional de eventos desde perspectivas únicas",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 5,
    title: "Muestra Arquitectónica",
    category: "Bienes Raíces",
    type: "photo",
    image: fpvImage,
    description: "Arquitectura moderna capturada con precisión y estilo",
    url: "https://instagram.com/aereovision.gt"
  },
  {
    id: 6,
    title: "Vistas Aéreas Costeras",
    category: "Paisajes",
    type: "photo",
    image: landscapeImage,
    description: "Impresionantes vistas costeras y marinas desde arriba",
    url: "https://instagram.com/aereovision.gt"
  }
];

const categories = ["Todos", "Bienes Raíces", "Paisajes", "Deportes", "Eventos"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleItems, setVisibleItems] = useState(6);

  const filteredItems = activeCategory === "Todos" 
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
            <span className="text-glow">Portafolio</span> y <span className="text-metallic">Muestra</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explora nuestra colección de impresionantes trabajos de fotografía aérea y terrestre, 
            abarcando múltiples industrias y proyectos creativos.
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
                  Ver Detalles
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
              Cargar Más Proyectos
            </Button>
          </div>
        )}

        {/* CTA for Custom Work */}
        <div className="text-center mt-16">
          <div className="card-glass inline-block p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              ¿Te gusta lo que ves? <span className="text-glow">Trabajemos juntos</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              ¿Listo para crear algo increíble para tu proyecto? Contáctanos y discutamos tu visión.
            </p>
            <Button 
              className="btn-hero"
              onClick={scrollToContact}
            >
              Iniciar Tu Proyecto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
