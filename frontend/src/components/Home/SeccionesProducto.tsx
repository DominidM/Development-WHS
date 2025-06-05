import React from 'react';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenSrc?: string;
}


export const SeccionesProductos: React.FC = () => {
  const productosBano: Producto[] = [
    { nombre: 'Rivera Lavatorio One Piece', descripcion: 'Cerámico Blanco', precio: 299.99, imagenSrc: '/assets/lavadero1.jpg' },
    { nombre: 'Trebol Mini Florencia Oxford', descripcion: 'Descarga Dual - Blanco', precio: 1099.99, imagenSrc: '/assets/lavadero2.jpg' },
    { nombre: 'Trebol One Piece Oxford', descripcion: 'Descarga Dual - Blanco', precio: 299.99, imagenSrc: '/assets/lavadero4.jpg' },
    { nombre: 'Kohler Devonshire Pedestal', descripcion: 'Vitreous China - Blanco', precio: 459.99, imagenSrc: '/assets/lavadero5.jpg' },
    { nombre: 'American Standard Cadet', descripcion: 'Oval Undermount - Blanco', precio: 199.99, imagenSrc: '/assets/lavadero3.jpg' },
    { nombre: 'TOTO Promenade Rectangular', descripcion: 'Drop-in - Sedona Beige', precio: 349.99, imagenSrc: '/assets/lavadero6.jpg' },
    { nombre: 'Roca Meridian Compact', descripcion: 'Semi-Recessed - Blanco', precio: 279.99, imagenSrc: '/assets/lavadero7.jpg' },
    { nombre: 'Ideal Standard Connect', descripcion: 'Wall-hung - Blanco', precio: 189.99, imagenSrc: '/assets/lavadero8.jpg' },
    { nombre: 'FV Andina Oval', descripcion: 'Vessel Sink - Bone', precio: 239.99, imagenSrc: '/assets/lavadero9.jpg' },
    { nombre: 'Duravit Happy D.2', descripcion: 'Console Basin - Blanco', precio: 689.99, imagenSrc: '/assets/lavadero10.jpg' },
    { nombre: 'Villeroy & Boch Subway', descripcion: 'Rectangle - Alpine White', precio: 419.99, imagenSrc: '/assets/lavadero11.jpg' },
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