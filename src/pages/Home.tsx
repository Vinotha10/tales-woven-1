import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StoryCard from '@/components/StoryCard';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Sparkles, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

// Sample stories data - in a real app, this would come from a backend
const sampleStories = [
  {
    id: '1',
    title: 'The Digital Odyssey',
    excerpt: 'In a world where reality and virtual existence blur, Maya discovers a hidden algorithm that could change everything. But with great power comes unexpected consequences...',
    author: 'Alex Chen',
    genre: 'Sci-Fi',
    likes: 156,
    views: 1243,
    readingTime: 8,
  },
  {
    id: '2',
    title: 'Whispers in the Wind',
    excerpt: 'Emma inherited her grandmother\'s cottage along with its secrets. Strange whispers fill the night air, leading her to uncover a family mystery spanning generations...',
    author: 'Sarah Mitchell',
    genre: 'Mystery',
    likes: 203,
    views: 1876,
    readingTime: 12,
  },
  {
    id: '3',
    title: 'The Last Library',
    excerpt: 'In a post-apocalyptic world where books are banned, Thomas becomes the guardian of humanity\'s last library, hidden deep underground...',
    author: 'Marcus Rodriguez',
    genre: 'Dystopian',
    likes: 89,
    views: 892,
    readingTime: 6,
  },
];

const Home = () => {
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('likedStories');
    if (saved) {
      setLikedStories(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleLike = (storyId: string) => {
    const newLikedStories = new Set(likedStories);
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId);
    } else {
      newLikedStories.add(storyId);
    }
    setLikedStories(newLikedStories);
    localStorage.setItem('likedStories', JSON.stringify(Array.from(newLikedStories)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero/80" />
        <div className="relative container py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Where Stories Come to Life
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover amazing stories, share your own, and let AI help you craft the perfect narrative
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/stories">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Stories
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link to="/publish">
                <PenTool className="mr-2 h-5 w-5" />
                Start Writing
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Tell Your Story</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-gradient-card border-0 shadow-story">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Read & Discover</h3>
                <p className="text-muted-foreground">
                  Explore thousands of stories from talented writers around the world
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-card border-0 shadow-story">
              <CardContent className="pt-6">
                <PenTool className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Write & Share</h3>
                <p className="text-muted-foreground">
                  Publish your stories and connect with readers who appreciate your work
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-card border-0 shadow-story">
              <CardContent className="pt-6">
                <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI-Powered Tools</h3>
                <p className="text-muted-foreground">
                  Get help with writing, grammar checking, and plot development
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Trending Stories</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/stories">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleStories.map((story) => (
              <StoryCard
                key={story.id}
                {...story}
                isLiked={likedStories.has(story.id)}
                onLike={handleLike}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;