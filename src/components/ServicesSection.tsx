import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Building, 
  Zap, 
  MapPin, 
  Star,
  ArrowRight,
  Settings
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const serviceData = [
  {
    id: "aerial-photography",
    icon: Camera,
    title: "Fotografía Aérea",
    description: "Tomas aéreas de alta resolución perfectas para bienes raíces, eventos y campañas de marketing.",
    startingPrice: 50,
    standardPrice: 150,
    proPrice: 250,
    features: ["Fotos de alta resolución", "Edición profesional", "Múltiples ángulos", "Entrega rápida"],
    popular: false,
    startingFeatures: [
      "5-10 fotos de alta resolución",
      "Edición básica",
      "5 min de tiempo de vuelo",
      "Entrega en formato JPEG"
    ],
    standardFeatures: [
      "20-30 fotos de alta resolución",
      "Edición profesional y corrección de color",
      "10-15 min de tiempo de vuelo",
      "Entrega en formato JPEG + RAW",
      "Múltiples ángulos y composiciones",
      "Tomas destacadas de propiedad"
    ],
    proFeatures: [
      "50+ fotos de alta resolución",
      "Edición premium y gradación de color avanzada",
      "20-25 min de tiempo de vuelo",
      "Formatos JPEG + RAW + editados",
      "Múltiples ángulos y composiciones artísticas",
      "Tomas destacadas de propiedad + estilo de vida",
      "Combo de fotografía aérea + terrestre",
      "Entrega de vista previa el mismo día",
      "Derechos de uso comercial"
    ],
    extras: [
      { name: "Tiempo de vuelo extra (por min)", price: 15 },
      { name: "Entrega urgente (24hrs)", price: 25 },
      { name: "Solicitudes de edición adicionales", price: 20 },
      { name: "Horario de atardecer/hora dorada", price: 30 },
      { name: "Tomas panorámicas 360°", price: 40 }
    ]
  },
  {
    id: "roof-inspections",
    icon: Building,
    title: "Inspecciones de Techos",
    description: "Inspecciones detalladas de techos con drones para identificar daños, desgaste y áreas problemáticas.",
    startingPrice: 60,
    standardPrice: 180,
    proPrice: 350,
    features: ["Imágenes de alta resolución", "Análisis detallado", "Reporte completo", "Documentación profesional"],
    popular: true,
    startingFeatures: [
      "Inspección básica de techo",
      "15-20 fotos de alta resolución",
      "Reporte básico de condición",
      "Entrega estándar (5 días)"
    ],
    standardFeatures: [
      "Inspección completa del techo",
      "40-60 fotos y videos detallados",
      "Análisis de daños y desgaste",
      "Reporte profesional con recomendaciones",
      "Mapeo térmico básico",
      "Identificación de áreas problemáticas"
    ],
    proFeatures: [
      "Inspección premium multi-espectral",
      "100+ imágenes y videos 4K",
      "Análisis térmico avanzado",
      "Reporte técnico detallado con mediciones",
      "Mapeo 3D del techo",
      "Análisis de eficiencia energética",
      "Seguimiento de múltiples inspecciones",
      "Consultoría técnica especializada",
      "Certificación profesional"
    ],
    extras: [
      { name: "Análisis térmico adicional", price: 30 },
      { name: "Mapeo 3D completo", price: 50 },
      { name: "Reporte urgente (24hrs)", price: 75 },
      { name: "Inspección de canaletas", price: 40 },
      { name: "Análisis de paneles solares", price: 60 }
    ]
  },
  {
    id: "fpv-drone-tours",
    icon: Zap,
    title: "Tours FPV con Drones",
    description: "Vuelos FPV dinámicos a través de espacios reducidos con rutas creativas y post-procesamiento.",
    startingPrice: 80,
    standardPrice: 240,
    proPrice: 450,
    features: ["Experiencia FPV inmersiva", "Rutas de vuelo creativas", "Post-procesamiento avanzado", "Perspectivas únicas"],
    popular: false,
    startingFeatures: [
      "Material FPV básico",
      "4 min de tiempo de vuelo",
      "Post-procesamiento estándar",
      "Ruta/camino único"
    ],
    standardFeatures: [
      "Material FPV profesional",
      "8 min total de tiempo de vuelo",
      "Rutas creativas y seguimiento",
      "Resolución 4K + post-procesamiento avanzado",
      "Múltiples ángulos creativos",
      "Transiciones y cortes suaves"
    ],
    proFeatures: [
      "Combo premium FPV + drone cinemático",
      "15 min total de tiempo de vuelo",
      "Rutas complejas multi-camino",
      "Resolución 6K + post-procesamiento cinemático",
      "Transiciones interiores y exteriores fluidas",
      "VFX avanzados y speed ramping",
      "Movimientos coreografiados personalizados",
      "Sincronización musical",
      "Entrega comercial profesional"
    ],
    extras: [
      { name: "Rutas complejas extra", price: 40 },
      { name: "Combo interior + exterior", price: 60 },
      { name: "Secuencias en cámara lenta", price: 35 },
      { name: "Patrones de vuelo personalizados", price: 50 },
      { name: "FPV nocturno/poca luz", price: 70 }
    ]
  },
  {
    id: "drone-videos",
    icon: MapPin,
    title: "Video Aereo",
    description: "Videos aéreos cinemáticos profesionales para eventos, bienes raíces y promociones comerciales.",
    startingPrice: 60,
    standardPrice: 180,
    proPrice: 350,
    features: ["Clips aéreos profesionales", "Movimientos dinámicos", "Edición cinematográfica", "Entrega optimizada"],
    popular: false,
    startingFeatures: [
      "5 clips aéreos cortos (30 seg – 1 min)",
      "Movimientos básicos (paneo, ascenso, giro)",
      "Entrega rápida por WhatsApp",
      "Formato listo para redes sociales"
    ],
    standardFeatures: [
      "10 clips aéreos con narrativa básica",
      "Video editado de 1–2 min con música libre de derechos", 
      "Tomas desde distintos ángulos y alturas",
      "Entrega en carpeta organizada (Google Drive o WhatsApp)"
    ],
    proFeatures: [
      "20 clips aéreos con enfoque en detalles importantes",
      "Video editado de 2–3 min estilo trailer",
      "Música y cortes dinámicos profesionales",
      "Entrega en 2 formatos: Cinematic y Redes sociales",
      "Formato vertical optimizado para reels",
      "Reporte visual con marcación de puntos de interés"
    ],
    extras: [
      { name: "Clips adicionales (por 5)", price: 25 },
      { name: "Música personalizada", price: 50 },
      { name: "Entrega urgente (24hrs)", price: 30 },
      { name: "Grabación en horario dorado", price: 35 },
      { name: "Versión extendida del video", price: 40 }
    ]
  }
];

