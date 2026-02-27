import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import CamilaOriginal from '../assets/CamilaOriginal.png';
import ScrollButton from "../components/ScrollButton";

function Hero() {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { margin: "-80px 0px", once: false });

    // ───── MOBILE IMAGE CONTROL ─────
    const imageRef = useRef<HTMLDivElement | null>(null);
    const imageInView = useInView(imageRef, {
        margin: "0px 0px -120px 0px",
        once: false,
    });
    const imageControls = useAnimation();

    useEffect(() => {
        if (isInView) controls.start("visible");
        else controls.start("hidden");
    }, [isInView, controls]);


    useEffect(() => {
        if (imageInView) {
            imageControls.start("visible");
        } else {
            imageControls.start("hidden");
        }
    }, [imageInView, imageControls]);

    // ───── VARIANTS ─────

    const fadeInUpVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 120,
            scale: 0.9,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const textVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const chipsContainer: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
            },
        },
    };

    const chipItem: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    const chips = ["React", "TypeScript", "Tailwind CSS", "Node.js", "IA Integrada"];

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex items-center overflow-hidden scroll-mt-20 bg-white"
        >
            {/* Overlay fondo elegante */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-white to-transparent" />

            <div
                ref={ref}
                className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between
                           px-5 sm:px-8 md:px-12 w-full gap-8 md:gap-12
                           pt-28 pb-16 md:pt-26 md:pb-18"
            >
                {/* ───── TEXTO ───── */}
                <motion.div
                    className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-5"
                    variants={textVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <h1 className="text-4xl sm:text-4xl lg:text-5xl font-black text-blue-950 leading-tight tracking-tight">
                        Interfaces de <span className="text-blue-700">alto impacto</span> <br />
                        potenciadas con <span className="text-blue-700">IA</span>.
                    </h1>

                    <p className="text-base sm:text-lg text-blue-900/75 max-w-md leading-relaxed">
                        Transformo visiones en productos digitales escalables, combinando alto rendimiento y <strong>automatización inteligente</strong> para maximizar resultados.
                    </p>

                    <motion.div
                        className="flex flex-wrap justify-center md:justify-start gap-2 my-2"
                        variants={chipsContainer}
                        initial="hidden"
                        animate={controls}
                    >
                        {chips.map((chip) => (
                            <motion.span
                                key={chip}
                                variants={chipItem}
                                className="bg-blue-50 text-blue-700 font-semibold text-xs px-3 py-1.5 rounded-full border border-blue-100 shadow-sm"
                            >
                                {chip}
                            </motion.span>
                        ))}
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                        <ScrollButton targetId="projects" label="▶ Explorar Proyectos" />
                        <a
                            href="#contact"
                            className="border-2 border-blue-900 text-blue-900 font-bold px-8 py-3 rounded-xl 
                                       hover:bg-blue-900 hover:text-white active:scale-95 transition-all duration-300 
                                       text-sm sm:text-base text-center w-full sm:w-auto"
                        >
                            Hablemos
                        </a>
                    </div>

                    {/* ───── MOBILE IMAGE ───── */}
                    <div ref={imageRef} className="w-full flex justify-center mt-12 md:hidden">
                        <motion.div
                            className="relative w-64 sm:w-80"
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate={imageControls}
                        >
                            <div className="absolute -inset-3 rounded-4xl bg-linear-to-br from-blue-300 to-blue-900 opacity-40 blur-md" />
                            <img
                                src={CamilaOriginal}
                                alt="Camila Bedoya"
                                className="relative rounded-4xl shadow-2xl w-full h-auto object-cover"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* ───── DESKTOP IMAGE ───── */}
                <motion.div
                    className="hidden md:flex flex-1 justify-end"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <div className="relative lg:w-100">
                        <div className="absolute -inset-4 rounded-4xl bg-linear-to-tr from-blue-400/20 to-blue-800/10 opacity-30 blur-2xl" />
                        <img
                            src={CamilaOriginal}
                            alt="Camila Bedoya"
                            className="relative rounded-4xl shadow-2xl w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;