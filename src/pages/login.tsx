import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validăm emailul și parola
        if (email === process.env.NEXT_PUBLIC_EMAIL && password === process.env.NEXT_PUBLIC_PASSWORD) {
            const sessionExpiry = new Date().getTime() + 5 * 60 * 1000; 

            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('sessionExpiry', sessionExpiry.toString()); 
            router.push('/admin'); 
        } else {
            setError('Incorrect email or password!');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ color: '#333', marginBottom: '20px' }}>Login Admin</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                    >
                        Login
                    </button>
                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
