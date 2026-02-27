import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import CamilaOriginal from '../assets/CamilaOriginal.png';
import ScrollButton from "../components/ScrollButton";

function Hero() {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { margin: "-80px 0px", once: false });

    useEffect(() => {
        if (isInView) controls.start("visible");
        else controls.start("hidden");
    }, [isInView, controls]);

    const imageVariants: Variants = {
        hidden: {
            scale: 0,
            opacity: 0,
            transition: { type: "spring", stiffness: 80, damping: 18, duration: 0.9 },
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 70, damping: 14, duration: 1.1 },
        },
    };

    const textVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -60,
            transition: { duration: 0.7, ease: "easeIn" },
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.1, ease: "easeOut", delay: 0.2 },
        },
    };

    const badgeVariants: Variants = {
        hidden: { opacity: 0, y: -12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: "easeOut", delay: 0.4 },
        },
    };

    const chipsContainer: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
    };
    const chipItem: Variants = {
        hidden: { opacity: 0, scale: 0.7 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 16 },
        },
    };

    const chips = ["React", "TypeScript", "Tailwind CSS", "Node.js", "IA integrada"];

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex items-center overflow-hidden scroll-mt-20"
        >
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/DegradeHorizontal.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-white" />

            {/* Contenido */}
            <div
                ref={ref}
                className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between
                           px-5 sm:px-8 md:px-12 w-full gap-8 md:gap-6
                           pt-28 pb-16 md:pt-28 md:pb-16"
            >
                {/* ── COLUMNA IZQUIERDA ── */}
                <motion.div
                    className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4"
                    variants={textVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 leading-snug">
                        Webs que{" "}
                        <span className="text-blue-700">enamoran</span> a tus clientes
                        <br className="hidden sm:block" />
                        {" "}y trabajan con{" "}
                        <span className="text-blue-700">IA</span>.
                    </h1>

                    <p className="text-sm sm:text-base text-blue-900/70 max-w-md leading-relaxed">
                        Diseño digital de vanguardia y <strong>automatización con IA.</strong> Creo herramientas inteligentes que escalan tu negocio mientras tú te enfocas en lo importante.
                    </p>

                    <motion.div
                        className="flex flex-wrap justify-center md:justify-start gap-2 my-5"
                        variants={chipsContainer}
                        initial="hidden"
                        animate={controls}
                    >
                        {chips.map((chip) => (
                            <motion.span
                                key={chip}
                                variants={chipItem}
                                className="bg-blue-100 text-blue-800 font-medium text-xs px-3 py-1.5 rounded-full border border-blue-200 shadow-sm"
                            >
                                {chip}
                            </motion.span>
                        ))}
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-1">
                        <ScrollButton
                            targetId="projects"
                            label="▶ Ver mis proyectos"
                        />
                        <a
                            href="#contact"
                            className="border-2 border-blue-900 text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-900 hover:text-white active:scale-95 transition-all duration-200 text-sm sm:text-base text-center w-full sm:w-auto"
                        >
                            Hablemos
                        </a>
                    </div>
                </motion.div>

                {/* ── COLUMNA DERECHA ── */}
                <motion.div
                    className="flex-1 flex justify-center md:justify-end"
                    variants={imageVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <div className="relative w-56 sm:w-72 md:w-80 lg:w-96">
                        <div className="absolute -inset-2 rounded-3xl bg-linear-to-br from-blue-400 via-blue-800 to-blue-900 opacity-50 blur-sm" />
                        <img
                            src={CamilaOriginal}
                            alt="Camila Bedoya desarrolladora web"
                            className="relative rounded-3xl shadow-2xl w-full h-auto object-cover md:mt-8 transition-transform duration-300 hover:scale-105"
                        />
                        <motion.span
                            variants={badgeVariants}
                            initial="hidden"
                            animate={controls}
                            className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap tracking-wide"
                        >
                            ✦ Disponible para proyectos
                        </motion.span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;