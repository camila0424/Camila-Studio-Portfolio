import { useState } from "react";
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
    const [showOverlay, setShowOverlay] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Resetear estados si la card deja de ser activa
    if (!isActive && (showOverlay || isExpanded)) {
        setShowOverlay(false);
        setIsExpanded(false);
    }

    return (
        <motion.div
            layout
            className="relative flex items-center justify-center w-full group"
            animate={isActive ? { scale: 1 } : { scale: 0.9 }}
            style={{ zIndex: isExpanded ? 50 : 20 }}
            // Reactiva el toggle para móviles
            onClick={() => isActive && !isExpanded && setShowOverlay(!showOverlay)}
        >
            <motion.div
                layout
                className={`
                    relative overflow-hidden transition-all duration-500 ease-out bg-gray-900
                    rounded-4xl border border-white/20
                    ${isActive
                        ? `z-20 ${
                            isExpanded 
                                ? "w-[92vw] md:w-150 h-fit min-h-112.5" 
                                : "w-70 h-85 md:w-87.5 md:h-76.5"
                          }`
                        : "w-50 h-60 md:w-65 md:h-57.5 z-10 opacity-90 blur-[1px]"
                    }
                `}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover absolute inset-0"
                    style={{ 
                        opacity: (isActive && (showOverlay || isExpanded)) ? 0.15 : 1,
                        transition: 'opacity 0.5s'
                    }}
                />

                <div
                    className={`
                        absolute inset-0 bg-slate-950/90 backdrop-blur-md
                        transition-all duration-400 p-6 flex flex-col
                        ${isActive && (showOverlay || isExpanded) ? "opacity-100" : "opacity-0 pointer-events-none"}
                        ${isActive ? "md:group-hover:opacity-100 md:group-hover:pointer-events-auto" : ""}
                    `}
                    onMouseLeave={() => !isExpanded && setShowOverlay(false)}
                >
                    <motion.div 
                        layout 
                        className={`flex flex-col h-full ${isExpanded ? "md:flex-row md:items-start md:text-left gap-6" : "items-center text-center justify-center"}`}
                    >
                        {/* SECCIÓN IZQUIERDA: Título y Tecnologías */}
                        <div className={`${isExpanded ? "md:w-2/5 flex flex-col shrink-0" : "w-full"}`}>
                            <h3 className="text-white text-xl md:text-2xl font-black mb-3 uppercase tracking-tighter">
                                {project.title}
                            </h3>
                            
                            <div className={`flex gap-2 mb-4 flex-wrap ${isExpanded ? "md:justify-start" : "justify-center"}`}>
                                {project.techIcons.map((tech: Tech, index: number) => (
                                    <div key={index} className="bg-white/10 p-1.5 rounded-lg border border-white/10 flex items-center justify-center">
                                        <img src={tech.icon} alt={tech.name} className="w-5 h-5 object-contain" title={tech.name} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECCIÓN DERECHA: Descripción y Botones */}
                        <div className="flex-1 flex flex-col justify-between h-full min-h-0">
                            <motion.div layout="position" className="overflow-y-auto pr-1 custom-scrollbar">
                                <p className={`text-gray-300 text-xs md:text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-4"}`}>
                                    {project.desc}
                                </p>
                                
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que el overlay se cierre
                                        setIsExpanded(!isExpanded);
                                    }}
                                    className="text-blue-400 font-bold mt-2 text-[10px] uppercase tracking-widest hover:text-blue-300 cursor-pointer block"
                                >
                                    {isExpanded ? "Ver menos ▲" : "Ver más ▼"}
                                </button>
                            </motion.div>

                            <div className={`flex flex-col sm:flex-row gap-3 w-full mt-4 ${isExpanded ? "md:justify-end" : ""}`}>
                                {project.github && (
                                    <a href={project.github} target="_blank" className="bg-white text-black py-2 px-4 rounded-xl text-xs font-black uppercase text-center flex-1 md:flex-none md:min-w-28 hover:bg-gray-200 transition-colors" onClick={(e) => e.stopPropagation()}>
                                        Código
                                    </a>
                                )}
                                {project.demo && (
                                    <a href={project.demo} target="_blank" className="bg-blue-600 text-white py-2 px-4 rounded-xl text-xs font-black uppercase text-center flex-1 md:flex-none md:min-w-28 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20" onClick={(e) => e.stopPropagation()}>
                                        Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default ProjectCard;