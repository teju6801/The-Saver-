import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dog-rescue-upload');
    formData.append('folder', 'lost-found');
    formData.append('resource_type', 'image');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dcaxtwrjb/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await res.json();

    if (!res.ok || !result.secure_url) {
      return NextResponse.json({ 
        error: result.error?.message || 'Upload failed' 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      url: result.secure_url 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
