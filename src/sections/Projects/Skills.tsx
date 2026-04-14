import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../../data/skillsData";
import type { SkillCategory, Tool } from "../../data/skillsData";

const Skills = () => {
    const [openCategory, setOpenCategory] = useState<SkillCategory | null>(null);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

    return (
        <section id="skills" className="relative py-32 px-6 bg-linear-to-b from-blue-950 via-blue-900 to-blue-950">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-bold mb-6 text-white">Skills</h2>
                <p className="text-lg text-white/60 mb-16 tracking-wide">
                    Pincha encima de cada categoría para ver las tecnologías
                </p>

                {/* Grid de categorías */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skillCategories.map((category) => (
                        <motion.button
                            key={category.title}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-8 rounded-3xl bg-linear-to-r ${category.color} text-white font-bold text-lg hover:brightness-110 transition`}
                            onClick={() => {
                                setOpenCategory(category);
                                setSelectedTool(null);
                            }}
                        >
                            {category.title}
                            <p className="mt-2 text-sm text-white/80">Clic para ver tecnologías</p>
                        </motion.button>
                    ))}
                </div>

                {/* Modal */}
                {openCategory && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-4xl p-8 max-w-6xl w-lvh h-[60vh] flex flex-col md:flex-row relative text-white"
                        >
                            <button
                                className="absolute top-4 right-4 text-white font-bold text-xl"
                                onClick={() => setOpenCategory(null)}
                            >
                                X
                            </button>

                            {/* Hint superior */}
                            <p className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-wide whitespace-nowrap">
                                Pincha sobre cada tech para más info
                            </p>

                            {/* Contenedor izquierdo: lista de tecnologías */}
                            <div className="flex-1 flex flex-col overflow-hidden pr-4 border-r border-white/20 mt-6">
                                <ul className="flex flex-col gap-3 overflow-y-auto h-full custom-scrollbar">
                                    {openCategory.tools.map((tool) => (
                                        <li key={tool.name}>
                                            <button
                                                className={`w-full text-left p-3 rounded-2xl hover:bg-white/20 transition ${selectedTool?.name === tool.name ? "bg-white/20" : ""}`}
                                                onClick={() => setSelectedTool(tool)}
                                            >
                                                {tool.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contenedor derecho: definición */}
                            {selectedTool && (
                                <div className="flex-1 ml-6 p-4 bg-white/10 border border-white/20 rounded-2xl overflow-y-auto h-full mt-6">
                                    <h4 className="font-bold text-lg mb-2">{selectedTool.name}</h4>
                                    <p className="text-white/80">{selectedTool.desc}</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;