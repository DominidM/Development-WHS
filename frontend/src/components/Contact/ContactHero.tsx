import { ArrowDown, Briefcase, Award } from 'lucide-react';

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

    const spheres = [
        "/assets/contact1.png",
        "/assets/contact3.png",
        "/assets/contact4.png",
        "/assets/contact5.png"
    ];

    return (
        <div className="w-full font-montserrat bg-gradient-to-br from-[#f4f8fb] to-[#e4eaf2] pb-0">
            {/* HERO HEADER */}
            <div className="flex flex-col gap-8 sm:gap-12">
                <div className="relative w-full max-h-[420px] md:max-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#e3e6ed]">
                    <img
                        src={imageUrl1}
                        alt="Imagen de Contacto 1"
                        className="w-full h-full object-cover rounded-3xl min-h-[220px] scale-105 transition-all duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/30 to-transparent pointer-events-none z-10" />
                    {/* Badge experiencia */}
                    <div className="absolute top-6 left-6 bg-blue-900/80 px-5 py-1 rounded-full shadow-lg text-white font-extrabold text-xs uppercase tracking-widest z-30 border-2 border-blue-300/60 flex items-center gap-2">
                        <Award className="h-4 w-4" /> +20 años de experiencia
                    </div>
                    {/* Título central */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                        <h2 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white text-center drop-shadow-[0_6px_2px_rgba(0,0,0,0.8)] animate-fade-in">
                            ¿Quiénes Somos?
                        </h2>
                    </div>
                </div>

                {/* Flecha flotante sin círculo */}
                <button
                    onClick={handleScroll}
                    className="mx-auto mt-2 focus:outline-none"
                    aria-label="Desplazar hacia abajo"
                    style={{ background: "none", boxShadow: "none" }}
                >
                    <ArrowDown className="text-blue-900 opacity-80 animate-bounce h-11 w-11 hover:text-blue-700 transition" />
                </button>

                {/* SOBRE LA EMPRESA */}
                <section
                    id="scroll-target"
                    className="relative w-full rounded-2xl max-h-[700px] overflow-visible min-h-[350px] flex flex-col items-center justify-center px-2 sm:px-6"
                >
                    <img
                        src={imageUrl2}
                        alt="Imagen institucional"
                        className="w-full h-full object-cover rounded-2xl min-h-[320px] max-h-[400px] opacity-75 absolute inset-0"
                    />
                    {/* Fondo glass neutro */}
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-2xl z-10" />
                    
                    {/* Texto destacado más neutro */}
                    <div className="relative z-20 flex flex-col items-center justify-center h-full w-full px-2 sm:px-10 py-6 sm:py-10">
                        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-100/60 max-w-xl mx-auto px-4 py-6 sm:px-8 sm:py-10">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
                                <Briefcase className="inline-block h-6 w-6 text-blue-700 mr-1" />
                                WHC Representaciones
                            </h3>
                            <p className="text-base md:text-lg font-medium text-gray-800 mb-2">
                                Somos una empresa peruana especializada en soluciones de <span className="text-blue-700 font-bold">gasfitería</span> para proyectos residenciales, comerciales e industriales.
                            </p>
                            <ul className="mb-2 text-gray-800 font-medium text-base space-y-1">
                                <li><span className="font-semibold text-blue-700">+20 años</span> de experiencia en la industria.</li>
                                <li>Asesoría técnica y productos certificados.</li>
                                <li>Stock inmediato de fluxómetros, llaves, griferías y accesorios sanitarios.</li>
                                <li>Atención a todo el Perú con rapidez y confianza.</li>
                            </ul>
                            <div className="mt-2 text-blue-900 italic font-semibold text-sm">
                                Compromiso, calidad y confianza en cada proyecto.
                            </div>
                        </div>
                        {/* Esferas mobile abajo y separadas */}
                        <div className="flex justify-center gap-2 sm:hidden mt-4">
                            {spheres.map((url, idx) => (
                                <div
                                    key={idx}
                                    className="w-12 h-12 rounded-full bg-center bg-cover shadow-md border-2 border-white"
                                    style={{ backgroundImage: `url('${url}')` }}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Esferas desktop flotantes */}
                    <div className="hidden sm:block">
                        <div className="absolute top-8 right-8 z-30 animate-float-slow">
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-center bg-cover shadow-2xl border-4 border-blue-200 outline outline-2 outline-white hover:scale-110 transition-all duration-300"
                                style={{ backgroundImage: "url('/assets/contact1.png')" }}
                            ></div>
                        </div>
                        <div className="absolute bottom-20 right-32 z-30 animate-float">
                            <div
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-center bg-cover shadow-xl border-4 border-blue-100 outline outline-2 outline-white hover:scale-110 transition-all duration-300"
                                style={{ backgroundImage: "url('/assets/contact3.png')" }}
                            ></div>
                        </div>
                        <div className="absolute bottom-10 left-16 z-20 animate-float-reverse">
                            <div
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-center bg-cover shadow-xl border-4 border-blue-200 outline outline-2 outline-white hover:scale-110 transition-all duration-300"
                                style={{ backgroundImage: "url('/assets/contact4.png')" }}
                            ></div>
                        </div>
                        <div className="absolute top-16 left-8 z-20 animate-float-fast">
                            <div
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-center bg-cover shadow-lg border-4 border-blue-100 outline outline-2 outline-white hover:scale-110 transition-all duration-300"
                                style={{ backgroundImage: "url('/assets/contact5.png')" }}
                            ></div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Animaciones */}
            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0px);}
                    50% { transform: translateY(-12px);}
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-reverse { animation: float 7s ease-in-out infinite reverse; }
                .animate-float-slow { animation: float 9s ease-in-out infinite; }
                .animate-float-fast { animation: float 4s ease-in-out infinite; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in { animation: fade-in 1.2s both; }
                `}
            </style>
        </div>
    );
};

export default ContactHero;