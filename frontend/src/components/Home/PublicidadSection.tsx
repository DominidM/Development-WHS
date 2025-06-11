import React from 'react';

export const ImagenPrincipalConSecundarias: React.FC = () => {
  const principalImageUrl = './assets/publicidad1.png'; // ¡Reemplaza con la ruta real!
  const principalAltText = 'Banner principal izquierdo';
  const principalTitle = 'Lo mejor para TU HOGAR';
  const secondaryImageUrlTop = './assets/publicidad2.png'; // ¡Reemplaza con la ruta real!
  const secondaryAltTextTop = 'Banner derecho arriba';
  const secondaryImageUrlBottom = './assets/publicidad3.png'; // ¡Reemplaza con la ruta real!
  const secondaryAltTextBottom = 'Banner derecho abajo';
  const blueLineColor = '#0d3c6b';

  // Usar sólo "TU HOGAR" para el subrayado
  const principalWords = principalTitle.split(' ');
  const underlinedText = principalWords.slice(-2).join(' ');
  const beforeUnderline = principalWords.slice(0, -2).join(' ');

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-2 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 uppercase">
          {beforeUnderline}{' '}
          <span
            className="underline"
            style={{ textDecorationColor: blueLineColor }}
          >
            {underlinedText}
          </span>
        </h2>
        <div className="h-0.5 w-36 mx-auto mt-1 mb-7"></div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
          {/* Imagen principal (izquierda en desktop) */}
          <div className="md:w-1/2 group transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl rounded-md shadow-lg overflow-hidden bg-white cursor-pointer">
            <img
              src={principalImageUrl}
              alt={principalAltText}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ aspectRatio: '782 / 759' }}
            />
          </div>

          {/* Contenedor de las dos imágenes secundarias (derecha en desktop) */}
          <div className="md:w-1/2 flex flex-col gap-6 md:gap-10">
            <div className="rounded-md shadow-lg overflow-hidden bg-white group cursor-pointer transition-transform duration-300 hover:translate-x-2 hover:-translate-y-1 hover:shadow-2xl">
              <img
                src={secondaryImageUrlTop}
                alt={secondaryAltTextTop}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: '821 / 372' }}
              />
            </div>
            <div className="rounded-md shadow-lg overflow-hidden bg-white group cursor-pointer transition-transform duration-300 hover:-translate-x-2 hover:translate-y-1 hover:shadow-2xl">
              <img
                src={secondaryImageUrlBottom}
                alt={secondaryAltTextBottom}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ aspectRatio: '821 / 372' }}
              />
            </div>
          </div>
        </div>

        {/* Línea decorativa debajo de la publicidad */}
        <div className="h-0.5 w-48 mx-auto mt-8" style={{ backgroundColor: blueLineColor }}></div>
      </div>
    </section>
  );
};