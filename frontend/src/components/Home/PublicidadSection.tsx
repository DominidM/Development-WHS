import React from 'react';

export const ImagenPrincipalConSecundarias: React.FC = () => {
  const principalImageUrl = './assets/publicidad1.png'; // ¡REEMPLAZA CON LA RUTA REAL! (792x759)
  const principalAltText = 'Banner principal izquierdo';
  const principalTitle = 'Lo mejor para TU HOGAR';
  const secondaryImageUrlTop = './assets/publicidad2.png'; // ¡REEMPLAZA CON LA RUTA REAL! 821 / 372
  const secondaryAltTextTop = 'Banner derecho arriba';
  const secondaryImageUrlBottom = './assets/publicidad3.png'; // ¡REEMPLAZA CON LA RUTA REAL! (821 / 372
  const secondaryAltTextBottom = 'Banner derecho abajo';
  const blueLineColor = '#0d3c6b';

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto text-center">
      <h2 className="text-xl md:text-3xl font-bold text-gray-800 uppercase">
          Lo mejor para <span className="underline" style={{ textDecorationColor: blueLineColor }}>{principalTitle.split(' ')[3]} {principalTitle.split(' ')[4]}</span>
        </h2>
        <div className="h-0.5 w-36 mx-auto mt-1 mb-7" ></div> {/* Línea debajo de "TU HOGAR" */}

        <div className="flex flex-col md:flex-row gap-10">
          {/* Imagen principal (izquierda en desktop) */}
          <div className="md:w-1/2 rounded-md shadow-lg overflow-hidden">
            <img
              src={principalImageUrl}
              alt={principalAltText}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '792 / 759' }} // Mantener la proporción
            />
          </div>

          {/* Contenedor de las dos imágenes secundarias (derecha en desktop) */}
          <div className="md:w-1/2 flex flex-col gap-10">
            <div className="rounded-md shadow-lg overflow-hidden">
              <img
                src={secondaryImageUrlTop}
                alt={secondaryAltTextTop}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '821 / 372' }} // Mantener la proporción
              />
            </div>
            <div className="rounded-md shadow-lg overflow-hidden">
              <img
                src={secondaryImageUrlBottom}
                alt={secondaryAltTextBottom}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: '821 / 372' }} // Mantener la proporción
              />
            </div>
          </div>
        </div>

       {/* Línea debajo de la publicidad */}
       <div className="h-0.5 w-48 mx-auto mt-8" style={{ backgroundColor: blueLineColor }}></div>
      </div>
    </section>
  );
};