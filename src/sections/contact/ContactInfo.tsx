import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const ContactInfo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-8 text-white"
        >
            {/* Título */}
            <div>
                <h2 className="text-4xl font-black leading-tight">
                    Construyamos algo
                    <span className="block bg-linear-to-r from-blue-300 to-cyan-200 bg-clip-text text-transparent">
                        extraordinario
                    </span>
                </h2>

                <p className="mt-4 text-blue-100/80 text-lg">
                    Construyo productos digitales que funcionan — y que se notan.
                    Disponible para proyectos freelance y posiciones remotas como{" "}
                    <strong>Full Stack Developer</strong>.
                </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-5 text-blue-100/80">

                <a
                    href="mailto:milabs.esp24@gmail.com"
                    className="flex items-center gap-3 hover:text-white transition-all duration-300"
                >
                    <Mail size={20} />
                    milabs.esp24@gmail.com
                </a>

                <a
                    href="https://www.linkedin.com/in/camila-bedoya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-white transition-all duration-300"
                >
                    <Linkedin size={20} />
                    LinkedIn
                </a>

                <a
                    href="https://github.com/camila0424"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-white transition-all duration-300"
                >
                    <Github size={20} />
                    GitHub
                </a>

            </div>
        </motion.div>
    );
};

export default ContactInfo;