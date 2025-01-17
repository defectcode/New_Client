import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onClose, isMuted }) => {
  const playerRef = useRef(null);
  const [showCloseButton, setShowCloseButton] = useState(true);

  const onReady = (event) => {
    const player = event.target;
    playerRef.current = player;

    const iframe = player.getIframe();
    const enterFullScreen = () => {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen().catch(err => {
          console.log("Error attempting to enable full-screen mode: ", err.message);
        });
      } else if (iframe.mozRequestFullScreen) { 
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) { 
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { 
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
      if (playerState === 1) {
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
      <div className="w-full h-full flex items-center justify-center">
        <YouTube
          videoId={videoId}
          className="w-full h-full max-w-full max-h-full"
          opts={{
            playerVars: {
              autoplay: 1,
              mute: isMuted ? 1 : 0,
              origin: window.location.origin,
            },
          }}
          onReady={onReady}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
