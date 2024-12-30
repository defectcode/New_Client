import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const position = formData.get('position') as string;
    const email = formData.get('email') as string;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const country = formData.get('country') as string;
    const linkedin = formData.get('linkedin') as string;
    const portfolio = formData.get('portfolio') as string;

    if (!file) {
      return new Response('No file uploaded', { status: 400 });
    }

    const uploadResponse = await fetch('https://script.google.com/macros/s/AKfycbxa8thfmzRmj8tqDPF_yS-ZLcAPmfGEVQ4denV6sDr8MaDlAigLFvezXK5clokXCSLL/exec', {
      method: 'POST',
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file');
    }

    const uploadData = await uploadResponse.json();
    const fileUrl = uploadData.fileUrl;

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSep6g27u3tQvHY8j4q3FU8jR7DK93qrqIGcIl8Q_0SSE3LzGA/formResponse';
    const formBody = new URLSearchParams();
    formBody.append('entry.2138593472', position);
    formBody.append('entry.757255050', email);
    formBody.append('entry.1898953536', fullName);
    formBody.append('entry.1164057355', phone);
    formBody.append('entry.1517801595', country);
    formBody.append('entry.421081963', fileUrl); 
    formBody.append('entry.1145558421', linkedin);
    formBody.append('entry.930613078', portfolio);

    const formResponse = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    if (!formResponse.ok) {
      throw new Error('Failed to submit form data');
    }

    return NextResponse.json({ message: 'Form and file submitted successfully!', fileUrl });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`Failed to process request: ${error}`, { status: 500 });
  }
}