interface ServicesSectionProps {
  onPackageSelect?: (pkg: typeof serviceData[0]) => void;
}

const ServicesSection = ({ onPackageSelect }: ServicesSectionProps) => {
  const [elementRef] = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6" ref={elementRef}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block">🚁 <span className="text-glow">Servicios</span></span>
            <span className="block text-metallic">Profesionales de Drones</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            Desde paquetes iniciales económicos hasta servicios profesionales premium. 
            Cada servicio ofrece múltiples niveles con extras personalizables.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <Card 
              key={service.id}
              className={`group hover-lift transition-all duration-500 cursor-pointer ${
                service.popular ? 'card-neon' : 'card-glass'
              }`}
            >
              <CardContent className="p-0">
                <div className="p-6">
                  {/* Icon & Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`inline-flex p-4 rounded-xl ${
                      service.popular 
                        ? 'bg-primary/20 text-primary animate-glow' 
                        : 'bg-secondary/20 text-secondary-bright'
                    }`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    
                    {service.popular && (
                      <Badge className="bg-gradient-to-r from-primary to-neon-green text-white animate-pulse">
                        <Star className="w-3 h-3 mr-1" />
                        Más Popular
                      </Badge>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">Desde ${service.startingPrice}</span>
                        {service.popular && (
                          <Badge className="bg-gradient-to-r from-primary to-neon-green text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Más Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">Precio del paquete inicial</p>
                    </div>

                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 space-y-3">
                      <Button 
                        className="w-full btn-hero group"
                        onClick={() => onPackageSelect?.(service)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Personalizar Paquete
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full btn-secondary-hero"
                        onClick={() => {
                          const element = document.getElementById('contact');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        Cotización Rápida
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;