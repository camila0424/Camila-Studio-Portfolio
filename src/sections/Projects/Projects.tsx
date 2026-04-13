import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import ProjectCarousel from "./ProjectCarousel";

function Projects() {
    const title = "Mis Proyectos";
    const controls = useAnimation();
    const subtitleControls = useAnimation();
    const ref = useRef(null);

    const isInView = useInView(ref, {
        margin: "-100px 0px",
    });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
            subtitleControls.start("visible");
        } else {
            controls.start("hidden");
            subtitleControls.start("hidden");
        }
    }, [isInView, controls, subtitleControls]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            y: -40,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const subtitleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.4 },
        },
    };

    return (
        <section
            ref={ref}
            id="projects"
            className="relative w-full min-h-100% flex items-center justify-center overflow-hidden py-10 md:py-20"
        >
            {/* FONDO CON DEGRADADO DIFUMINADO */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-white" />
                <div
                    className="absolute inset-0 opacity-70 md:opacity-90"
                    style={{
                        background: `linear-gradient(to bottom, 
        rgba(255, 255, 255, 0.5) 0%, 
        rgba(191, 219, 254, 0.6) 40%, 
        rgba(59, 130, 246, 0.9) 100%)`,
                    }}
                />
            </div>

            <div className="relative z-20 w-full flex flex-col items-center px-4">
                {/* TÍTULO */}
                <motion.h2
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="flex flex-wrap justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-3 md:mb-4"
                >
                    {title.split("").map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h2>

                {/* SUBTÍTULO */}
                <motion.p
                    initial="hidden"
                    animate={subtitleControls}
                    variants={subtitleVariants}
                    className="text-sm sm:text-base text-blue-800/70 mb-8 md:mb-12 tracking-wide"
                >
                    Pincha encima de cada proyecto para ver más información
                </motion.p>

                {/* CONTENEDOR DEL CARRUSEL */}
                <div className="w-full max-w-full flex justify-center">
                    <ProjectCarousel />
                </div>
            </div>
        </section>
    );
}

export default Projects;