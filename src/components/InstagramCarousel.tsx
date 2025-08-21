import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ChevronLeft, 
  ChevronRight,
  Instagram,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  postUrl: string;
  likes?: number;
  comments?: number;
}

export const InstagramCarousel = () => {
  const [currentPost, setCurrentPost] = useState(0);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('fetch-instagram-posts');
      
      if (error) {
        throw error;
      }
      
      setPosts(data?.posts || []);
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('No se pudieron cargar los posts de Instagram');
      // Fallback posts
      setPosts([
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop',
          caption: '🚁 Inspección de techo con tecnología de drones. #AereoVisionGT',
          timestamp: new Date().toLocaleDateString('es-ES'),
          postUrl: 'https://www.instagram.com/aereovision.gt/',
          likes: 127,
          comments: 15
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentPost((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (loading) {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Instagram className="h-8 w-8 mr-3 text-pink-500" />
            <span className="text-glow">Últimos Posts</span> de Instagram
          </h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Cargando posts...</span>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Instagram className="h-8 w-8 mr-3 text-pink-500" />
            <span className="text-glow">Últimos Posts</span> de Instagram
          </h3>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No se pudieron cargar los posts</p>
          <Button onClick={() => window.open('https://www.instagram.com/aereovision.gt/', '_blank')}>
            Ver en Instagram
          </Button>
        </div>
      </div>
    );
  }

  const currentPostData = posts[currentPost];

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <Instagram className="h-8 w-8 mr-3 text-pink-500" />
          <span className="text-glow">Últimos Posts</span> de Instagram
        </h3>
        <p className="text-muted-foreground">
          Síguenos en @aereovision.gt para más contenido increíble
        </p>
      </div>

      {/* Instagram Post Carousel */}
      <div className="relative max-w-md mx-auto">
        <Card className="card-glass overflow-hidden">
          {/* Post Header */}
          <div className="p-4 flex items-center justify-between border-b border-border/30">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-0.5">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <Instagram className="h-4 w-4 text-pink-500" />
                </div>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-sm">aereovision.gt</p>
                <p className="text-xs text-muted-foreground">{currentPostData.timestamp}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open('https://www.instagram.com/aereovision.gt/', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          {/* Post Image */}
          <div className="relative aspect-square">
            <img
              src={currentPostData.imageUrl}
              alt="Instagram post"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if the original fails to load
                e.currentTarget.src = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop';
              }}
            />
            
            {/* Navigation Arrows */}
            {posts.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
                  onClick={prevPost}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2"
                  onClick={nextPost}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Post Indicators */}
            {posts.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentPost ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentPost(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Heart className="h-6 w-6 text-muted-foreground hover:text-red-500 transition-colors" />
                </Button>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <MessageCircle className="h-6 w-6 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <Share className="h-6 w-6 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Likes and Comments */}
            <div className="mb-2">
              <p className="font-semibold text-sm">
                {currentPostData.likes || 0} me gusta
              </p>
              <p className="text-xs text-muted-foreground">
                {currentPostData.comments || 0} comentarios
              </p>
            </div>

            {/* Caption */}
            <div className="text-sm">
              <span className="font-semibold">aereovision.gt</span>{' '}
              <span className="text-muted-foreground">{currentPostData.caption}</span>
            </div>
          </div>
        </Card>

        {/* Follow Button */}
        <div className="text-center mt-6">
          <Button 
            className="btn-hero"
            onClick={() => window.open('https://www.instagram.com/aereovision.gt/', '_blank')}
          >
            <Instagram className="h-5 w-5 mr-2" />
            Seguir en Instagram
          </Button>
        </div>
      </div>
    </div>
  );
};