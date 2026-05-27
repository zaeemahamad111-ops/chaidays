import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

export async function getSiteData() {
  // Try Supabase first if configured
  if (supabase) {
    try {
      const { data: row, error } = await supabase
        .from('site_content')
        .select('data')
        .single();
        
      if (!error && row && row.data) {
        return row.data;
      }
    } catch (e) {
      console.error("Failed to fetch from Supabase, falling back to local file:", e);
    }
  }

  // Fallback to local file
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'content.json');
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileContents);
    }
  } catch (e) {
    console.error("Failed to read local data file:", e);
  }

  return null;
}
