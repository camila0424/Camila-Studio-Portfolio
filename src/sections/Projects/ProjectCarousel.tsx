import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import type { Project } from "../../components/ProjectCard";
import projectsData from "../../data/projects.json";

// Interfaz para las variantes dinámicas de scroll-----------------------------------------------------------------
interface ScrollProps {
    scrollDirection: "up" | "down";
    delay: number;
}

function ProjectCarousel() {
    const [[currentIndex, direction], setIndex] = useState([0, 0]);
    const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
    const length = projectsData.length;

    const paginate = (newDirection: number) => {
        const nextIndex = (currentIndex + newDirection + length) % length;
        setIndex([nextIndex, newDirection]);
    };

    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;

    // --- Lógica de Scroll y Visibilidad ------------------------------------
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const isInView = useInView(containerRef, { margin: "-100px 0px", once: false });

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollDir(currentScrollY > lastScrollY.current ? "down" : "up");
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    // --- VARIANTES CORREGIDAS --------------------------------------------------------------

    // 1. Variantes de entrada (Vertical por Scroll)
    const scrollEntryVariants: Variants = {
        hidden: ({ scrollDirection }: ScrollProps) => ({
            y: scrollDirection === "down" ? 120 : -120,
            opacity: 0,
        }),
        visible: ({ delay }: ScrollProps) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // 2. Variantes del Carrusel Central (Horizontal)

    const centerSlideVariants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 400 : -400,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring" as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
            },
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 400 : -400,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.25 },
        }),
    };

    // 3. Variantes de los Cards Laterales
    const sideSlideVariants: Variants = {
        enter: { opacity: 0, scale: 0.6 },
        center: {
            opacity: 0.4,
            scale: 0.7,
            transition: { duration: 0.4 },
        },
        exit: { opacity: 0, scale: 0.6, transition: { duration: 0.25 } },
    };

    return (
        <div ref={containerRef} className="flex flex-col items-center w-full px-4 overflow-hidden">
            <div className="relative flex items-center justify-center w-full max-w-7xl min-h-80 md:min-h-80">

                {/* Botón Izquierdo */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-0 md:left-4 z-50 text-6xl md:text-8xl text-blue-900/30 hover:text-blue-900 transition-all select-none cursor-pointer"
                >
                    ‹
                </button>

                <div className="flex items-center justify-center gap-4 md:gap-12 lg:gap-20 w-full">

                    {/* CARD IZQUIERDO */}
                    <motion.div
                        custom={{ scrollDirection: scrollDir, delay: 0.2 }}
                        variants={scrollEntryVariants}
                        initial="hidden"
                        animate={controls}
                        className="hidden sm:block shrink-0 "
                    >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={`prev-${prevIndex}`}
                                variants={sideSlideVariants}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                onClick={() => paginate(-1)}
                                className="cursor-pointer filter blur-[1px]"
                            >
                                <ProjectCard project={projectsData[prevIndex] as Project} isActive={false} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>



                    {/* CARD CENTRAL */}
                    <motion.div
                        custom={{ scrollDirection: scrollDir, delay: 0 }}
                        variants={scrollEntryVariants}
                        initial="hidden"
                        animate={controls}
                        className="z-30 shrink-0"
                    >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={`center-${currentIndex}`}
                                variants={centerSlideVariants}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 50) paginate(-1);
                                    else if (info.offset.x < -50) paginate(1);
                                }}
                                className="cursor-default group"
                            >
                                <ProjectCard project={projectsData[currentIndex] as Project} isActive={true} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>



                    {/* CARD DERECHO */}
                    <motion.div
                        custom={{ scrollDirection: scrollDir, delay: 0.4 }}
                        variants={scrollEntryVariants}
                        initial="hidden"
                        animate={controls}
                        className="hidden sm:block shrink-0"
                    >
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={`next-${nextIndex}`}
                                variants={sideSlideVariants}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                onClick={() => paginate(1)}
                                className="cursor-pointer filter blur-[1px]"
                            >
                                <ProjectCard project={projectsData[nextIndex] as Project} isActive={false} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                </div>

                {/* Botón Derecho */}
                <button
                    onClick={() => paginate(1)}
                    className="absolute right-0 md:right-4 z-50 text-6xl md:text-8xl text-blue-900/30 hover:text-blue-900 transition-all select-none cursor-pointer"
                >
                    ›
                </button>
            </div>

            {/* BARRA DE CONTEO */}
            <div className="flex gap-3 mt-10">
                {projectsData.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex([i, i > currentIndex ? 1 : -1])}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex
                            ? "w-10 bg-blue-900"
                            : "w-2 bg-blue-200 hover:bg-blue-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProjectCarousel;