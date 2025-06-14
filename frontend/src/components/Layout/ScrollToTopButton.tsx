import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react'; // Importa el icono de flecha hacia arriba

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Función para controlar la visibilidad del botón
  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-white text-dark rounded-full shadow-lg z-50 cursor-pointer
                     w-12 h-12 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="h-8 w-8" />
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
