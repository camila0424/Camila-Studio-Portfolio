import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import VideoModal from "../components/about/VideoModal";
import AvatarImg from "../assets/Avatar/Avatar1.png";

const AboutMe = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);

    // once: false → se dispara cada vez que entra/sale del viewport
    const isInView = useInView(ref, { margin: "-80px 0px", once: false });

    useEffect(() => {
        if (isInView) controls.start("visible");
        else controls.start("hidden");
    }, [isInView, controls]);

    // Avatar: pequeño→grande al entrar, grande→pequeño al salir
    const avatarVariants: Variants = {
        hidden: {
            scale: 0,
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 18,
                duration: 0.9,
            },
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 14,
                duration: 1.1,
            },
        },
    };

    // Texto: desliza desde la derecha, más lento con delay al entrar; se desliza hacia la derecha al salir
    const textVariants: Variants = {
        hidden: {
            opacity: 0,
            x: 60,
            transition: { duration: 0.7, ease: "easeIn" },
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.1, ease: "easeOut", delay: 0.3 },
        },
    };




    return (
        <section
            ref={ref}
            id="about-me"
            className="relative w-full flex items-center justify-center overflow-hidden
                       py-10 px-4
                       sm:py-20 sm:px-6
                       md:px-10
                       min-h-screen"
        >
            {/* ── FONDO ── */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-white" />
                <div
                    className="absolute inset-0 opacity-75 md:opacity-90"
                    style={{
                        background: `linear-gradient(to bottom,
                            rgba(59,130,246,0.92) 0%,
                            rgba(191,219,254,0.65) 42%,
                            rgba(255,255,255,0.55) 100%)`,
                    }}
                />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-blue-700/30 blur-[120px] rounded-[100%]" />
            </div>

            {/* ── CONTENEDOR PRINCIPAL ── */}
            <div
                className="relative z-20 max-w-5xl w-full
                            flex flex-col items-center gap-10
                            md:flex-row md:items-center md:gap-16
                            px-2 sm:px-4 md:px-10"
            >
                {/* ── AVATAR ── */}
                <motion.div
                    className="shrink-0"
                    variants={avatarVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <div className="relative">
                        {/* Anillo decorativo */}
                        <div className="absolute -inset-2 rounded-3xl bg-linear-to-br from-blue-400 via-blue-600 to-blue-900 opacity-60 blur-sm" />
                        <motion.img
                            src={AvatarImg}
                            alt="Avatar de perfil"
                            className="relative
                                       w-52 h-52
                                       sm:w-64 sm:h-64
                                       md:w-72 md:h-72
                                       lg:w-80 lg:h-80
                                       object-cover rounded-2xl shadow-2xl"
                        />

                    </div>
                </motion.div>

                {/* ── TEXTO ── */}
                <motion.div
                    className="flex flex-col items-center gap-5
                               text-center
                               md:items-start md:text-left"
                    variants={textVariants}
                    initial="hidden"
                    animate={controls}
                >


                    {/* Titular principal */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 leading-tight">
                        Convierto ideas en{" "}productos digitales
                        <span className="text-blue-700"> que funcionan.</span>{" "}

                    </h2>

                    {/* Descripción */}
                    <p className="text-base sm:text-lg text-blue-900/75 max-w-lg leading-relaxed">
                        Con  <strong>experiencia</strong> construyendo
                        aplicaciones web modernas, combino visión técnica y sensibilidad de
                        diseño para entregar soluciones que tus usuarios aman y tus métricas
                        agradecen.
                    </p>



                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-900 text-white font-bold
                                       px-8 py-4 rounded-xl
                                       hover:bg-blue-700 active:scale-95
                                       transition-all duration-200
                                       text-base sm:text-lg shadow-lg shadow-blue-900/30
                                       w-full sm:w-auto"
                        >
                            ▶ Ver mi historia
                        </button>
                        <a
                            href="#contact"
                            className="border-2 border-blue-900 text-blue-900 font-bold
                        px-8 py-4 rounded-xl
                        hover:bg-blue-900 hover:text-white
                        active:scale-95 transition-all duration-200
                        text-base sm:text-lg
                        text-center w-full sm:w-auto"
                        >
                            Contáctame
                        </a>
                    </div>
                </motion.div>
            </div >

            {/* Video Modal */}
            < VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoSrc="/videos/about-video.mp4"
            />
        </section >
    );
};

export default AboutMe;