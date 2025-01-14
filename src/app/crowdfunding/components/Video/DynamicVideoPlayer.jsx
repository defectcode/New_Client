import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onClose, isMuted }) => {
    const playerRef = useRef(null);
    const [showCloseButton, setShowCloseButton] = useState(true);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        // Setează origin-ul doar după ce componenta este montată
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const onReady = (event) => {
        const player = event.target;
        playerRef.current = player;

        const iframe = player.getIframe();
        const enterFullScreen = () => {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen().catch(err => {
                    console.log("Error attempting to enable full-screen mode: ", err.message);
                });
            } else if (iframe.mozRequestFullScreen) { /* Firefox */
                iframe.mozRequestFullScreen();
            } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) { /* IE/Edge */
                iframe.msRequestFullscreen();
            }
        };

        enterFullScreen();
        player.playVideo();
    };

    useEffect(() => {
        let timeout;
        const handleMouseMove = () => {
            setShowCloseButton(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setShowCloseButton(false);
            }, 3000);
        };

        const handlePausePlay = (event) => {
            const playerState = event.data;
            if (playerState === 1) { // Playing
                setShowCloseButton(false);
            } else {
                setShowCloseButton(true);
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                onClose();
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        const player = playerRef.current;
        if (player) {
            player.addEventListener('onStateChange', handlePausePlay);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);

            if (player) {
                player.removeEventListener('onStateChange', handlePausePlay);
            }
        };
    }, [onClose]);

    const handleToggleMute = () => {
        if (playerRef.current) {
            const player = playerRef.current;
            if (player.isMuted()) {
                player.unMute();
            } else {
                player.mute();
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            {showCloseButton && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-3xl"
                >
                    &times;
                </button>
            )}
            <div className="relative w-full h-full flex items-center justify-center">
                <YouTube
                    videoId={videoId}
                    className="w-full h-full max-w-full max-h-full"
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            mute: isMuted ? 1 : 0,
                            origin: origin, // Folosește starea origin
                        },
                    }}
                    onReady={onReady}
                />
            </div>
            <button onClick={handleToggleMute} className="absolute bottom-4 left-4 text-white">
                {isMuted ? 'Unmute' : 'Mute'}
            </button>
        </div>
    );
};

export default VideoPlayer;
