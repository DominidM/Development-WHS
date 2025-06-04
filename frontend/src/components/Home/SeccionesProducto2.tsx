

import React from 'react';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenSrc?: string;
}


export const SeccionesProductos2: React.FC = () => {
  const productosBano: Producto[] = [
  { nombre: 'Trebol Mezcladora Memphis Para Ducha', descripcion: 'Plateado - Control Dual', precio: 197.91, imagenSrc: '/assets/ducha1.jpg' },
  { nombre: 'Trebol Monocomando Tempra Para Ducha', descripcion: 'Plateado - Una Palanca', precio: 459.90, imagenSrc: '/assets/ducha2.jpg' },
  { nombre: 'Trebol Monocomando Sirene Para Ducha', descripcion: 'Plateado - Diseño Moderno', precio: 229.89, imagenSrc: '/assets/ducha3.jpg' },
  { nombre: 'Trebol Mezcladora Atlanta Para Ducha', descripcion: 'Cromado - Manijas Cruzadas', precio: 189.90, imagenSrc: '/assets/ducha4.jpg' },
  { nombre: 'Trebol Monocomando Denver Para Ducha', descripcion: 'Plateado - Cartucho Cerámico', precio: 349.90, imagenSrc: '/assets/ducha5.jpg' },
  { nombre: 'Trebol Mezcladora Phoenix Para Ducha', descripcion: 'Cromado - Estilo Clásico', precio: 169.90, imagenSrc: '/assets/ducha6.jpg' },
  { nombre: 'Trebol Monocomando Dallas Para Ducha', descripcion: 'Plateado - Ahorro de Agua', precio: 389.90, imagenSrc: '/assets/ducha7.jpg' },
  { nombre: 'Trebol Mezcladora Boston Para Ducha', descripcion: 'Cromado - Heavy Duty', precio: 249.90, imagenSrc: '/assets/ducha8.jpg' },
  { nombre: 'Trebol Monocomando Miami Para Ducha', descripcion: 'Plateado - Termostático', precio: 529.90, imagenSrc: '/assets/ducha9.jpg' },
  { nombre: 'Trebol Mezcladora Seattle Para Ducha', descripcion: 'Cromado - Instalación Empotrada', precio: 279.90, imagenSrc: '/assets/ducha10.jpg' },
  { nombre: 'Trebol Monocomando Vegas Para Ducha', descripcion: 'Plateado - Anti-Calc', precio: 419.90, imagenSrc: '/assets/ducha11.jpg' },
  { nombre: 'Trebol Mezcladora Tampa Para Ducha', descripcion: 'Cromado - Presión Balanceada', precio: 199.90, imagenSrc: '/assets/ducha12.jpg' },
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



