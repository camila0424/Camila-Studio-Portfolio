import { useState, useRef } from "react";
import { motion } from "framer-motion";
import VideoModal from "./VideoModal";

interface Props {
    videoSrc: string;
    label?: string;
}

const AboutVideoTrigger = ({ videoSrc, label = "Play" }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <motion.button
                ref={buttonRef}
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="
          relative
          h-24 w-24
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          text-white
          font-medium
          shadow-2xl
          transition-all
        "
            >
                {label}
            </motion.button>

            <VideoModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                videoSrc={videoSrc}
            />
        </>
    );
};

export default AboutVideoTrigger;