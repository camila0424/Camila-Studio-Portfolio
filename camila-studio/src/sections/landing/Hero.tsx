import CamilaOriginal from '../../assets/CamilaOriginal.png';

function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden">

            {/* 🎥 Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/DegradeHorizontal.mp4" type="video/mp4" />
            </video>

            {/* 🔵 Overlay suave + difuminado inferior */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]"></div>

            {/* 🔻 Fade inferior elegante */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-b from-transparent to-white"></div>

            {/* Contenido */}
            <div
                className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 w-full"
                id="hero"
            >

                {/* Columna izquierda */}
                <div className="flex-1 text-center md:text-left mb-12 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 leading-tight">
                        Desarrollo de páginas web modernas y funcionales
                    </h1>

                    <h3 className="text-lg md:text-xl text-blue-800/95 mb-12">
                        Transforma tu visión en una experiencia digital excepcional
                    </h3>

                    <button className="px-10 py-3 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-transform duration-300 hover:scale-105">
                        Ver mis proyectos
                    </button>
                </div>

                {/* Columna derecha */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="w-72 md:w-96">
                        <img
                            src={CamilaOriginal}
                            alt="Camila Bedoya desarrolladora web"
                            className="rounded-3xl shadow-xl w-full h-auto object-cover md:mt-8 transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;

