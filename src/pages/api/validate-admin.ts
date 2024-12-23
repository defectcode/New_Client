import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { password } = req.body;

        if (password === process.env.NEXT_PUBLIC_PASSWORD_TWO_FACTOR) {
            return res.status(200).json({ success: true });
        }
        return res.status(401).json({ error: 'Invalid password' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
}
