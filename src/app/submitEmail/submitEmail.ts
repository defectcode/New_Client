import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body;

    const response = await fetch('https://script.google.com/macros/s/AKfycbywlWE_7gAa2Vw-Pyt1-2jQ9RImiEwPNGrjuYABHn2xBmvxlcE0pzWyJ7oetvvdm-c_/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to reach Google Apps Script');
    }

    const result = await response.text();
    res.status(200).json({ message: result });
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to submit email' });
  }
}
