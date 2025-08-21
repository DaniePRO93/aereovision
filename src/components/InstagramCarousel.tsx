import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ChevronLeft, 
  ChevronRight,
  Instagram,
  ExternalLink
} from 'lucide-react';
import fpvImage from '@/assets/fpv-drone-action.jpg';
import realEstateImage from '@/assets/real-estate-aerial.jpg';
import landscapeImage from '@/assets/mountain-lake-aerial.jpg';

// Mock Instagram posts data - In a real app, this would come from Instagram API
const mockInstagramPosts = [
  {
    id: '1',
    imageUrl: realEstateImage,
    caption: '🏠✨ Inspección de techo completada con éxito! Detectamos algunas áreas que necesitan atención antes de las lluvias. #InspeccionDrones #AereoVisionGT #TechosGuatemala',
    likes: 127,
    comments: 15,
    timestamp: '2 días',
    postUrl: 'https://www.instagram.com/aereovision.gt/',
  },
  {
    id: '2', 
    imageUrl: landscapeImage,
    caption: '🌄 Vista aérea espectacular del Lago Atitlán desde nuestro drone 4K. La naturaleza guatemalteca nunca deja de sorprendernos! #DronePhotography #Guatemala #AereoVision',
    likes: 89,
    comments: 8,
    timestamp: '4 días',
    postUrl: 'https://www.instagram.com/aereovision.gt/',
  },
  {
    id: '3',
    imageUrl: fpvImage,
    caption: '🚁⚡ Tour FPV increíble por el centro de la ciudad! Combinamos tecnología y creatividad para capturar ángulos únicos. #FPVDrone #Guatemala #AereoVisionGT',
    likes: 203,
    comments: 22,
    timestamp: '6 días',
    postUrl: 'https://www.instagram.com/aereovision.gt/',
  }
];

export const InstagramCarousel = () => {
  const [currentPost, setCurrentPost] = useState(0);

  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % mockInstagramPosts.length);
  };

  const prevPost = () => {
    setCurrentPost((prev) => (prev - 1 + mockInstagramPosts.length) % mockInstagramPosts.length);
  };

  const currentPostData = mockInstagramPosts[currentPost];

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
            />
            
            {/* Navigation Arrows */}
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

            {/* Post Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {mockInstagramPosts.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPost ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentPost(index)}
                />
              ))}
            </div>
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
                {currentPostData.likes} me gusta
              </p>
              <p className="text-xs text-muted-foreground">
                {currentPostData.comments} comentarios
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