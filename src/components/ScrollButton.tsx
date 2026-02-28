import React from "react";

interface ScrollButtonProps {
  targetId: string;      // id de la sección a la que quiero ir
  label: string;         // texto del botón
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ targetId, label }) => {
  const handleScroll = () => {
    const section = document.getElementById(targetId);

    if (section) {
      const yOffset = -80; // Ajusta según altura del header fixed
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="px-10 py-3 bg-blue-900 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-transform duration-300 hover:scale-105"
    >
      {label}
    </button>
  );
};

export default ScrollButton;
