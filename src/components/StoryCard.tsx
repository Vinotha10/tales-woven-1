import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  genre: string;
  likes: number;
  views: number;
  readingTime: number;
  isLiked?: boolean;
  onLike?: (id: string) => void;
}

const StoryCard = ({
  id,
  title,
  excerpt,
  author,
  genre,
  likes,
  views,
  readingTime,
  isLiked = false,
  onLike,
}: StoryCardProps) => {
  return (
    <Card className="group hover:shadow-story transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              <Link to={`/story/${id}`} className="hover:underline">
                {title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {genre}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readingTime} min</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(id)}
            className={`flex items-center gap-1 ${
              isLiked ? 'text-accent hover:text-accent' : 'text-muted-foreground'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-xs">{likes}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;