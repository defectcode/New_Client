import { useState } from 'react';

export const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Subscription successful!');
        setEmail('');
      } else {
        setMessage(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <footer>
      <div className="relative md:w-[415px] w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="border-transparent rounded-lg px-4 py-2 text-sm font-heebo w-full bg-[#F9F9F9] pr-28"
          />
        <button
          onClick={handleSubscribe}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black font-heebo text-[13px] px-4 py-2 rounded-[10px] h-[30px] flex items-center"        
        >
          Subscribe
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </footer>
  );
};
