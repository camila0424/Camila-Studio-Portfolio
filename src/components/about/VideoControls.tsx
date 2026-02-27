
import { useState } from "react";
import type { RefObject } from "react";

interface Props {
    videoRef: RefObject<HTMLVideoElement | null>;
}

const VideoControls = ({ videoRef }: Props) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(1);
    const [speed, setSpeed] = useState(1);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            void video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const changeVolume = (v: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.volume = v;
        setVolume(v);
    };

    const changeSpeed = (s: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.playbackRate = s;
        setSpeed(s);
    };

    return (
        <div className="absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-md px-4 py-2 flex items-center justify-between space-x-4">
            {/* Volumen con icono */}
            <div className="flex items-center space-x-2">
                <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 9v6h4l5 5V4L7 9H3z" />
                </svg>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                    className="w-20 h-1 appearance-none bg-white/50 accent-white cursor-pointer"
                />
            </div>

            {/* Play / Pause */}
            <button
                onClick={togglePlay}
                className="text-white p-2 hover:bg-white/20 rounded-full transition"
            >
                {isPlaying ? (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                    </svg>
                ) : (
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <polygon points="5,3 19,12 5,21" />
                    </svg>
                )}
            </button>

            {/* Selector de velocidad */}
            <select
                value={speed}
                onChange={(e) => changeSpeed(Number(e.target.value))}
                className="bg-black text-white text-sm border border-white/30 rounded px-2 py-1"
            >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
            </select>
        </div>
    );
};

export default VideoControls;