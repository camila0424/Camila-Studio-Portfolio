import { motion } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";


function Projects() {
    const title = "Mis Proyectos";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section
            id="projects"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white py-3 "
        >
            <div className="relative z-20 w-full flex flex-col items-center">

                <motion.h2
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.8 }}
                    className="flex text-4xl md:text-4xl font-bold text-blue-900 mb-3"
                >
                    {title.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h2>

                <ProjectCarousel />
            </div>
        </section>
    );
}

export default Projects;