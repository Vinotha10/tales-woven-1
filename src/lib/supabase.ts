import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xpxldsalqqsgyepxbxgh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhweGxkc2FscXFzZ3llcHhieGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MDg0NzMsImV4cCI6MjA3MzQ4NDQ3M30.2sdxzrOy8yNuAjt7EfK3yqQpkvlMeSAHCpUetbJF_Ok'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Story {
  id: string
  title: string
  content: string
  author_name: string
  user_id: string
  created_at: string
  updated_at: string
}

export interface GeneratedAsset {
  id: string
  story_id: string
  asset_type: 'image' | 'video' | 'comic' | 'audiobook' | 'audiobookVideo'
  title: string
  url: string
  preview?: string
  meta: any
  created_at: string
}