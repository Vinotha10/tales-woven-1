import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Sparkles, Heart, PenTool, Eye, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Discover Stories',
      description: 'Explore thousands of creative stories from writers around the world, spanning every genre imaginable.',
    },
    {
      icon: PenTool,
      title: 'Share Your Work',
      description: 'Publish your stories and connect with readers who appreciate your unique voice and creativity.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Tools',
      description: 'Get help with story generation, grammar checking, and plot development using advanced AI technology.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a supportive community of writers and readers who celebrate the art of storytelling.',
    },
  ];

  const stats = [
    { icon: BookOpen, label: 'Stories Published', value: '10,000+' },
    { icon: Users, label: 'Active Writers', value: '2,500+' },
    { icon: Eye, label: 'Stories Read', value: '1M+' },
    { icon: Heart, label: 'Likes Given', value: '50K+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            About StoryVerse
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            StoryVerse is a platform where creativity meets technology. We believe every story deserves to be told, 
            every writer deserves an audience, and every reader deserves to discover their next favorite tale.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16 bg-gradient-card border-0 shadow-story">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We're on a mission to democratize storytelling by providing writers with powerful tools 
                  and readers with endless inspiration. Whether you're a seasoned author or just starting 
                  your writing journey, StoryVerse is here to support your creative endeavors.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By combining human creativity with artificial intelligence, we're creating a new paradigm 
                  for digital storytelling that empowers everyone to share their unique voice with the world.
                </p>
              </div>
              <div className="bg-gradient-primary p-8 rounded-lg text-white">
                <blockquote className="text-lg italic">
                  "Every great story begins with a single word, a spark of imagination, 
                  and the courage to share it with the world."
                </blockquote>
                <cite className="block text-right mt-4 text-white/80">- The StoryVerse Team</cite>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Special</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-gradient-card border-0 shadow-story hover:shadow-floating transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Community in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-primary text-primary-foreground border-0">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <Card className="mb-16 bg-gradient-accent text-white border-0">
          <CardContent className="p-8">
            <div className="text-center">
              <Sparkles className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Powered by AI</h2>
              <p className="text-lg mb-6 max-w-3xl mx-auto opacity-90">
                Our AI writing assistant uses advanced language models to help you overcome writer's block, 
                improve your grammar, and discover unexpected plot twists. It's like having a writing mentor 
                available 24/7.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Story Generation</h3>
                  <p className="opacity-80">Transform simple prompts into engaging narratives</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Grammar & Style</h3>
                  <p className="opacity-80">Polish your writing with intelligent suggestions</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Plot Development</h3>
                  <p className="opacity-80">Discover unexpected twists and story directions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Story?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of writers and readers who are already part of the StoryVerse community. 
            Your next great story is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/publish">
                <PenTool className="mr-2 h-5 w-5" />
                Start Writing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/stories">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Stories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;