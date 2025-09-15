import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MultimediaAsset } from '@/types/multimedia';
import { 
  Image, 
  Video, 
  BookOpen, 
  Volume2, 
  PlayCircle,
  Download,
  Eye
} from 'lucide-react';

interface AssetPreviewProps {
  asset: MultimediaAsset;
  onView?: (asset: MultimediaAsset) => void;
}

const AssetPreview = ({ asset, onView }: AssetPreviewProps) => {
  const handleDownload = () => {
    if (asset.url) {
      const link = document.createElement('a');
      link.href = asset.url;
      link.download = asset.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const getAssetIcon = () => {
    switch (asset.assetType) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
      case 'audiobookVideo':
        return <Video className="h-5 w-5" />;
      case 'comic':
        return <BookOpen className="h-5 w-5" />;
      case 'audiobook':
        return <Volume2 className="h-5 w-5" />;
      default:
        return <PlayCircle className="h-5 w-5" />;
    }
  };

  const getAssetTypeLabel = () => {
    switch (asset.assetType) {
      case 'image':
        return 'Scene Image';
      case 'video':
        return 'Story Video';
      case 'comic':
        return 'Comic Book';
      case 'audiobook':
        return 'Audiobook';
      case 'audiobookVideo':
        return 'Audiobook Video';
      default:
        return 'Story';
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-card border-0 shadow-story hover:shadow-floating transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getAssetIcon()}
            <CardTitle className="text-lg">{asset.title}</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
            {getAssetTypeLabel()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Preview/Thumbnail */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Video Preview */}
          {(asset.assetType === 'video' || asset.assetType === 'audiobookVideo') && asset.url ? (
            <video 
              controls 
              className="w-full h-full object-cover"
              poster={asset.preview}
            >
              <source src={asset.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : 
          /* Audio Preview */
          asset.assetType === 'audiobook' && asset.url ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
              <Volume2 className="h-12 w-12 text-primary" />
              <audio controls className="w-full">
                <source src={asset.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : 
          /* Comic/PDF Preview */
          asset.assetType === 'comic' ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <BookOpen className="h-12 w-12 text-primary" />
              <span className="text-sm font-medium">Comic Book</span>
              <span className="text-xs text-muted-foreground">
                {asset.meta.pageCount} pages
              </span>
            </div>
          ) : 
          /* Image Preview */
          asset.assetType === 'image' && asset.preview ? (
            <img 
              src={asset.preview} 
              alt={asset.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {getAssetIcon()}
              <span className="text-sm">Preview</span>
            </div>
          )}
        </div>

        {/* Asset Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Author:</span>
            <span className="font-medium">{asset.author}</span>
          </div>
          <div className="flex justify-between">
            <span>Created:</span>
            <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
          </div>
          
          {asset.meta.duration && (
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{formatDuration(asset.meta.duration)}</span>
            </div>
          )}
          
          {asset.meta.pageCount && (
            <div className="flex justify-between">
              <span>Pages:</span>
              <span>{asset.meta.pageCount}</span>
            </div>
          )}
          
          {asset.meta.resolution && (
            <div className="flex justify-between">
              <span>Quality:</span>
              <span>{asset.meta.resolution}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(asset)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetPreview;