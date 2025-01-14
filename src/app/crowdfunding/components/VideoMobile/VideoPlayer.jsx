import React, { useRef, useEffect, useState } from 'react';
import './style/Video.css';  // Importă fișierul CSS

const VideoPlayer = ({ videoSrc, onClose }) => {
    const videoRef = useRef(null);
    const startY = useRef(0); // Păstrează poziția inițială de touch pe axa Y
    const [isLoading, setIsLoading] = useState(true);

    const isMobile = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    };

    useEffect(() => {
        const video = videoRef.current;

        const handleResize = () => {
            const isLandscape = window.innerWidth > window.innerHeight;
            if (document.fullscreenElement || video.webkitDisplayingFullscreen) {
                if (isLandscape) {
                    video.style.width = '100vw';
                    video.style.height = '100vh';
                } else {
                    video.style.width = '100%';
                    video.style.height = 'auto';
                }
            }
        };

        const handleFullScreenChange = () => {
            if (!document.fullscreenElement && !video.webkitDisplayingFullscreen) {
                video.style.width = '100%';
                video.style.height = 'auto';
            }
        };

        const handleTouchStart = (e) => {
            startY.current = e.touches[0].clientY; // Salvează poziția inițială de touch
        };

        const handleTouchMove = (e) => {
            const currentY = e.touches[0].clientY;
            const diffY = currentY - startY.current;

            // Verifică dacă glisarea este suficientă pentru a închide video-ul
            if (diffY > 50) {
                onClose();
            }
        };

        const handleVideoEnded = () => {
            if (document.fullscreenElement) {
                document.exitFullscreen().then(onClose).catch(onClose);
            } else {
                onClose();
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange);

        video.addEventListener('touchstart', handleTouchStart);
        video.addEventListener('touchmove', handleTouchMove);
        video.addEventListener('ended', handleVideoEnded);

        video.addEventListener('canplay', () => {
            setIsLoading(false);  // Dezactivează indicatorul de încărcare când video-ul este gata de redare
        });

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            video.removeEventListener('touchstart', handleTouchStart);
            video.removeEventListener('touchmove', handleTouchMove);
            video.removeEventListener('ended', handleVideoEnded);

            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, [onClose]);

    const enterFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.webkitEnterFullscreen) {
            videoRef.current.webkitEnterFullscreen();
        }
    };

    const handleLoadedData = () => {
        if (isMobile()) {
            enterFullScreen();
        }
    };

    return (
        <div className="video-container">
            <div className="video-wrapper">
                {/* Video Element */}
                <video
                    ref={videoRef}
                    src={videoSrc}
                    controls={!isLoading}
                    autoPlay
                    playsInline
                    muted
                    onLoadedData={handleLoadedData}
                    onClick={enterFullScreen}
                    className="max-w-full max-h-full object-contain"
                />

                {/* Indicator de încărcare */}
                {isLoading && (
                    <div className="loader">
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
