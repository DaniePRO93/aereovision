
import { Button } from "@/components/ui/button";
import { Instagram, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const PortfolioSection = () => {
  const [latestPost, setLatestPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-instagram-posts');
        if (data && data.length > 0) {
          setLatestPost(data[0]);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPost();
  }, []);

  const openInstagram = () => {
    window.location.href = 'https://www.instagram.com/aerovision.gt/';
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-glow">Nuestro</span> <span className="text-metallic">Trabajo</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explora nuestra colección de impresionantes trabajos de fotografía aérea y videografía en Instagram.
          </p>
        </div>

        {/* Instagram Link Section */}
        <div className="text-center">
          <div className="card-glass inline-block p-8 rounded-2xl max-w-lg mx-auto">
            <div className="mb-6">
              {loading ? (
                <div className="w-full h-64 bg-muted animate-pulse rounded-lg mb-4 flex items-center justify-center">
                  <Instagram className="h-12 w-12 text-muted-foreground" />
                </div>
              ) : latestPost ? (
                <img 
                  src={latestPost.imageUrl} 
                  alt={latestPost.caption || "Último post de AereVision"} 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Instagram className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <Instagram className="h-8 w-8 mx-auto text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Síguenos en <span className="text-glow">Instagram</span>
            </h3>
            <p className="text-muted-foreground mb-8">
              Ve nuestros últimos proyectos, fotografías aéreas espectaculares y videos de drones en nuestro perfil de Instagram.
            </p>
            <Button 
              className="btn-hero text-lg px-8 py-4"
              onClick={openInstagram}
            >
              <Instagram className="mr-3 h-5 w-5" />
              Ver en Instagram
              <ExternalLink className="ml-3 h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              @aerovision.gt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
