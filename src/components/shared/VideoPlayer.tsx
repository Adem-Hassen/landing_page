import React, { useState, useRef } from 'react';
import '../../styles/VideoPlayer.css';

interface VideoPlayerProps {
  videoUrl: string;
  /** YouTube only: poster shown until the user clicks play (the iframe loads only then). */
  poster?: string;
  posterSrcSet?: string;
}

// Opens connections to YouTube once, when the user shows intent to play.
let youtubeWarmedUp = false;
const warmUpYouTube = () => {
  if (youtubeWarmedUp) return;
  youtubeWarmedUp = true;
  for (const href of ['https://www.youtube.com', 'https://www.google.com', 'https://i.ytimg.com']) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.appendChild(link);
  }
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, poster, posterSrcSet }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubeActive, setYoutubeActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Check if it's a YouTube URL
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  
  // Extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  if (isYouTube) {
    const youtubeId = getYouTubeId(videoUrl);
    const showFacade = !!poster && !youtubeActive;
    return (
      <div className="video-player-container large-video">
        <div className="video-wrapper">
          {showFacade ? (
            <button
              type="button"
              className="youtube-facade"
              aria-label="تشغيل الفيديو"
              onClick={() => setYoutubeActive(true)}
              onPointerEnter={warmUpYouTube}
              onFocus={warmUpYouTube}
            >
              <img
                src={poster}
                srcSet={posterSrcSet}
                sizes="(min-width: 768px) min(85vw, 1040px), 100vw"
                alt=""
                width={1280}
                height={720}
                className="youtube-facade__poster"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <span className="youtube-facade__play" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="68" height="48">
                  <path
                    className="youtube-facade__play-bg"
                    d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                  />
                  <path d="M45 24 27 14v20" fill="#fff" />
                </svg>
              </span>
            </button>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0${youtubeActive ? '&autoplay=1' : ''}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-iframe large-iframe"
            ></iframe>
          )}
        </div>
      </div>
    );
  }

  // Regular video player for MP4/WebM
  return (
    <div className="video-player-container large-video">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element large-video-element"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {isLoading && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <span>جاري تحميل الفيديو...</span>
          </div>
        )}

        <div className="video-controls">
          <button className="control-btn play-pause-btn" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span> / </span>
            <span>{formatTime(duration)}</span>
          </div>

          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
          />

          <button 
            className="control-btn fullscreen-btn"
            onClick={() => videoRef.current?.requestFullscreen()}
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
