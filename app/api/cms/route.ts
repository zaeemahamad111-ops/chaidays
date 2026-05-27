import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    // Try Supabase first if configured
    if (supabase) {
      const { data: row, error } = await supabase
        .from('site_content')
        .select('data')
        .single();
        
      if (!error && row && row.data) {
        return NextResponse.json(row.data);
      }
    }

    // Fallback to local file
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Save to Supabase if configured
    if (supabase) {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, data: data });
        
      if (error) {
        console.error("Supabase Save Error:", error);
      }
    }

    // Always keep local file in sync as a backup/fallback
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ message: 'Data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
