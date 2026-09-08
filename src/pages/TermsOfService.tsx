import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AeroVisionLogo from "@/components/ui/AeroVisionLogo";
import { usePageSeo } from "@/lib/seo";

const TermsOfService = () => {
  const navigate = useNavigate();

  usePageSeo({
    title: "Términos de Servicio | AeroVision Guatemala",
    description:
      "Consulta los términos de servicio de AeroVision.gt para reservas, pagos, cancelaciones, entrega de material y derechos de uso.",
    path: "/terms-of-service",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-glow rounded-lg">
                <AeroVisionLogo size="small" animated />
              </div>
              <span className="text-xl font-bold text-metallic">AeroVision</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al Inicio</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AeroVision.gt – Términos de Servicio
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Última actualización: 21 de agosto de 2025
          </p>

          <div className="bg-card border border-border rounded-lg p-8 space-y-8">
            <p className="text-foreground leading-relaxed">
              Bienvenido a AeroVision.gt. Al contratar nuestros servicios, usted acepta los siguientes términos y condiciones:
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Servicios</h2>
              <p className="text-muted-foreground mb-4">AeroVision.gt ofrece servicios de:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Fotografía Aérea</li>
                <li>Video Aéreo Profesional</li>
                <li>Tours Drone FPV</li>
                <li>Inspección de Techos</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Los servicios incluyen captura de imágenes y/o video mediante drones y cámaras profesionales, 
                edición básica o avanzada según el paquete contratado, y entrega de archivos digitales al cliente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Reservas y Pagos</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Todos los servicios requieren confirmación previa de la reserva y pago según el paquete seleccionado.</li>
                <li>• Los precios indicados son tarifas estándar; cualquier servicio adicional será cotizado por separado.</li>
                <li>• Pagos aceptados: transferencia bancaria, efectivo o método acordado previamente.</li>
                <li>• Las fechas de grabación se coordinan según disponibilidad del dron y piloto.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Cancelaciones y Reprogramaciones</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Las cancelaciones deben notificarse con al menos 24 horas de anticipación.</li>
                <li>• Cancelaciones dentro de las 24 horas o ausencia del cliente pueden estar sujetas a un cargo del 50% del paquete contratado.</li>
                <li>• Reprogramaciones se harán según disponibilidad y no generan penalización si se notifican con tiempo suficiente.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Responsabilidad y Seguridad</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• AeroVision.gt opera drones de manera segura y cumple con las regulaciones locales.</li>
                <li>• El cliente debe asegurar que el área de grabación sea segura y accesible.</li>
                <li>• AeroVision.gt no se hace responsable de daños preexistentes, accidentes fuera de control del piloto o condiciones climáticas adversas que impidan la grabación.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Entrega de Material</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Los tiempos de entrega varían según el paquete seleccionado.</li>
                <li>• Todos los archivos se entregan en formato digital (WhatsApp, Google Drive u otro acordado).</li>
                <li>• AeroVision.gt garantiza la entrega de fotos y videos de calidad según lo especificado en cada paquete.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Derechos de Uso</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• El cliente recibe derecho de uso personal y comercial del material entregado según el paquete.</li>
                <li>• AeroVision.gt se reserva el derecho de usar las imágenes y videos para promoción y portafolio, salvo que el cliente solicite exclusividad por escrito.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitaciones</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• AeroVision.gt no se hace responsable de interpretaciones subjetivas de la calidad del material entregado; se recomienda revisar los paquetes y ejemplos antes de contratar.</li>
                <li>• Modificaciones adicionales a material entregado pueden generar cargos extra.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modificaciones de Términos</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• AeroVision.gt se reserva el derecho de actualizar estos términos de servicio en cualquier momento.</li>
                <li>• Las actualizaciones se comunicarán a los clientes y aplicarán a nuevos servicios contratados.</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button 
              onClick={() => navigate('/')}
              className="btn-hero"
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
