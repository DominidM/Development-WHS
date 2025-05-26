import React from 'react';

export const ContactSection = () => {
    return (
        <section className="w-full px-4 md:px-16 py-10 bg-[#e4eaf2]">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-5 text-[#0d3c6b]">
                Contáctanos
            </h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-4 md:p-6">
                {/* Información de contacto */}
                <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-900">
                        Puedes comunicarte con nosotros para cotizaciones, consultas técnicas o información general.
                    </p>
                    <p><strong>Teléfono:</strong> <a href="tel:+51949790715" className="hover:underline text-[#0d3c6b]">(+51) 949790715</a></p>
                    <p><strong>Correo:</strong> <a href="mailto:whsRepresentaciones@gmail.com" className="hover:underline text-[#0d3c6b]">whsRepresentaciones@gmail.com</a></p>
                    <p><strong>Dirección:</strong> Los Rubies 295, La Victoria, Lima, Perú</p>
                    <p><strong>Horario:</strong> Lunes a Viernes de 9:00 a.m. a 6:00 p.m.</p>
                </div>

                {/* Formulario de contacto */}
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d3c6b] transition"
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d3c6b] transition"
                    />
                    <textarea
                        placeholder="Mensaje"
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d3c6b] transition"
                    />
                    <button
                        type="submit"
                        className="bg-[#0d3c6b] text-white px-6 py-3 rounded-md hover:bg-[#0b325b] transition font-bold w-full"
                    >
                        Enviar mensaje
                    </button>
                </form>
            </div>

            <h3 className="text-xl font-semibold mt-12 text-[#0d3c6b] text-center md:text-left">¿Dónde nos ubicamos?</h3>
            <p className="mb-4 text-gray-600 text-center md:text-left">Puedes encontrarnos fácilmente en el siguiente mapa:</p>

            {/* Mapa embebido de Google Maps */}
            <div className="w-full h-72 md:h-96 rounded-md shadow overflow-hidden">
                <iframe
                    title="Ubicación de la empresa"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.594488711491!2d-77.08852892439776!3d-12.06438884214716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c849a17412b7%3A0x316342a24980719b!2sLos%20Rubies%20295%2C%20Lima%2015034!5e0!3m2!1ses-419!2spe!4v1713538117347!5m2!1ses-419!2spe"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
};