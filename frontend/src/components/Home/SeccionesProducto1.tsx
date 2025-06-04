import React from 'react';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenSrc?: string;
}


export const SeccionesProductos1: React.FC = () => {
  const productosBano: Producto[] = [
    { nombre: 'Sloan Royal 111-1.28 ESS', descripcion: 'Fluxómetro Manual - 1.28 GPF', precio: 189.99, imagenSrc: '/assets/fluxometro1.jpg' },
    { nombre: 'Zurn Z6000-AV Sensor', descripcion: 'Fluxómetro Automático - 1.6 GPF', precio: 349.99, imagenSrc: '/assets/fluxometro2.jpg' },
    { nombre: 'American Standard 6045', descripcion: 'Fluxómetro Manual - Cromado', precio: 159.99, imagenSrc: '/assets/fluxometro3.jpg' },
    { nombre: 'Kohler K-10960-CP', descripcion: 'Fluxómetro Sensor - 1.28 GPF', precio: 429.99, imagenSrc: '/assets/fluxometro4.jpg' },
    { nombre: 'TOTO TET1GNC Ecopower', descripcion: 'Fluxómetro Automático - Hidroeléctrico', precio: 599.99, imagenSrc: '/assets/fluxometro5.jpg' },
    { nombre: 'Sloan G2 Optima Plus', descripcion: 'Fluxómetro Sensor - Dual Flush', precio: 389.99, imagenSrc: '/assets/fluxometro6.jpg' },
    { nombre: 'Chicago Faucets 732', descripcion: 'Fluxómetro Manual - Heavy Duty', precio: 219.99, imagenSrc: '/assets/fluxometro7.jpg' },
    { nombre: 'Moen 8310 Commercial', descripcion: 'Fluxómetro Sensor - Chrome', precio: 299.99, imagenSrc: '/assets/fluxometro8.jpg' },
    { nombre: 'Delta 111T Series', descripcion: 'Fluxómetro Manual - Top Spud', precio: 169.99, imagenSrc: '/assets/fluxometro9.jpg' },
    { nombre: 'Grohe Tectron Skate', descripcion: 'Fluxómetro Infrarrojo - Batería', precio: 459.99, imagenSrc: '/assets/fluxometro10.jpg' },
    { nombre: 'Watts Flushmate M-101526', descripcion: 'Sistema Presión - Retrofit', precio: 129.99, imagenSrc: '/assets/fluxometro11.jpg' },
];


  return (
    <div className="bg-gray-100 mb-6">
      <div className="container mx-auto text-center">  
        {/* Sección Mejora tu baño con WHS */}
        <div className="overflow-x-auto py-1 mb-3">
          <div className="flex gap-7 w-max mb-4"> 
            {productosBano.map((producto, index) => (
              <div key={index} className="bg-white rounded-md shadow-md p-6 text-center w-72 flex-shrink-0">
                <div className="h-90 w-full rounded-md mb-3 overflow-hidden">
                  <img src={producto.imagenSrc} alt={producto.nombre} className="w-full h-full object-contain p-2" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">{producto.nombre}</h3>
                <p className="text-xs text-gray-800 truncate mb-2">{producto.descripcion}</p>
                <p className="text-blue-500 font-semibold text-sm mt-2">S/ {producto.precio.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};