import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import styles from '../Admin.module.css'; 

export default function Admin({ children }: PropsWithChildren<unknown>) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [adminPassword, setAdminPassword] = useState(''); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        const sessionExpiry = localStorage.getItem('sessionExpiry');

        if (!isAdmin || !sessionExpiry) {
            router.push('/login');
            return;
        }

        const currentTime = new Date().getTime();
        if (currentTime > parseInt(sessionExpiry)) {
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('sessionExpiry');
            router.push('/login');
            return;
        }

        setIsAuthenticated(true);
    }, [router]);

    const handleStoreAccess = async () => {

        const response = await fetch('/api/validate-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: adminPassword }),
        });

        if (response.ok) {
            router.push(process.env.NEXT_PUBLIC_STORE || '/'); 
        } else {
            setError('Incorrect password. Try again..'); 
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.header}>Admin Dashboard</h1>
                <p className={styles.subheader}>Welcome to the admin panel!</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('isAdmin');
                        localStorage.removeItem('sessionExpiry');
                        router.push('/');
                    }}
                    className={styles.logoutButton}
                >
                    Logout
                </button>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={styles.storeButton}
                >
                    Access the Store
                </button>
                {showDropdown && (
                    <div className={styles.dropdown}>
                        <h3 className={styles.dropdownHeader}>Authentication required</h3>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter the admin password."
                            className={styles.input}
                        />
                        {error && <p className={styles.errorText}>{error}</p>}
                        <div className={styles.dropdownButtons}>
                            <button onClick={handleStoreAccess} className={styles.confirmButton}>
                                Confirm
                            </button>
                            <button
                                onClick={() => {
                                    setShowDropdown(false);
                                    setError(null);
                                }}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
