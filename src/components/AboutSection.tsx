import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Users, Calendar, Target, ArrowRight } from "lucide-react";
const AboutSection = () => {
  const achievements = [{
    icon: Target,
    label: "Proyectos Completados",
    value: "50"
  }, {
    icon: Users,
    label: "Clientes Satisfechos",
    value: "20+"
  }, {
    icon: Calendar,
    label: "Experiencia",
    value: "2+ Años"
  }, {
    icon: Award,
    label: "Servicio Profesional",
    value: "100%"
  }];
  const skills = ["Cinematografía Aérea", "Operaciones de Drones FPV", "Fotografía Inmobiliaria", "Documentación de Eventos", "Post-Producción", "Gradación de Color"];
  return <section id="about" className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border border-primary rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-accent rounded-full animate-float" style={{
        animationDelay: '2s'
      }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-metallic">Acerca de</span> <span className="text-glow">AeroVision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Apasionados por capturar el mundo desde perspectivas extraordinarias, 
            combinando tecnología de vanguardia con visión creativa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-glow">
                Visión Cinemática Encuentra Precisión Técnica
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">Con más de 2 años de experiencia en cinematografía aérea, me especializo en crear contenido visual impresionante que cuenta historias convincentes desde perspectivas únicas. Desde exhibiciones inmobiliarias de lujo hasta tours FPV dinámicos, cada proyecto se aborda con atención meticulosa al detalle e innovación creativa.</p>
              
              
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Especializaciones</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => <Badge key={index} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                    {skill}
                  </Badge>)}
              </div>
            </div>

            {/* CTA */}
            <Button className="btn-hero group">
              Ver Portafolio Completo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats & Achievements Side */}
          <div className="space-y-6">
            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => <Card key={index} className="card-glass p-6 text-center hover-lift">
                  <achievement.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-glow mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </Card>)}
            </div>

            {/* Mission Statement */}
            <Card className="card-neon p-8">
              <h4 className="text-xl font-semibold mb-4 text-glow">Misión</h4>
              <p className="text-muted-foreground leading-relaxed">
                "Transformar momentos ordinarios en experiencias visuales extraordinarias, 
                empujando los límites de la cinematografía aérea mientras mantenemos 
                los más altos estándares de profesionalismo y seguridad."
              </p>
            </Card>

            {/* Equipment Highlight */}
            <Card className="card-glass p-6">
              <h4 className="text-lg font-semibold mb-4">Equipo Profesional</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Cámara Principal</span>
                  <span className="text-primary">4K 60fps, 10-bit</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiempo de Vuelo</span>
                  <span className="text-primary">Hasta 45 minutos</span>
                </div>
                <div className="flex justify-between">
                  <span>Alcance</span>
                  <span className="text-primary">Transmisión de 15km</span>
                </div>
                <div className="flex justify-between">
                  <span>Características de Seguridad</span>
                  <span className="text-primary">Redundancia completa</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;