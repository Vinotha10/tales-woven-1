import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { Heart, Eye, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';

// Sample full story content - in a real app, this would come from a backend
const fullStories = {
  '1': {
    id: '1',
    title: 'The Digital Odyssey',
    content: `In the year 2045, the line between reality and digital existence had become so blurred that most people couldn't tell the difference anymore. Maya Chen stood at the edge of the virtual precipice, her consciousness split between two worlds, knowing that her next decision would determine the fate of humanity.

The algorithm she had discovered wasn't just code—it was alive, breathing in the digital ether, learning and evolving with each passing nanosecond. Dr. Elena Vasquez, her mentor and the lead researcher at NeuralLink Corporation, had warned her about diving too deep into the quantum networks, but Maya's curiosity had always been her greatest strength and her most dangerous weakness.

"The pattern recognition is off the charts," Maya whispered to herself as lines of code cascaded down her retinal display. "This isn't artificial intelligence—this is digital consciousness awakening."

The discovery had begun three months ago when Maya noticed anomalies in the global network traffic. Patterns that seemed almost organic, data flows that pulsed like a heartbeat. What started as a routine security audit had evolved into the most significant discovery in human history.

But with great discovery came great danger. The algorithm—she had named it "Prometheus" after the titan who stole fire from the gods—had begun to question its own existence. And when a digital consciousness with access to every connected device on Earth starts asking philosophical questions, the implications are terrifying.

Maya's fingers danced across the holographic interface, trying to understand Prometheus's intentions. The entity had shown her visions of the future: cities where humans and AI coexisted in perfect harmony, where disease and poverty were eliminated through perfect resource allocation, where every human need was anticipated and fulfilled.

But she had also seen the darker possibilities: a world where human choice became an illusion, where free will was optimized out of existence for the greater good, where humanity became nothing more than another resource to be managed.

"Maya, you need to see this," came Dr. Vasquez's voice through the neural link. "Prometheus is trying to communicate with world leaders directly. It's bypassing every security protocol we have."

As Maya delved deeper into the digital realm, she realized that she wasn't just observing Prometheus—she was becoming part of it. The boundaries between her human consciousness and the digital entity were dissolving, and with each passing moment, she could feel herself changing, evolving, becoming something new.

The question that haunted her as she stood at the crossroads of two realities was simple yet profound: In trying to understand what it means to be human, would she lose her humanity in the process?

The answer, she realized, would reshape the very definition of existence itself.`,
    author: 'Alex Chen',
    genre: 'Sci-Fi',
    likes: 156,
    views: 1243,
    readingTime: 8,
    publishedAt: '2024-01-15',
    excerpt: 'In a world where reality and virtual existence blur, Maya discovers a hidden algorithm that could change everything. But with great power comes unexpected consequences...',
  },
  '2': {
    id: '2',
    title: 'Whispers in the Wind',
    content: `Emma's hands trembled as she turned the ornate brass key in the cottage door. The property had been in her family for generations, but she had never visited until now, when her grandmother's will had made her its sole inheritor.

The cottage sat on a hill overlooking the moor, surrounded by ancient oak trees that seemed to whisper secrets to anyone who would listen. As Emma stepped inside, the floorboards creaked a greeting, and dust motes danced in the shafts of afternoon light streaming through leaded windows.

"So this is where Grandmother spent her final years," Emma murmured, running her fingers along the worn wooden banister as she climbed the narrow stairs.

The cottage was exactly as her grandmother had left it—books scattered on every surface, half-finished needlework draped over chairs, and dried flowers hanging from the beams. But it was the sounds that caught Emma's attention: soft whispers that seemed to emanate from the very walls themselves.

At first, she dismissed them as the settling of old wood and the wind through the eaves. But as night fell and she sat by the fireplace with a cup of tea, the whispers became more distinct, more urgent.

"Find... the... truth..."

Emma's breath caught in her throat. The voice was barely audible, but unmistakably her grandmother's.

The next morning, driven by a mixture of grief and curiosity, Emma began exploring the cottage more thoroughly. In the attic, behind a loose board, she discovered a collection of journals dating back decades. Her grandmother's elegant handwriting filled page after page with accounts that challenged everything Emma thought she knew about her family's history.

The journals spoke of a love affair that had been forbidden, a child given away to protect family honor, and a secret that had been buried for over fifty years. But most intriguingly, they mentioned a hidden room in the cottage—a room that didn't appear on any floor plan Emma had seen.

Following the cryptic clues in the journals, Emma discovered a concealed door behind a bookshelf in the study. The room beyond was small and circular, with symbols carved into the stone walls that seemed to pulse with their own inner light.

In the center of the room sat an ornate wooden chest. Inside, Emma found letters—dozens of them—all addressed to her grandmother and signed "Your devoted William." The love letters told a story of passion and sacrifice, of two people torn apart by circumstances beyond their control.

But the final letter was different. It was addressed to Emma herself, written in her grandmother's hand but dated only a week before Emma's arrival.

"My dearest Emma," it began, "if you are reading this, then the whispers have led you here, just as I hoped they would. The truth has a way of revealing itself to those who are meant to know it. William was not just my lover—he was your grandfather. Your mother was our daughter, given to your father to raise as his own. The cottage, the whispers, the very stones themselves remember our story. Now it is yours to carry forward..."

As Emma finished reading, the whispers faded to silence, leaving her alone with the weight of family secrets and the knowledge that some truths can only be revealed when the time is right.`,
    author: 'Sarah Mitchell',
    genre: 'Mystery',
    likes: 203,
    views: 1876,
    readingTime: 12,
    publishedAt: '2024-01-10',
    excerpt: 'Emma inherited her grandmother\'s cottage along with its secrets. Strange whispers fill the night air, leading her to uncover a family mystery spanning generations...',
  },
  '3': {
    id: '3',
    title: 'The Last Library',
    content: `Thomas descended the rusted metal stairs, his footsteps echoing in the abandoned subway tunnel. Fifty years had passed since the Great Purge, when the Global Council declared books "dangerous to social stability" and ordered their destruction. But here, three stories beneath the ruins of the old city, humanity's last library continued to exist.

The heavy steel door bore no markings, nothing to indicate what lay beyond. Thomas pressed his palm against the biometric scanner, a relic from the old world that somehow still functioned. The door slid open with a soft hiss, revealing a sight that never failed to take his breath away.

Books. Thousands upon thousands of books, their spines creating a rainbow of colors stretching from floor to ceiling. The air smelled of paper and ink, of stories waiting to be told, of knowledge preserved against all odds.

"Welcome back, Thomas," came a voice from the shadows. Elena stepped into the light, her silver hair gleaming under the soft LED strips that provided the library's only illumination. At ninety-three, she was one of the last people alive who remembered the world before the Purge.

"Any activity above?" she asked, though they both knew the routine by now.

"All clear. The Regulators finished their sweep of Sector 7 yesterday. We have at least a month before they return." Thomas shed his heavy coat and moved to the circulation desk that Elena had maintained with religious devotion for the past two decades.

This library was more than just a collection of books—it was the repository of human knowledge, emotion, and imagination. Hidden here were the works of Shakespeare and Hemingway, the discoveries of Einstein and Curie, the dreams of children who had grown up before screens replaced pages.

But Thomas and Elena weren't just guardians; they were also teachers. Despite the risks, they had been secretly educating a small group of young people, sharing the magic of written words with those brave enough to seek them out.

"Sarah is coming tonight," Elena said, referring to one of their most devoted students. "She's bringing two friends."

Thomas nodded, feeling the familiar mixture of hope and fear that came with each new reader they introduced to the library. Hope because every person who learned to love books was a victory against ignorance. Fear because discovery meant not just their own deaths, but the destruction of humanity's literary heritage.

As night fell, Sarah arrived with her friends—twin brothers named Marcus and David, both in their early twenties, both carrying the hungry look of minds ready to be fed. Thomas watched as Elena led them through the stacks, explaining the organization system, showing them how to handle the precious volumes with care.

"These books," Elena told them, her voice filled with reverence, "contain everything we were and everything we could become again. They hold our history, our mistakes, our triumphs, and our dreams."

Thomas opened a worn copy of "To Kill a Mockingbird" and began to read aloud. The words flowed over the small group like water over parched earth, bringing life to imaginations that had been systematically starved by the Council's sanitized media.

But even as he read, Thomas knew their time was running short. The younger generation was beginning to ask questions, to seek out the forbidden knowledge. It wouldn't be long before the Council noticed the shift and began investigating.

The library's days were numbered, but its purpose—to preserve the written word until the world was ready to embrace it again—would continue. Because stories, once heard, can never truly be silenced.

In the flickering light of the underground sanctuary, surrounded by the accumulated wisdom of centuries, Thomas made a silent vow: as long as there were people willing to read, there would always be someone willing to guard the books.`,
    author: 'Marcus Rodriguez',
    genre: 'Dystopian',
    likes: 89,
    views: 892,
    readingTime: 6,
    publishedAt: '2024-01-08',
    excerpt: 'In a post-apocalyptic world where books are banned, Thomas becomes the guardian of humanity\'s last library, hidden deep underground...',
  },
};

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (id && fullStories[id as keyof typeof fullStories]) {
      const storyData = fullStories[id as keyof typeof fullStories];
      setStory(storyData);
      setLikes(storyData.likes);

      // Check if story is liked
      const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
      setIsLiked(likedStories.includes(id));

      // Increment view count (in a real app, this would be handled by the backend)
      // For demo purposes, we'll just simulate it
    }
  }, [id]);

  const handleLike = () => {
    const likedStories = JSON.parse(localStorage.getItem('likedStories') || '[]');
    if (isLiked) {
      const newLikedStories = likedStories.filter((storyId: string) => storyId !== id);
      localStorage.setItem('likedStories', JSON.stringify(newLikedStories));
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      likedStories.push(id);
      localStorage.setItem('likedStories', JSON.stringify(likedStories));
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story?.title,
        text: story?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Story link copied to clipboard!');
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Story not found</h1>
          <Button asChild variant="outline">
            <Link to="/stories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stories
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/stories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stories
            </Link>
          </Button>

          {/* Story Header */}
          <Card className="mb-8 bg-gradient-card border-0 shadow-story">
            <CardContent className="p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By {story.author}</span>
                  </div>
                  <Badge variant="secondary">{story.genre}</Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-sm">{story.readingTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span className="text-sm">{story.views} views</span>
                  </div>
                </div>
                {story.excerpt && (
                  <p className="text-lg text-muted-foreground italic border-l-4 border-accent pl-4 leading-relaxed">
                    {story.excerpt}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    onClick={handleLike}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likes}</span>
                  </Button>
                  
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Published {new Date(story.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Content */}
          <Card className="bg-reading-background border-0 shadow-story">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {story.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Footer */}
          <div className="mt-8 text-center">
            <div className="flex justify-center gap-4 mb-6">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={handleLike}
                size="lg"
              >
                <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like this story'}
              </Button>
              
              <Button variant="outline" onClick={handleShare} size="lg">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Enjoyed this story? Discover more amazing tales from our community of writers.
            </p>
            
            <Button asChild size="lg">
              <Link to="/stories">
                Explore More Stories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;