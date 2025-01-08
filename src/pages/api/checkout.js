import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body); // Adaugă acest log

      const { items, paymentMethod } = req.body;

      if (!items || items.length === 0) {
        throw new Error('No items provided for checkout');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'apple_pay', 'amazon_pay'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      console.log('Session created:', session);

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      console.error('Stripe error:', err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

