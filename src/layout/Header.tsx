import { useState, useEffect } from "react";
import LogoLetras from "../assets/LogoLetras2.png";
import VideoModal from "../components/about/VideoModal";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const smoothScroll = (id: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navItems = [
        { id: "hero", name: "Inicio" },
        { id: "projects", name: "Proyectos" },
        { id: "about-me", name: "Sobre mí", isVideo: true },
        { id: "skills", name: "Skills" },
        { id: "contact", name: "Contacto" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-sm border-b border-gray-100 h-16 mb-4">
                <nav className="max-w-7xl mx-auto flex items-center justify-between h-full px-6 md:px-10">
                    {/* Logo */}
                    <div
                        className="flex items-center cursor-pointer ml-5"
                        onClick={() => smoothScroll("hero")}
                    >
                        <img
                            src={LogoLetras}
                            alt="Camila Bedoya Logo"
                            className="w-auto h-12 md:h-12 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Menú Desktop */}
                    <ul className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() =>
                                        item.isVideo ? setIsVideoOpen(true) : smoothScroll(item.id)
                                    }
                                    className="text-sm font-semibold text-blue-900 hover:text-blue-800 transition-colors duration-300 relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-800 transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Botón Mobile */}
                    <button
                        className="md:hidden p-2 text-blue-900 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Menú Mobile desplegable */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden animate-in fade-in slide-in-from-top-2">
                        <ul className="flex flex-col py-4">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() =>
                                            item.isVideo ? setIsVideoOpen(true) : smoothScroll(item.id)
                                        }
                                        className="w-full text-left px-8 py-4 text-blue-900 font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </header>

            {/* Modal Video */}
            <VideoModal
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                videoSrc="/videos/about-video.mp4"
            />
        </>
    );
}

export default Header;