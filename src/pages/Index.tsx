import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PartnershipSection from "@/components/PartnershipSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ServicePackageModal } from "@/components/ServicePackageModal";
import { 
  Camera, 
  Building, 
  Zap, 
  MapPin
} from "lucide-react";

// Service packages data
const servicePackages = [
  {
    id: "aerial-photography",
    icon: Camera,
    title: "Fotografía Aérea",
    description: "Tomas aéreas de alta resolución perfectas para bienes raíces, eventos y campañas de marketing.",
    startingPrice: 50,
    standardPrice: 150,
    proPrice: 250,
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
    title: "Video Aéreo",
    description: "Vuelos FPV dinámicos a través de espacios reducidos con rutas creativas y post-procesamiento.",
    startingPrice: 80,
    standardPrice: 240,
    proPrice: 450,
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

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<typeof servicePackages[0] | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "AeroVision - Servicios Profesionales de Fotografía y Videografía Aérea con Drones";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Servicios profesionales de fotografía y videografía aérea con drones en Guatemala. Tours FPV cinemáticos, fotografía inmobiliaria, cobertura de eventos.'
      );
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'AeroVision - Fotografía y Videografía Aérea Profesional con Drones');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 
        'Servicios profesionales de fotografía y videografía aérea con drones. Capturamos momentos impresionantes desde ángulos que inspiran.'
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
        
        <PartnershipSection />
        
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
