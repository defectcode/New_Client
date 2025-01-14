import { useEffect, useState } from 'react';

const useSticky = (offsetTop = 0) => {
    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        setSticky(window.scrollY > offsetTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return isSticky;
};

export default useSticky;
