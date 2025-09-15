import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import AssetPreview from "@/components/multimedia/AssetPreview";
import { supabase } from "@/lib/supabase";
import type { Story, GeneratedAsset } from "@/lib/supabase";
import type { MultimediaAsset } from "@/types/multimedia";
import { 
  Wand2, 
  Upload, 
  Sparkles, 
  Image, 
  Video, 
  BookOpen, 
  Volume2,
  Play,
  Loader2
} from "lucide-react";

const MultimediaStudio = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [generatedAssets, setGeneratedAssets] = useState<MultimediaAsset[]>([]);
  const [generating, setGenerating] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const resetStudio = () => {
    setTitle("");
    setAuthorName("");
    setStoryContent("");
    setCurrentStory(null);
    setGeneratedAssets([]);
    setGenerating(null);
    setProgress(0);
  };

  const saveStoryToDatabase = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('stories')
        .insert({
          title,
          content: storyContent,
          author_name: authorName,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving story:', error);
      throw error;
    }
  };

  const saveAssetToDatabase = async (asset: Omit<GeneratedAsset, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('generated_assets')
        .insert(asset)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving asset:', error);
      throw error;
    }
  };

  const generateAsset = async (assetType: 'image' | 'video' | 'comic' | 'audiobook' | 'audiobookVideo') => {
    if (!title.trim() || !storyContent.trim() || !authorName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before generating content.",
        variant: "destructive",
      });
      return;
    }

    try {
      setGenerating(assetType);
      setProgress(0);

      // Save story if not already saved
      let story = currentStory;
      if (!story) {
        story = await saveStoryToDatabase();
        setCurrentStory(story);
      }

      // Simulate generation progress
      const progressSteps = [20, 40, 60, 80, 95];
      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(progressSteps[i]);
      }

      // Create mock asset based on type
      const mockAsset: MultimediaAsset = {
        id: `${assetType}_${Date.now()}`,
        title: `${title} - ${assetType.charAt(0).toUpperCase() + assetType.slice(1)}`,
        author: authorName,
        createdAt: new Date().toISOString(),
        assetType,
        url: `https://example.com/${assetType}/${Date.now()}`,
        preview: assetType === 'image' ? `https://picsum.photos/400/300?random=${Date.now()}` : undefined,
        meta: {
          duration: assetType.includes('audio') || assetType.includes('video') ? 323 : undefined,
          pageCount: assetType === 'comic' ? 12 : undefined,
          resolution: assetType === 'image' ? "1920x1080" : undefined,
        }
      };

      // Save to database
      if (story) {
        await saveAssetToDatabase({
          story_id: story.id,
          asset_type: assetType,
          title: mockAsset.title,
          url: mockAsset.url,
          preview: mockAsset.preview,
          meta: mockAsset.meta,
        });
      }

      setProgress(100);
      setGeneratedAssets(prev => [...prev, mockAsset]);
      
      toast({
        title: "Generation Complete!",
        description: `Your ${assetType} has been successfully generated.`,
      });

    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(null);
      setProgress(0);
    }
  };

  const generationButtons = [
    {
      type: 'image' as const,
      label: 'Generate Images',
      icon: Image,
      description: 'Create visual scenes from your story',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      type: 'video' as const,
      label: 'Generate Video',
      icon: Video,
      description: 'Transform your story into a video',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      type: 'comic' as const,
      label: 'Generate Comic',
      icon: BookOpen,
      description: 'Create a comic book version',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      type: 'audiobook' as const,
      label: 'Generate Audio',
      icon: Volume2,
      description: 'Convert to narrated audiobook',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      type: 'audiobookVideo' as const,
      label: 'Audio + Video',
      icon: Play,
      description: 'Audiobook with visual captions',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {!currentStory && generatedAssets.length === 0 ? (
          // Story Input Form
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                Multimedia Story Studio
              </h1>
              <p className="text-xl text-muted-foreground">
                Transform your stories into immersive multimedia experiences
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Create Your Story
                </CardTitle>
                <CardDescription>
                  Enter your story details to get started with multimedia generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Story Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter your story title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author Name</Label>
                    <Input
                      id="author"
                      placeholder="Enter author name"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Your Story</Label>
                  <Textarea
                    id="story"
                    placeholder="Write or paste your story here..."
                    value={storyContent}
                    onChange={(e) => setStoryContent(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload File
                  </Button>
                  <div className="text-sm text-muted-foreground flex items-center">
                    Supported formats: .txt, .doc, .pdf
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generation Options */}
            {title && authorName && storyContent && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Choose What to Generate</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {generationButtons.map((button) => (
                    <Card key={button.type} className="relative overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className={`p-4 rounded-full text-white ${button.color}`}>
                            <button.icon className="h-8 w-8" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{button.label}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {button.description}
                            </p>
                          </div>
                          <Button
                            onClick={() => generateAsset(button.type)}
                            disabled={generating !== null}
                            className="w-full"
                          >
                            {generating === button.type ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Sparkles className="h-4 w-4 mr-2" />
                            )}
                            {generating === button.type ? 'Generating...' : 'Generate'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            {generating && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="font-medium">
                        Generating {generating}... {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      This may take a few moments. Please don't close this page.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Generated Results
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-muted-foreground">by {authorName}</p>
                {currentStory && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Created: {new Date(currentStory.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Button onClick={resetStudio} variant="outline">
                Create New Story
              </Button>
            </div>

            {/* Continue Generation Options */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Generate More Content</h2>
              <div className="flex flex-wrap gap-3">
                {generationButtons.map((button) => {
                  const hasGenerated = generatedAssets.some(asset => asset.assetType === button.type);
                  return (
                    <Button
                      key={button.type}
                      onClick={() => generateAsset(button.type)}
                      disabled={generating !== null || hasGenerated}
                      variant={hasGenerated ? "secondary" : "default"}
                      size="sm"
                    >
                      {generating === button.type ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <button.icon className="h-4 w-4 mr-2" />
                      )}
                      {hasGenerated ? 'Generated' : button.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Generated Assets */}
            {generatedAssets.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Generated Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedAssets.map((asset) => (
                    <AssetPreview
                      key={asset.id}
                      asset={asset}
                      onView={(asset) => {
                        toast({
                          title: "Opening Asset",
                          description: `Opening ${asset.title}`,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            {generating && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span className="font-medium">
                        Generating {generating}... {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      This may take a few moments. Please don't close this page.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultimediaStudio;