import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StoryCard from '@/components/StoryCard';
import Navigation from '@/components/Navigation';
import { Search, Filter } from 'lucide-react';

// Expanded sample stories data
const allStories = [
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
  {
    id: '4',
    title: 'Moonlight Serenade',
    excerpt: 'When jazz musician Elena meets mysterious stranger Vincent, their connection transcends time and space. But some love stories are written in the stars...',
    author: 'Isabella Rose',
    genre: 'Romance',
    likes: 324,
    views: 2156,
    readingTime: 10,
  },
  {
    id: '5',
    title: 'The Clockmaker\'s Daughter',
    excerpt: 'In Victorian London, clockmaker\'s daughter Ada discovers her father\'s greatest invention: a machine that can manipulate time itself...',
    author: 'James Hartford',
    genre: 'Steampunk',
    likes: 178,
    views: 1434,
    readingTime: 15,
  },
  {
    id: '6',
    title: 'Quantum Hearts',
    excerpt: 'Dr. Zara Kim\'s experiment in quantum entanglement goes wrong, splitting her consciousness across multiple realities. Now she must find her way back...',
    author: 'Michael Chang',
    genre: 'Sci-Fi',
    likes: 267,
    views: 1987,
    readingTime: 11,
  },
];

const genres = ['All', 'Sci-Fi', 'Mystery', 'Romance', 'Fantasy', 'Thriller', 'Dystopian', 'Steampunk'];

const Stories = () => {
  const [allStoriesData, setAllStoriesData] = useState(allStories);
  const [stories, setStories] = useState(allStories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load liked stories
    const saved = localStorage.getItem('likedStories');
    if (saved) {
      setLikedStories(new Set(JSON.parse(saved)));
    }

    // Load published stories from localStorage and combine with sample stories
    const userStories = JSON.parse(localStorage.getItem('userStories') || '[]');
    const combinedStories = [...allStories, ...userStories];
    setAllStoriesData(combinedStories);
  }, []);

  useEffect(() => {
    let filtered = allStoriesData;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(story => story.genre === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setStories(filtered);
  }, [selectedGenre, searchTerm, allStoriesData]);

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
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Stories</h1>
          <p className="text-muted-foreground text-lg">Find your next favorite read from our community of writers</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search stories, authors, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Genre:</span>
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenre === genre ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-80"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {stories.length} {stories.length === 1 ? 'story' : 'stories'} found
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              {...story}
              isLiked={likedStories.has(story.id)}
              onLike={handleLike}
            />
          ))}
        </div>

        {stories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No stories found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchTerm('');
              setSelectedGenre('All');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;