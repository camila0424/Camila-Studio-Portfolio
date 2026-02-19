import { motion } from "framer-motion";

interface Tech {
    name: string;
    icon: string;
}

export interface Project {
    title: string;
    desc: string;
    image: string;
    techIcons: Tech[];
    github: string | null;
    demo?: string | null;
}

interface Props {
    project: Project;
    isActive: boolean;
}

function ProjectCard({ project, isActive }: Props) {
    return (
        <motion.div className="relative flex items-center justify-center" whileHover={isActive ? { scale: 1.05 } : {}}>
            <div
                className={`
                    ${isActive ? "w-60 h-80 md:w-80 md:h-80" : "w-50 h-50 md:w-60 md:h-60"}
                    relative rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.3)]
                    border border-white/50 bg-gray-900 transition-all duration-500
                `}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition duration-500 ${!isActive ? "opacity-50" : "opacity-100"}`}
                />

                {/* Título para los NO activos */}
                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <h3 className="text-white text-center text-sm md:text-base font-bold px-4 drop-shadow-lg italic">
                            {project.title}
                        </h3>
                    </div>
                )}

                {/* Overlay Activo: Hover en PC / Touch en Mobile */}
                {isActive && (
                    <div className="absolute inset-0 bg-blue-900/90 flex flex-col items-center justify-center text-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{project.title}</h3>

                        {/* ICONOS DE TECNOLOGÍA */}
                        <div className="flex gap-3 mb-6 flex-wrap justify-center">
                            {project.techIcons.map((tech, index) => (
                                <div key={index} className="relative group">
                                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 md:w-8 md:h-8 object-contain hover:scale-125 transition-transform" />
                                    {/* TOOLTIP */}
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] md:text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/20">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition">
                                    Código
                                </a>
                            )}
                            {project.demo && (
                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-600 transition">
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default ProjectCard;