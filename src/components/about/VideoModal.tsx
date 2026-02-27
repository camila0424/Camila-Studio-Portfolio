
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoControls from "./VideoControls";
import type { RefObject } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

const VideoModal = ({ isOpen, onClose, videoSrc }: Props) => {
    const videoRef: RefObject<HTMLVideoElement | null> = useRef<HTMLVideoElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const esc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", esc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", esc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const video = videoRef.current;
        if (isOpen && video) {
            void video.play();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-5xl rounded-2xl bg-black overflow-hidden shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 text-white text-2xl hover:scale-110 transition"
                        >
                            ✕
                        </button>

                        {/* Video */}
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            preload="none"
                            onCanPlay={() => setIsReady(true)}
                            className="w-full max-h-[90vh] object-contain cursor-pointer"
                            onClick={() => {
                                const video = videoRef.current;
                                if (!video) return;
                                if (video.paused) {
                                    void video.play();
                                } else {
                                    video.pause();
                                }
                            }}
                        />

                        {/* Controles debajo del video */}
                        {isReady && <VideoControls videoRef={videoRef} />}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoModal;