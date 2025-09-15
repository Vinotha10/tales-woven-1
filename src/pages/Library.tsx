import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import AssetPreview from '@/components/multimedia/AssetPreview';
import { StoryProject, MultimediaAsset } from '@/types/multimedia';
import { 
  Search, 
  Filter, 
  Library as LibraryIcon,
  Calendar,
  User,
  FolderOpen,
  Grid3X3,
  List
} from 'lucide-react';

const Library = () => {
  const [projects, setProjects] = useState<StoryProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssetType, setSelectedAssetType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredAssets, setFilteredAssets] = useState<MultimediaAsset[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('multimediaProjects') || '[]');
    setProjects(savedProjects);
  }, []);

  useEffect(() => {
    // Filter assets based on search term and asset type
    const allAssets = projects.flatMap(project => 
      project.assets.map(asset => ({
        ...asset,
        projectTitle: project.title
      }))
    );

    let filtered = allAssets;

    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedAssetType !== 'all') {
      filtered = filtered.filter(asset => asset.assetType === selectedAssetType);
    }

    setFilteredAssets(filtered);
  }, [projects, searchTerm, selectedAssetType]);

  const assetTypes = [
    { key: 'all', label: 'All Assets', count: projects.reduce((acc, p) => acc + p.assets.length, 0) },
    { key: 'image', label: 'Images', count: projects.reduce((acc, p) => acc + p.assets.filter(a => a.assetType === 'image').length, 0) },
    { key: 'video', label: 'Videos', count: projects.reduce((acc, p) => acc + p.assets.filter(a => a.assetType === 'video').length, 0) },
    { key: 'comic', label: 'Comics', count: projects.reduce((acc, p) => acc + p.assets.filter(a => a.assetType === 'comic').length, 0) },
    { key: 'audiobook', label: 'Audiobooks', count: projects.reduce((acc, p) => acc + p.assets.filter(a => a.assetType === 'audiobook').length, 0) },
    { key: 'audiobookVideo', label: 'A/V Books', count: projects.reduce((acc, p) => acc + p.assets.filter(a => a.assetType === 'audiobookVideo').length, 0) },
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAssetType('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
            <LibraryIcon className="h-10 w-10 text-primary" />
            Your Story Library
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse and manage all your multimedia story creations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-story">
            <CardContent className="pt-6 text-center">
              <FolderOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-story">
            <CardContent className="pt-6 text-center">
              <Grid3X3 className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {projects.reduce((acc, p) => acc + p.assets.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Assets</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-story">
            <CardContent className="pt-6 text-center">
              <User className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {new Set(projects.map(p => p.author)).size}
              </div>
              <div className="text-sm text-muted-foreground">Authors</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-story">
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {projects.filter(p => {
                  const daysDiff = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 3600 * 24);
                  return daysDiff <= 7;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 bg-gradient-card border-0 shadow-story">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2 flex-wrap">
                  {assetTypes.map((type) => (
                    <Badge
                      key={type.key}
                      variant={selectedAssetType === type.key ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent/20"
                      onClick={() => setSelectedAssetType(type.key)}
                    >
                      {type.label} ({type.count})
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {(searchTerm || selectedAssetType !== 'all') && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAssets.length} of {projects.reduce((acc, p) => acc + p.assets.length, 0)} assets
                </p>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        {projects.length === 0 ? (
          <Card className="text-center py-12 bg-gradient-card border-0 shadow-story">
            <CardContent>
              <LibraryIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Stories Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start creating multimedia stories to build your library
              </p>
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <a href="/multimedia-studio">Create Your First Story</a>
              </Button>
            </CardContent>
          </Card>
        ) : filteredAssets.length === 0 ? (
          <Card className="text-center py-12 bg-gradient-card border-0 shadow-story">
            <CardContent>
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Asset Display */
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredAssets.map((asset) => (
              <AssetPreview key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;