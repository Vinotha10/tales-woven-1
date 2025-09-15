import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { Sparkles, Wand2, CheckCircle, Lightbulb, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// This would typically be stored securely in environment variables
const GEMINI_API_KEY = 'AIzaSyA5_7Zf78SIZHxX1WCYXJfkKnMQbjS2POc';

const AIWriter = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [textToCheck, setTextToCheck] = useState('');
  const [grammarResult, setGrammarResult] = useState('');
  const [plotTwistStory, setPlotTwistStory] = useState('');
  const [plotTwistResult, setPlotTwistResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);
  const [isGeneratingTwist, setIsGeneratingTwist] = useState(false);

  const generateStory = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a story prompt');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Write a creative and engaging short story based on this prompt: "${prompt}". Make it approximately 300-500 words with vivid descriptions, compelling characters, and an interesting plot. Focus on storytelling quality and emotional engagement.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setGeneratedStory(data.candidates[0].content.parts[0].text);
        toast.success('Story generated successfully!');
      } else {
        console.error('Unexpected API response:', data);
        throw new Error('No story content received from API');
      }
    } catch (error) {
      console.error('Error generating story:', error);
      toast.error(`Failed to generate story: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const checkGrammar = async () => {
    if (!textToCheck.trim()) {
      toast.error('Please enter text to check');
      return;
    }

    setIsCheckingGrammar(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Please check the following text for grammar, spelling, punctuation, and style issues. Provide corrections and suggestions for improvement. Format your response clearly with explanations for each correction:\n\n"${textToCheck}"`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setGrammarResult(data.candidates[0].content.parts[0].text);
        toast.success('Grammar check completed!');
      } else {
        console.error('Unexpected API response:', data);
        throw new Error('No grammar analysis received from API');
      }
    } catch (error) {
      console.error('Error checking grammar:', error);
      toast.error(`Failed to check grammar: ${error.message}`);
    } finally {
      setIsCheckingGrammar(false);
    }
  };

  const generatePlotTwist = async () => {
    if (!plotTwistStory.trim()) {
      toast.error('Please enter your story for plot twist suggestions');
      return;
    }

    setIsGeneratingTwist(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Based on this story: "${plotTwistStory}"\n\nSuggest 3-5 creative and unexpected plot twists that could enhance the narrative. Each twist should be surprising yet logical within the story's context. Explain how each twist could be implemented and its potential impact on the story.`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setPlotTwistResult(data.candidates[0].content.parts[0].text);
        toast.success('Plot twist suggestions generated!');
      } else {
        console.error('Unexpected API response:', data);
        throw new Error('No plot twist suggestions received from API');
      }
    } catch (error) {
      console.error('Error generating plot twists:', error);
      toast.error(`Failed to generate plot twists: ${error.message}`);
    } finally {
      setIsGeneratingTwist(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-accent" />
            AI Writing Assistant
          </h1>
          <p className="text-muted-foreground text-lg">
            Let artificial intelligence help you craft better stories
          </p>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              Generate Story
            </TabsTrigger>
            <TabsTrigger value="grammar" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Grammar Check
            </TabsTrigger>
            <TabsTrigger value="plot-twist" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Plot Twist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Story Prompt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Enter your story idea or prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="e.g., A detective discovers that the serial killer they've been hunting is their own reflection from a parallel universe..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <Button 
                    onClick={generateStory} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Story
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Story</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedStory ? (
                    <div className="space-y-4">
                      <div className="bg-reading-background p-4 rounded-lg max-h-96 overflow-y-auto">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {generatedStory}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => navigator.clipboard.writeText(generatedStory)}
                        className="w-full"
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Your generated story will appear here
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grammar">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text to Check</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="grammar-text">Paste your text here</Label>
                    <Textarea
                      id="grammar-text"
                      placeholder="Enter the text you want to check for grammar, spelling, and style issues..."
                      value={textToCheck}
                      onChange={(e) => setTextToCheck(e.target.value)}
                      rows={8}
                    />
                  </div>
                  <Button 
                    onClick={checkGrammar} 
                    disabled={isCheckingGrammar}
                    className="w-full"
                  >
                    {isCheckingGrammar ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Check Grammar
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grammar Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {grammarResult ? (
                    <div className="space-y-4">
                      <div className="bg-reading-background p-4 rounded-lg max-h-96 overflow-y-auto">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {grammarResult}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Grammar suggestions will appear here
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="plot-twist">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="plot-story">Enter your story or story outline</Label>
                    <Textarea
                      id="plot-story"
                      placeholder="Describe your story plot, characters, and current direction. The AI will suggest unexpected twists..."
                      value={plotTwistStory}
                      onChange={(e) => setPlotTwistStory(e.target.value)}
                      rows={8}
                    />
                  </div>
                  <Button 
                    onClick={generatePlotTwist} 
                    disabled={isGeneratingTwist}
                    className="w-full"
                  >
                    {isGeneratingTwist ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Generate Plot Twists
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plot Twist Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  {plotTwistResult ? (
                    <div className="space-y-4">
                      <div className="bg-reading-background p-4 rounded-lg max-h-96 overflow-y-auto">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {plotTwistResult}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Plot twist suggestions will appear here
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Card className="bg-gradient-accent text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-6 w-6" />
                <h3 className="text-xl font-semibold">Pro Tips</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Badge variant="secondary" className="mb-2">Story Generation</Badge>
                  <p>Be specific with your prompts. Include genre, character details, and setting for better results.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Grammar Check</Badge>
                  <p>Break longer texts into smaller chunks for more detailed analysis and suggestions.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Plot Twists</Badge>
                  <p>Provide character motivations and current plot direction for more relevant twist suggestions.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIWriter;