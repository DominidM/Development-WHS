import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/assets/Ruleta1.webp", text: "elegante y moderno" },
  { src: "/assets/Ruleta2.webp", text: "calidad garantizada" },
  { src: "/assets/Ruleta3.webp", text: "lo mejor para ti" },
  { src: "/assets/Ruleta4.webp", text: "comunidad y elegancia" },
];

export function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Contenedor horizontal */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative h-full"
          >
            <img
              src={image.src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Difuminado superior */}  
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/100 to-transparent"></div>
            {/* Difuminado inferior */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/100 to-transparent"></div>
            {/* Cuadro de texto decorativo superpuesto - Ajustado a la izquierda */}
             <div className="absolute bottom-6 left-0 bg-[#0d3c6b] text-white px-10 py-4 rounded-md  shadow-lg text-lg font-semibold">
              {image.text}
            </div>
          </div>
        ))}
      </div>

         {/* Flechas */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black text-gray-200 shadow"
      >
        <ChevronLeft className="w-8 h-10" />
      </button>
      
       <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black text-gray-200 shadow"
      >
        <ChevronRight className="w-8 h-10" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === current ? "bg-blue-600" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Línea decorativa */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[#000000]" />
     </div>
  );
}
