import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Home, Info, PenTool, Sparkles, Library, Wand2, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/stories', label: 'Stories', icon: Library },
    { path: '/publish', label: 'Publish', icon: PenTool },
    { path: '/ai-writer', label: 'AI Writer', icon: Sparkles },
    { path: '/multimedia-studio', label: 'Studio', icon: Wand2 },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            StoryVerse
          </Link>
        </div>
        
        <div className="flex items-center space-x-1 ml-auto">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Button
              key={path}
              asChild
              variant={location.pathname === path ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Link to={path}>
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            </Button>
          ))}
          {user && (
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.user_metadata?.full_name || user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Sign Out</span>
              </Button>
            </div>
          )}
          {!user && (
            <div className="flex items-center space-x-2 ml-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;