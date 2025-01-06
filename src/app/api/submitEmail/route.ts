import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, fullName, phone, country, file, linkedin, portfolio, position } = await req.json();

  if (!email || !fullName || !phone || !country) {
    return new Response('Required fields are missing', { status: 400 });
  }

  try {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSep6g27u3tQvHY8j4q3FU8jR7DK93qrqIGcIl8Q_0SSE3LzGA/formResponse';
    const formData = new URLSearchParams();
    formData.append('entry.757255050', email);
    formData.append('entry.2138593472', position)
    formData.append('entry.1898953536', fullName);
    formData.append('entry.1164057355', phone);
    formData.append('entry.1517801595', country);
    formData.append('entry.1145558421', linkedin);
    formData.append('entry.930613078', portfolio);


    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to submit to Google Form');
    }

    return new Response(JSON.stringify({ message: 'Form submitted successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Failed to submit form', { status: 500 });
  }
}