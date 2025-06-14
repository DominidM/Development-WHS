import React from 'react';

const image1 = "/assets/contact-album1.png"; // 816x759
const image2 = "/assets/contact-album2.webp"; // 852x349
const image3 = "/assets/contact-album3.webp"; // 852x382
const image4 = "/assets/contact-album4.webp"; // 1701x247

export const ContactAlbum = () => {
    return (
        <section className="w-full px-4 md:px-16 py-10">
            <h2 className="text-center text-xl md:text-3xl font-bold mb-8">
                Trabajando para <span className="text-[#0d3c6b] underline">TU HOGAR</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Parte izquierda (grande) */}
                <div className="w-full">
                    <img
                        src={image1}
                        alt="Imagen 1"
                        className="w-full h-auto object-cover rounded-md"
                    />
                </div>

                {/* Parte derecha (2 apiladas) */}
                <div className="flex flex-col gap-4">
                    <img
                        src={image2}
                        alt="Imagen 2"
                        className="w-full h-auto object-cover rounded-md"
                    />
                    <img
                        src={image3}
                        alt="Imagen 3"
                        className="w-full h-auto object-cover rounded-md"
                    />
                </div>
            </div>

            {/* Imagen grande abajo */}
            <div className="mt-4">
                <img
                    src={image4}
                    alt="Imagen 4"
                    className="w-full h-auto object-cover rounded-md"
                />
            </div>
        </section>
    );
};
