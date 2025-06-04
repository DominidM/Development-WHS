import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const OfertasSection: React.FC = () => {
  const ofertas = [
    { nombre: 'Sloan', descripcion: 'One Piece Oxford Descarga Dual - Blanco', precioOriginal: 1900, precioOferta: 799.99, imagenSrc: '/assets/oferta1.jpg' },
    { nombre: 'Trebol', descripcion: 'One Piece Oxford Descarga Dual - Blanco', precioOriginal: 1900, precioOferta: 1099.99, imagenSrc: '/assets/oferta2.jpg' },
    { nombre: 'Sloan', descripcion: 'One Piece Oxford Descarga Dual - Blanco', precioOriginal: 1500, precioOferta: 299.99, imagenSrc: '/assets/oferta3.jpg' },
    { nombre: 'Otro Producto 1', descripcion: 'Descripción del producto 5', precioOriginal: 1200, precioOferta: 599.99, imagenSrc: '/assets/oferta4.jpg' },
    { nombre: 'Otro Producto 2', descripcion: 'Descripción del producto 6', precioOriginal: 900, precioOferta: 399.99, imagenSrc: '/assets/oferta5.jpg' },
    { nombre: 'Otro Producto 3', descripcion: 'Descripción del producto 7', precioOriginal: 900, precioOferta: 399.99, imagenSrc: '/assets/oferta6.jpg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + itemsToShow) % ofertas.length);
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      (prev - itemsToShow + ofertas.length) % ofertas.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsToShow]);

  const visibleOfertas = ofertas.slice(currentIndex, currentIndex + itemsToShow).concat(
    currentIndex + itemsToShow > ofertas.length
      ? ofertas.slice(0, (currentIndex + itemsToShow) % ofertas.length)
      : []
  );

  return (
    <section className="py-3 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 relative">        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prev}
            className="bg-white p-2 rounded-full shadow hover:bg-blue-100 text-blue-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {visibleOfertas.map((oferta, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border shadow-md p-4 w-full max-w-sm transform transition duration-300 hover:scale-[1.02]"
            >
              <img src={oferta.imagenSrc} alt={oferta.nombre} className="w-full h-44 object-contain mb-3 bg-gray-100 rounded" />
              <h3 className="text-lg font-semibold text-gray-800">{oferta.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2">{oferta.descripcion}</p>
              <div className="mb-2">
                <span className="text-sm text-gray-400 line-through mr-2">S/ {oferta.precioOriginal}</span>
                <span className="text-lg text-red-600 font-bold">S/ {oferta.precioOferta}</span>
              </div>
              <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold">
                Añadir al carrito
              </button>
            </div>
          ))}

          <button
            onClick={next}
            className="bg-white p-2 rounded-full shadow hover:bg-blue-100 text-blue-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
