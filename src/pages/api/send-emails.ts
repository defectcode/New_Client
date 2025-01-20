import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, firstName } = req.body;

    // Verificare date
    if (!email || !firstName) {
      return res.status(400).json({ error: 'Email and firstName are required' });
    }

    try {
      // Trimiterea emailului
      const { data, error } = await resend.emails.send({
        from: 'Your Company <onboarding@resend.dev>',
        to: [email],
        subject: `Thank you, ${firstName}!`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; max-width: 600px; margin: auto;">
            <h1 style="color: #000000; font-size: 26px; text-align: center;">Thank you, ${firstName}!</h1>
            <p style="font-size: 16px; text-align: center;">We truly appreciate your support. Your contribution helps us continue to improve and grow.</p>
            <p style="font-size: 14px; color: #555;">If you have any questions, feel free to reach out to us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
            <p style="font-size: 14px;">Best regards,<br/>Your Team</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend API Error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      res.status(200).json({ message: 'Thank-you email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
