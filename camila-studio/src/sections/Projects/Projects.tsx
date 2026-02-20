import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import ProjectCarousel from "./ProjectCarousel";

function Projects() {
    const title = "Mis Proyectos";
    const controls = useAnimation();
    const ref = useRef(null);

    const isInView = useInView(ref, {
        margin: "-100px 0px",
    });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

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

    return (
        <section
            ref={ref}
            id="projects"
            className="relative w-full min-h-100% flex items-center justify-center overflow-hidden py-10 md:py-20"
        >
            {/* FONDO CON DEGRADADO DIFUMINADO */}
            <div className="absolute inset-0 z-0">
                {/* Capa base blanca */}
                <div className="absolute inset-0 bg-white" />

                {/* Capa de degradado azul con difuminado (radial + linear) */}
                <div
                    className="absolute inset-0 opacity-40 md:opacity-60"
                    style={{
                        background: `linear-gradient(to bottom, 
                            rgba(255, 255, 255, 1) 0%, 
                            rgba(219, 234, 254, 0.5) 40%, 
                            rgba(30, 58, 138, 0.8) 100%)`
                    }}
                />
                {/* Efecto de orbe difuminado inferior para suavizar el final */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-blue-900/20 blur-[120px] rounded-[100%]" />
            </div>

            <div className="relative z-20 w-full flex flex-col items-center px-4">
                {/* TÍTULO RESPONSIVE */}
                <motion.h2
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="flex flex-wrap justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-8 md:mb-12"
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

                {/* CONTENEDOR DEL CARRUSEL */}
                <div className="w-full max-w-full flex justify-center">
                    <ProjectCarousel />
                </div>
            </div>
        </section>
    );
}

export default Projects;