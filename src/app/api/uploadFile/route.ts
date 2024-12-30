import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    console.log('Received file:', file.name);

    const fileUrl = `https://script.google.com/macros/s/AKfycbwPchE4BE617XMckaU_tJyecS8LZbvRnTlfrfatSZUDrwL22e1siFf23HFuXXnR81RV/exec?file=${file.name}`;

    return NextResponse.json({ fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    return new Response('Failed to upload file', { status: 500 });
  }
}
