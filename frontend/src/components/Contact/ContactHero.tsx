//import React from 'react';
import { ArrowDown } from 'lucide-react';

const imageUrl1 = "/assets/hero1.png";
const imageUrl2 = "/assets/contact2.png";

export const ContactHero = () => {
    const desiredScrollOffset = 460;

    const handleScroll = () => {
        window.scrollBy({
            top: desiredScrollOffset,
            behavior: 'smooth',
        });
    };

    // Lista de esferas para renderizar en mobile
    const spheres = [
        "/assets/contact1.png",
        "/assets/contact3.png",
        "/assets/contact4.png",
        "/assets/contact5.png"
    ];

    return (
        <div className="w-full font-montserrat bg-gradient-to-br from-[#f4f8fb] to-[#e4eaf2] pb-9">
            <div className="flex flex-col gap-10">
                {/* Imagen 1 */}
                <div className="relative w-full max-h-[420px] md:max-h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-[#e3e6ed]">
                    <img
                        src={imageUrl1}
                        alt="Imagen de Contacto 1"
                        className="w-full h-full object-cover rounded-2xl min-h-[220px] scale-105"
                    />
                    {/* Difuminado inferior */}
                    <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-10">
                        {/* Cuadro azul superior izquierdo */}
                        <div className="absolute top-[10%] left-0 w-28 sm:w-40 md:w-72 h-9 md:h-14 bg-[#0d3c6b] bg-gradient-to-tr from-[#0d3c6b]/90 via-blue-900/60 to-transparent rounded-tr-lg shadow-lg opacity-80" />
                        {/* Título */}
                        <h2 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white text-center z-40 drop-shadow-2xl drop-shadow-[0_6px_2px_rgba(0,0,0,0.8)] font-montserrat">
                        ¿Quiénes Somos?
                        </h2>
                        {/* Cuadro azul inferior derecho */}
                        <div className="absolute bottom-[10%] right-0 w-28 sm:w-40 md:w-72 h-9 md:h-14 bg-[#0d3c6b] bg-gradient-to-tl from-[#0d3c6b]/90 via-blue-900/60 to-transparent rounded-tl-lg shadow-lg opacity-80" />
                    </div>
                    {/* Decoración extra: líneas azules */}
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-200/80 to-transparent rounded-l z-20" />
                    <div className="absolute right-0 bottom-0 h-1/2 w-1 bg-gradient-to-t from-blue-200/80 to-transparent rounded-r z-20" />
                </div>

                {/* Flecha para scroll */}
                <button
                    onClick={handleScroll}
                    className="mx-auto transition"
                    aria-label="Desplazar hacia abajo"
                >
                    <ArrowDown className="text-[#0d3c6b] animate-bounce h-9 w-9 sm:h-11 sm:w-11" />
                </button>

                {/* Imagen 2 */}
                <div
                    id="scroll-target"
                    className="relative w-full rounded-2xl max-h-[700px] overflow-hidden min-h-[340px] shadow-xl border border-[#e3e6ed] bg-white"
                >
                    <img
                        src={imageUrl2}
                        alt="Imagen de Contacto 2"
                        className="w-full h-full object-cover rounded-2xl min-h-[320px] opacity-90"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/90 to-transparent"></div>
                    
                    {/* Texto central */}
                    <div className="
                        absolute inset-0 
                        bg-black bg-opacity-70 rounded-2xl 
                        flex flex-col items-center justify-center 
                        p-14 sm:p-8
                    ">
                       <p className="
                            text-white text-sm xs:text-base sm:text-lg md:text-2xl font-semibold text-center max-w-3xl md:max-w-4xl drop-shadow-xl font-montserrat leading-relaxed tracking-wide
                            pb-10 sm:pb-0
                        ">
                            Somos especialistas en productos de gasfitería: <span className="text-blue-300">fluxómetros, llaves, griferías</span> y una amplia variedad de accesorios para instalaciones sanitarias.<br /><br />
                            Ofrecemos productos de <span className="text-blue-300">alta calidad</span>, asesoramiento técnico personalizado y un amplio stock para proyectos residenciales, comerciales e industriales.<br /><br />
                            <span className="italic text-blue-300">Confía en nosotros para soluciones eficientes y seguras en cada etapa de tu proyecto.</span>
                        </p>
                    </div>
                    
                    {/* Esferas desktop/tablet desordenadas */}
                    <div className="hidden sm:block">
                        <div className="absolute top-8 right-5 sm:top-14 sm:right-16 z-30">
                            <div
                                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-center bg-cover shadow-xl border-4 border-white transition-transform hover:scale-105 hover:brightness-110 duration-200"
                                style={{ backgroundImage: "url('/assets/contact1.png')" }}
                            ></div>
                        </div>
                        <div className="absolute bottom-12 right-3 sm:bottom-20 sm:right-28 z-30">
                            <div
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-center bg-cover shadow-lg border-4 border-white transition-transform hover:scale-110 hover:brightness-105 duration-200"
                                style={{ backgroundImage: "url('/assets/contact3.png')" }}
                            ></div>
                        </div>
                        <div className="absolute bottom-8 left-10 md:bottom-16 md:right-52 z-20">
                            <div
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-center bg-cover shadow-lg border-4 border-white transition-all hover:scale-110 hover:brightness-105 duration-200"
                                style={{ backgroundImage: "url('/assets/contact4.png')" }}
                            ></div>
                        </div>
                        <div className="absolute top-14 left-2 sm:top-20 sm:left-20 z-20">
                            <div
                                className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-center bg-cover shadow-md border-4 border-white transition-transform hover:scale-110 hover:brightness-105 duration-200"
                                style={{ backgroundImage: "url('/assets/contact5.png')" }}
                            ></div>
                        </div>
                    </div>
                    
                    {/* Mobile: los círculos van abajo, tamaño igual, centrados */}
                    
                    
                    <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 sm:hidden z-40">
                        {spheres.map((url, idx) => (
                            <div
                                key={idx}
                                className="w-12 h-12 rounded-full bg-center bg-cover shadow-md border-2 border-white"
                                style={{ backgroundImage: `url('${url}')` }}
                            />
                        ))}
                    </div>
                    {/* Líneas decorativas flotantes */}
                    <div className="hidden md:block absolute left-1/3 top-2 w-20 h-1 bg-gradient-to-r from-blue-200/60 to-transparent rounded-full z-10 animate-pulse" />
                    <div className="hidden md:block absolute right-1/4 bottom-4 w-24 h-1 bg-gradient-to-l from-blue-200/60 to-transparent rounded-full z-10 animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default ContactHero;