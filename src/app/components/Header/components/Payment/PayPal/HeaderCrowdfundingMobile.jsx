import React, { useState, useEffect } from "react";
import FundraisingProgress from './components/Progres';
import Title from "./components/Title";
import { images } from './constants/carouselData';
import styles from './style/Header.module.css';
import useDeviceType from '../../app/Crowdfunding/components/hooks/useDeviceType';
import NavBarCrowdfundingMobile from './components/mobile/NavBarCrowdfundingMobile';
import NavBarCrowdfunding from './components/NavBarCrowdfunding';

const HeaderCrowdfundingMobile = () => {
    const currentData = images[0];
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');
    const [style, setStyle] = useState({
        marginTop: '-7vh',
        paddingBottom: '7vh',
    });

    useEffect(() => {
        if (window.location.hash) {
            setActiveSection(window.location.hash.substring(1));
        }

        const handleHashChange = () => {
            setActiveSection(window.location.hash.substring(1));
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    useEffect(() => {
        const updateStyle = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth > 410) {
                setStyle({
                    marginTop: '-4vh',
                    paddingBottom: '4vh',
                });
            } else {
                setStyle({
                    marginTop: '-8vh',
                    paddingBottom: '8vh',
                });
            }
        };

        updateStyle(); // Initialize on mount
        window.addEventListener('resize', updateStyle);

        return () => {
            window.removeEventListener('resize', updateStyle);
        };
    }, []);

    return (
        <div className={`headerMobile flex flex-col bg-black ${styles.headerCrowdfunding}`}>
            <div 
                className="relative" 
                style={{ 
                    height: 'calc(100vh - 20vh)', 
                    minHeight: '0',
                }}
            >
                <div className={`${styles.bgMobile}`} style={{ height: '100%', overflow: 'hidden' }}>
                    <div
                        style={{
                            height: '100%',
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 25%), url(${currentData.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitBackgroundClip: 'padding-box',
                            backgroundClip: 'padding-box',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                </div>
            </div>

            <div 
                className="bg-black flex flex-col justify-start px-5 relative" 
                style={{ 
                    height: '20vh', 
                    minHeight: '0', 
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        filter: 'blur(40px)',
                        WebkitFilter: 'blur(40px)',
                        zIndex: 1,
                        background: 'linear-gradient(to top left, rgba(40, 40, 40, 0.4), rgba(0, 0, 0, 0))',
                        backgroundRepeat: 'no-repeat',
                        pointerEvents: 'none',
                    }}
                ></div>

                <div 
                    className="max-w-screen-lg w-full flex flex-col gap-4 mb-2 relative z-10"
                    style={{
                        ...style,
                        fontSize: 'calc(1rem + 0.5vw)',
                    }}
                >
                    <Title title={currentData.title} description={currentData.description} />
                    <FundraisingProgress data={currentData} />
                </div>
            </div>
            <div className="my-10">
            {isMobile ? <NavBarCrowdfundingMobile setActiveSection={setActiveSection} /> : <NavBarCrowdfunding setActiveSection={setActiveSection} />}
            </div>
        </div>
    );
};

export default HeaderCrowdfundingMobile;
