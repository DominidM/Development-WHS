import React from 'react';
import { ArrowDown } from 'lucide-react';

const imageUrl1 = "/assets/hero1.png";
const imageUrl2 = "/assets/contact2.png";

export const ContactHero = () => {
    const desiredScrollOffset = 387; // Ajusta este valor en píxeles

    const handleScroll = () => {
        window.scrollBy({
            top: desiredScrollOffset,
            behavior: 'smooth',
        });
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-8">
                {/* Imagen 1 */}
                <div className="relative w-full max-h-96 rounded-xl overflow-hidden">
                    <img
                        src={imageUrl1}
                        alt="Imagen de Contacto 1"
                        className="w-full h-full object-cover rounded-md"
                    />
                          {/* Difuminado inferior */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/100 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md z-10">
                        {/* Cuadro azul superior izquierdo */}
                        <div className="absolute top-[10%] left-[0%] w-32 md:w-72 h-11 bg-[#0d3c6b] bg-gradient-to-t from-black/30" />
                        {/* Título */}
                        <h2 className="text-3xl sm:text-4xl md:text-10xl font-bold text-white text-center z-40">
                            ¿Quiénes Somos?
                        </h2>
                        {/* Cuadro azul inferior derecho */}
                        <div className="absolute bottom-[10%] right-[0%] w-32 md:w-72 h-11 bg-[#0d3c6b] bg-gradient-to-t from-black/40" />
                    </div>
                
                </div>

                {/* Flecha para scroll */}
                <button onClick={handleScroll} className="mx-auto focus:outline-none">
                <ArrowDown className="text-black text animate-bounce h-6 w-6" />
                </button>

                {/* Imagen 2 */}
                <div id="scroll-target" className="relative w-full max-h-100 overflow-hidden">
                    <img
                        src={imageUrl2}
                        alt="Imagen de Contacto 2"
                        className="w-full h-full object-cover rounded-md"
                    />
                     <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/100 to-transparent"></div>
                    <div className="absolute inset-0 bg-black bg-opacity-70 rounded-md flex items-center justify-center p-4 sm:p-8">
                        <p className="text-white text-sm sm:text-lg md:text-2xl font-semibold text-center max-w-4xl">
                            Somos una empresa especializada en la venta de productos de gasfitería, como fluxómetros, llaves, griferías y accesorios para instalaciones sanitarias. <br /><br />
                            Ofrecemos alta calidad, asesoramiento técnico y un amplio stock para proyectos residenciales, comerciales e industriales.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactHero;