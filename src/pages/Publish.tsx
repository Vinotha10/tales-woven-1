import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { PenTool, Save, Eye, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const genres = ['Sci-Fi', 'Mystery', 'Romance', 'Fantasy', 'Thriller', 'Dystopian', 'Steampunk', 'Drama', 'Comedy', 'Horror'];

const Publish = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    genre: '',
    tags: '',
    author: '',
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handlePublish = async () => {
    if (!formData.title || !formData.content || !formData.author || !formData.genre) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulate API call - in a real app, this would send to your backend
      const newStory = {
        id: Date.now().toString(),
        ...formData,
        likes: 0,
        views: 0,
        readingTime: estimateReadingTime(formData.content),
        publishedAt: new Date().toISOString(),
      };

      // Save to localStorage for demo purposes
      const existingStories = JSON.parse(localStorage.getItem('userStories') || '[]');
      existingStories.push(newStory);
      localStorage.setItem('userStories', JSON.stringify(existingStories));

      toast.success('Story published successfully!');
      
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        genre: '',
        tags: '',
        author: '',
      });
      
      // Navigate to stories page
      setTimeout(() => {
        navigate('/stories');
      }, 1500);
      
    } catch (error) {
      toast.error('Failed to publish story. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = () => {
    const drafts = JSON.parse(localStorage.getItem('storyDrafts') || '[]');
    const draftData = {
      ...formData,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
    };
    drafts.push(draftData);
    localStorage.setItem('storyDrafts', JSON.stringify(drafts));
    toast.success('Draft saved successfully!');
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Story Preview</h1>
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                <PenTool className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            
            <Card className="bg-reading-background border-0 shadow-story">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{formData.title || 'Untitled Story'}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>By {formData.author || 'Anonymous'}</span>
                      {formData.genre && <Badge variant="secondary">{formData.genre}</Badge>}
                      <span>{estimateReadingTime(formData.content)} min read</span>
                    </div>
                    {formData.excerpt && (
                      <p className="text-lg text-muted-foreground italic border-l-4 border-accent pl-4">
                        {formData.excerpt}
                      </p>
                    )}
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {formData.content || 'Your story content will appear here...'}
                    </div>
                  </div>
                  
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {formData.tags.split(',').map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <PenTool className="h-8 w-8 text-accent" />
              Publish Your Story
            </h1>
            <p className="text-muted-foreground text-lg">
              Share your creativity with the world
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Story Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Give your story a compelling title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Author Name *</Label>
                    <Input
                      id="author"
                      placeholder="Your name or pen name"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="genre">Genre *</Label>
                      <Select value={formData.genre} onValueChange={(value) => handleInputChange('genre', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="e.g., adventure, magic, hero (comma-separated)"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="excerpt">Story Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="A brief, engaging summary to hook readers (optional)"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Story Content *</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Write your story here... Let your imagination flow!"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={20}
                    className="resize-none"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <span>{formData.content.split(' ').length} words</span>
                    <span>~{estimateReadingTime(formData.content)} min read</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setPreviewMode(true)}
                    variant="outline" 
                    className="w-full"
                    disabled={!formData.title && !formData.content}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Story
                  </Button>
                  
                  <Button 
                    onClick={handleSaveDraft}
                    variant="secondary" 
                    className="w-full"
                    disabled={!formData.title && !formData.content}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  
                  <Button 
                    onClick={handlePublish}
                    disabled={isPublishing || !formData.title || !formData.content || !formData.author || !formData.genre}
                    className="w-full"
                  >
                    {isPublishing ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-pulse" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Publish Story
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0">
                <CardHeader>
                  <CardTitle className="text-sm">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Start with a compelling hook in your first sentence</p>
                  <p>• Show, don't tell - use vivid descriptions</p>
                  <p>• Create relatable characters with clear motivations</p>
                  <p>• Build tension and conflict throughout</p>
                  <p>• End with a satisfying resolution</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;