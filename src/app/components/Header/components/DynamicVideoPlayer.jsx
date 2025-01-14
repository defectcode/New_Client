import { useRef } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onClose }) => {
  const playerRef = useRef(null);

  const handleToggleMute = () => {
    if (playerRef.current) {
      const player = playerRef.current.internalPlayer;
      const isMuted = player.isMuted();
      player.mute(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl">
        &times;
      </button>
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <YouTube
            videoId={videoId}
            className="absolute top-0 left-0 w-full h-full"
            opts={{
              playerVars: {
                autoplay: 1,
              },
            }}
            onReady={(event) => {
              playerRef.current = event.target;
            }}
          />
        </div>
      </div>
      <button onClick={handleToggleMute} className="absolute bottom-4 left-4 text-white">
        Toggle Mute
      </button>
    </div>
  );
};

export default VideoPlayer;
