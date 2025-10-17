"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Maximize,
  Minimize,
} from "lucide-react";

export default function NetflixPlayer({ src }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [skipDirection, setSkipDirection] = useState(null); // 👈 for 10s overlay
  const hideTimeout = useRef(null);

  // --- Load HLS stream and Auto-play/Set initial state ---
  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (!src || typeof src !== "string" || !src.trim() || !video) return;

    // ✅ FIX 1: Initial progress and time ko 0 par set karo.
    // Progress bar ki flickering iss wajah se hoti hai, ki jab video load
    // ho rahi hoti hai toh component pehle render ho jata hai aur progress
    // ko 0 par lock karna zaroori hai.
    setProgress(0);
    setCurrentTime(0);

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    const handleEnded = () => setIsPlaying(false);

    const handleLoaded = () => {
      // Set duration
      setDuration(video.duration);
      // Ensure the video starts at the very beginning
      video.currentTime = 0;
    };

    const attemptAutoPlay = async () => {
      // Autoplay logic (No change)
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        // If autoplay fails (e.g., due to browser policy)
        console.log("Autoplay failed:", error);
        setIsPlaying(false);
      }
    };
    
    // Event listeners
    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("canplay", attemptAutoPlay, { once: true });
    video.addEventListener("ended", handleEnded);

    return () => {
      if (hls) hls.destroy();
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("canplay", attemptAutoPlay);
    };
  }, [src]);
  
  // --- Auto-hide controls (No change) ---
  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", resetHideTimer);
    container.addEventListener("click", resetHideTimer);
    resetHideTimer();

    return () => {
      clearTimeout(hideTimeout.current);
      container.removeEventListener("mousemove", resetHideTimer);
      container.removeEventListener("click", resetHideTimer);
    };
  }, []);

  // --- Controls ---
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const showSkipOverlay = (dir) => {
    setSkipDirection(dir);
    setTimeout(() => setSkipDirection(null), 800); // show for 0.8s
  };

  const skipTime = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
    showSkipOverlay(seconds > 0 ? "forward" : "backward");
  };

  const handleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolume = (e) => {
    const newVolume = e.target.value;
    const video = videoRef.current;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return; // ✅ FIX 2: Added duration check

    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
    // Sync isPlaying state
    if (video.paused && isPlaying) setIsPlaying(false);
    if (!video.paused && !isPlaying) setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(newProgress);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "00:00";
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    } else {
      return `${mins} min ${secs < 10 ? "0" + secs : secs} sec`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[900px] aspect-video bg-black rounded-2xl m-5 overflow-hidden group select-none"
    >
      {/* --- Video --- */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        onTimeUpdate={handleTimeUpdate}
        playsInline
      />

      {/* --- Netflix-style skip overlays --- */}
      {skipDirection === "backward" && (
        <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center text-white animate-skip">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <Rewind size={40} className="cursor-pointer" />
          </div>
          <span className="text-lg font-semibold mt-1">10s</span>
        </div>
      )}
      {skipDirection === "forward" && (
        <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center text-white animate-skip">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <FastForward size={40} className="cursor-pointer" />
          </div>
          <span className="text-lg font-semibold mt-1">10s</span>
        </div>
      )}

      {/* --- Center Play Overlay --- */}
      {videoRef.current?.paused && showControls && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex justify-center items-center bg-black/30 hover:bg-black/50 transition"
        >
          <Play size={60} className="text-white opacity-80 cursor-pointer" />
        </button>
      )}

      {/* --- Bottom Controls --- */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3 transition-opacity duration-500 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-full accent-red-600 cursor-pointer"
        />

        {/* Bottom bar */}
        <div className="flex justify-between items-center text-white text-sm">
          <div className="flex items-center gap-5">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="hover:text-red-500 transition"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>

            {/* Rewind / Forward */}
            <button
              onClick={() => skipTime(-10)}
              className="hover:text-red-500 transition"
            >
              <Rewind size={22} className="cursor-pointer" />
            </button>
            <button
              onClick={() => skipTime(10)}
              className="hover:text-red-500 transition"
            >
              <FastForward size={22} className="cursor-pointer" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol relative">
              <button
                onClick={handleMute}
                className="hover:text-red-500 transition"
              >
                {isMuted ? (
                  <VolumeX size={22} className="cursor-pointer" />
                ) : (
                  <Volume2 size={22} className="cursor-pointer" />
                )}
              </button>

              {/* Hover volume slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolume}
                className="w-20 accent-red-600 cursor-pointer hidden group-hover/vol:block transition"
              />
            </div>

            {/* Time */}
            <span className="ml-2 text-gray-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hover:text-red-500 transition"
          >
            {isFullscreen ? (
              <Minimize size={22} className="cursor-pointer" />
            ) : (
              <Maximize size={22} className="cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* --- CSS animation for skip overlay (No change) --- */}
      <style jsx>{`
        @keyframes skipAnim {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.6);
          }
        }
        .animate-skip {
          animation: skipAnim 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}