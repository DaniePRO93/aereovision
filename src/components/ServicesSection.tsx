import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Video, 
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
    id: "cinematic-videography",
    icon: Video,
    title: "Videografía Cinemática",
    description: "Material de drones 4K profesional con movimientos cinemáticos suaves y gradación de color.",
    startingPrice: 60,
    standardPrice: 180,
    proPrice: 350,
    features: ["Calidad de video 4K", "Movimientos cinemáticos", "Edición profesional", "Música incluida"],
    popular: true,
    startingFeatures: [
      "Material básico de drone 4K",
      "Clip editado de 3 min",
      "Estabilización básica",
      "Entrega estándar (7 días)"
    ],
    standardFeatures: [
      "Material profesional de drone 4K",
      "Clips editados de 6 min (2x 3min)",
      "Movimientos cinemáticos suaves",
      "Gradación de color profesional",
      "Música libre de derechos incluida",
      "Motion graphics y títulos"
    ],
    proFeatures: [
      "Material premium de drone 4K/6K",
      "Clips editados de 12 min (4x 3min)",
      "Movimientos cinemáticos avanzados y transiciones",
      "Gradación de color nivel Hollywood",
      "Composición musical personalizada",
      "Motion graphics avanzados y VFX",
      "Combo de video aéreo + terrestre",
      "Múltiples ángulos de cámara",
      "Licencia comercial incluida"
    ],
    extras: [
      { name: "Material extra (por min)", price: 30 },
      { name: "Licencia musical personalizada", price: 50 },
      { name: "Efectos VFX avanzados", price: 75 },
      { name: "Combo aéreo + terrestre", price: 100 },
      { name: "Grabación en múltiples locaciones", price: 80 }
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
    id: "ground-photography",
    icon: MapPin,
    title: "Fotografía Terrestre",
    description: "Fotografía profesional a nivel del suelo para eventos, retratos y sesiones de productos.",
    startingPrice: 40,
    standardPrice: 100,
    proPrice: 200,
    features: ["Fotografía profesional", "Múltiples configuraciones", "Imágenes de alta resolución", "Galería digital"],
    popular: false,
    startingFeatures: [
      "Sesión de 1 hora",
      "15-20 fotos",
      "Edición básica",
      "Solo entrega digital"
    ],
    standardFeatures: [
      "Sesión de 2-3 horas",
      "40-60 fotos de alta resolución",
      "Edición profesional y corrección",
      "Múltiples cambios de vestuario/configuración",
      "Galería digital + opción de impresiones",
      "Exploración de locación incluida"
    ],
    proFeatures: [
      "Sesión premium de 4-5 horas",
      "100+ fotos de alta resolución",
      "Edición avanzada y procesamiento artístico",
      "Múltiples locaciones y configuraciones",
      "Galería digital premium + paquetes de impresión",
      "Consultoría de estilismo profesional",
      "Video detrás de cámaras",
      "Derechos de uso comercial",
      "Entrega de vista previa el mismo día"
    ],
    extras: [
      { name: "Hora extra de fotografía", price: 25 },
      { name: "Ediciones adicionales de fotos (por 10)", price: 15 },
      { name: "Paquete de impresiones (20 fotos)", price: 45 },
      { name: "Entrega de vista previa el mismo día", price: 20 },
      { name: "Maquillista profesional", price: 80 }
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