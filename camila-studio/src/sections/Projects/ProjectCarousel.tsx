import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../../components/ProjectCard";
import type { Project } from "../../components/ProjectCard";
import projectsData from "../../data/projects.json";

function ProjectCarousel() {

    const [[currentIndex, direction], setIndex] = useState([0, 0]);
    const length = projectsData.length;

    const paginate = (newDirection: number) => {
        const nextIndex = (currentIndex + newDirection + length) % length;
        setIndex([nextIndex, newDirection]);
    };

    const prevIndex = (currentIndex - 1 + length) % length;
    const nextIndex = (currentIndex + 1) % length;


    const centerVariants = {
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

    // Variantes para los cards LATERALES (fade suave, sin slide)
    const sideVariants = {
        enter: { opacity: 0, scale: 0.6 },
        center: {
            opacity: 0.4,
            scale: 0.7,
            transition: { duration: 0.4 },
        },
        exit: { opacity: 0, scale: 0.6, transition: { duration: 0.25 } },
    };

    return (
        <div className="flex flex-col items-center w-full px-4">
            <div className="relative flex items-center justify-center w-full max-w-7xl min-h-80 md:min-h-100">

                {/* Botón Izquierdo */}
                <button
                    onClick={() => paginate(-1)}
                    className="absolute left-0 md:left-4 z-50 text-6xl md:text-8xl text-blue-900/30 hover:text-blue-900 transition-all select-none cursor-pointer"
                >
                    ‹
                </button>


                <div className="flex items-center justify-center gap-4 md:gap-12 lg:gap-20 w-full">

                    {/* Card IZQUIERDO — AnimatePresence independiente */}
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={`prev-${prevIndex}`}
                            variants={sideVariants}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            onClick={() => paginate(-1)}
                            className="cursor-pointer filter blur-[1px] hidden sm:block shrink-0"
                        >
                            <ProjectCard project={projectsData[prevIndex] as Project} isActive={false} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Card CENTRAL — AnimatePresence independiente con slide horizontal */}
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={`center-${currentIndex}`}
                            variants={centerVariants}
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
                            className="z-30 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] shrink-0"
                        >
                            <ProjectCard project={projectsData[currentIndex] as Project} isActive={true} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Card DERECHO — AnimatePresence independiente */}
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={`next-${nextIndex}`}
                            variants={sideVariants}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            onClick={() => paginate(1)}
                            className="cursor-pointer filter blur-[1px] hidden sm:block shrink-0"
                        >
                            <ProjectCard project={projectsData[nextIndex] as Project} isActive={false} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Botón Derecho */}
                <button
                    onClick={() => paginate(1)}
                    className="absolute right-0 md:right-4 z-50 text-6xl md:text-8xl text-blue-900/30 hover:text-blue-900 transition-all select-none cursor-pointer"
                >
                    ›
                </button>
            </div>

            {/* Dots indicadores */}
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