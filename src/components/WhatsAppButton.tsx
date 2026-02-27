import { motion } from "framer-motion";
import React from "react";

const WhatsAppButton: React.FC = () => {
    const phoneNumber: string = "34674716763";
    const message: string = "¡Hola! Quiero contactarte desde tu portafolio. Mi nombre es [Tu Nombre] y estoy interesado en tus servicios. ¿Podemos conversar?";

    return (
        <motion.a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 right-8 z-50 bg-green-500/90 hover:bg-green-600/90 backdrop-blur-md p-4 rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
            >
                <path d="M20.52 3.48A11.89 11.89 0 0012 0C5.372 0 0 5.372 0 12c0 2.113.552 4.089 1.514 5.82L0 24l6.36-1.49A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12 0-3.19-1.247-6.194-3.48-8.52zM12 22.08c-2.054 0-3.977-.638-5.544-1.71l-.396-.26-3.77.883.884-3.682-.263-.397A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2c2.675 0 5.177 1.042 7.07 2.93A9.934 9.934 0 0122 12c0 5.514-4.486 10-10 10zm5.52-7.5c-.274-.137-1.62-.797-1.87-.888-.25-.091-.432-.137-.614.137-.182.274-.7.888-.86 1.07-.16.182-.318.205-.592.068-.274-.137-1.157-.427-2.203-1.354-.815-.723-1.364-1.614-1.524-1.888-.16-.274-.017-.422.12-.56.123-.123.274-.318.411-.477.137-.16.182-.274.274-.456.091-.182.046-.342-.023-.48-.068-.137-.613-1.48-.84-2.03-.223-.532-.45-.46-.614-.47-.16-.008-.342-.01-.523-.01s-.48.068-.732.342c-.25.274-.957.935-.957 2.278s.98 2.637 1.117 2.818c.137.182 1.927 2.938 4.667 4.124.653.28 1.162.447 1.558.572.654.212 1.25.182 1.72.11.524-.082 1.62-.662 1.848-1.303.228-.642.228-1.192.16-1.303-.068-.111-.25-.182-.524-.32z" />
            </svg>
        </motion.a>
    );
};

export default WhatsAppButton;