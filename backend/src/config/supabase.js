import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const BUCKET = 'project-thumbnails';

if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
  console.warn('⚠️  Supabase credentials not configured. Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY');
}

// Use service role key for backend operations (bypasses RLS policies)
export const supabase = createClient(supabaseUrl || '', supabaseServiceKey || supabaseAnonKey || '');

export const uploadProjectImage = async (file, projectId) => {
  try {
    if (!supabaseServiceKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured. Cannot upload to storage.');
    }

    const fileExt = file.originalname.split('.').pop();
    const fileName = `${projectId}-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    console.log(`Uploading to ${BUCKET}/${filePath}...`);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filePath);

    console.log(`Upload successful: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error('Supabase upload error:', error);
    throw new Error('Failed to upload image');
  }
};
