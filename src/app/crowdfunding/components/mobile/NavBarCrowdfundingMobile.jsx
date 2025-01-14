import React, { useState, useEffect, useRef } from "react";

const NavBarCrowdfundingMobile = ({ setActiveSection }) => {
    const [activeHash, setActiveHash] = useState('');
    const [isVisible, setIsVisible] = useState(false); // Starea pentru vizibilitatea barei
    const [lastScrollY, setLastScrollY] = useState(window.pageYOffset); // Inițializăm cu poziția actuală a scrollului
    const [isScrollingDown, setIsScrollingDown] = useState(false); // Detectează direcția de scroll
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#overview';
            setActiveHash(hash);
            setActiveSection(hash.substring(1));
        };

        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;

            // Verificăm dacă scrollează în jos și trece de 100px
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(true); // Bara coboară lin când scrollezi în jos și ai trecut de 100px
                setIsScrollingDown(true); // Direcția de scroll este în jos
            }
            // Verificăm dacă scrollează în sus și este sub 100px
            else if (currentScrollY < lastScrollY) {
                setIsVisible(false); // Bara urcă lin când scrollezi în sus
                setIsScrollingDown(false); // Direcția de scroll este în sus
            }

            setLastScrollY(currentScrollY); // Actualizăm poziția anterioară de scroll
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('scroll', handleScroll);

        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, setActiveSection]);

    const handleClick = (hash) => {
        window.location.hash = hash;
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (hash) => {
        const baseClasses = 'px-1 py-[6px] text-[14px] flex justify-center items-center mt-1 w-full relative';
        const activeClasses = 'text-[#F1F1F1] font-avenir-heavy after:absolute after:content-[""] after:bg-[#F1F1F1] after:h-[1px] after:w-full after:left-0 after:bottom-[3px]';
        const inactiveClasses = 'text-[#979797] border-b-4 border-transparent font-avenir';
    
        return `${baseClasses} ${activeHash === hash ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="mb-10">
            <div 
                ref={navbarRef}
                id="navbar-mobile-original" 
                className={`fixed top-0 left-0 right-0 bg-black transition-transform duration-500 ease-in-out ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`} // Bara de navigare va coborî și urca lin
            >
                <div className="flex items-center justify-center h-[40px]">
                    <div className="flex items-center justify-center gap-[30px] w-full px-5">
                        <a className={linkClasses('#overview')} onClick={() => handleClick('#overview')}>Overview</a>
                        <a className={linkClasses('#rewards')} onClick={() => handleClick('#rewards')}>Rewards</a>
                        <a className={linkClasses('#community')} onClick={() => handleClick('#community')}>Community</a>
                        <a className={linkClasses('#extras')} onClick={() => handleClick('#extras')}>Extras</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarCrowdfundingMobile;
