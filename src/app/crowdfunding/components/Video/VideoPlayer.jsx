import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoSrc, onClose, isMuted }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
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

    useEffect(() => {
        if (videoRef.current) {
            enterFullScreen();  // Intră automat în modul fullscreen
        }

        if (isMuted) {
            videoRef.current.muted = true;
        } else {
            videoRef.current.muted = false;
        }
    }, [isMuted]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl">
                &times;
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-full object-contain"
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
