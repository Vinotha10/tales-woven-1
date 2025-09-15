export interface MultimediaAsset {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  assetType: 'story' | 'image' | 'video' | 'comic' | 'audiobook' | 'audiobookVideo';
  url: string;
  preview?: string;
  meta: {
    duration?: number;
    resolution?: string;
    style?: string;
    voiceUsed?: string;
    pageCount?: number;
    wordCount?: number;
    scenes?: number;
  };
}

export interface StoryProject {
  id: string;
  title: string;
  author: string;
  originalStory: string;
  createdAt: string;
  assets: MultimediaAsset[];
  status: 'generating' | 'completed' | 'error';
}