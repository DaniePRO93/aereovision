import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, ChevronLeft, ChevronRight, Instagram, ExternalLink, Loader2 } from 'lucide-react';
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
      const {
        data,
        error
      } = await supabase.functions.invoke('fetch-instagram-posts');
      if (error) {
        throw error;
      }
      setPosts(data?.posts || []);
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('No se pudieron cargar los posts de Instagram');
      // Fallback posts
      setPosts([{
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop',
        caption: '🚁 Inspección de techo con tecnología de drones. #AereoVisionGT',
        timestamp: new Date().toLocaleDateString('es-ES'),
        postUrl: 'https://www.instagram.com/aereovision.gt/',
        likes: 127,
        comments: 15
      }]);
    } finally {
      setLoading(false);
    }
  };
  const nextPost = () => {
    setCurrentPost(prev => (prev + 1) % posts.length);
  };
  const prevPost = () => {
    setCurrentPost(prev => (prev - 1 + posts.length) % posts.length);
  };
  if (loading) {
    return <div className="mb-16">
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
      </div>;
  }
  if (posts.length === 0) {
    return <div className="mb-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Instagram className="h-8 w-8 mr-3 text-pink-500" />
            <span className="text-glow">Últimos Posts</span> de Instagram
          </h3>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No se pudieron cargar los posts</p>
          <Button onClick={() => window.location.href = 'https://www.instagram.com/aereovision.gt/'}>
            Ver en Instagram
          </Button>
        </div>
      </div>;
  }
  const currentPostData = posts[currentPost];
  return;
};