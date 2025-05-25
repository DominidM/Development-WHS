import React from 'react';
import { ShoppingCart } from 'lucide-react'; // Asegúrate de tener instalada la librería lucide-react

interface PublicidadProps {
  textoPromocional: string;
}

export const Publicidad: React.FC<PublicidadProps> = ({ textoPromocional }) => {
  const backgroundColor = '#0d3c6b'; // Color azul del fondo
  const textColor = '#ffffff'; // Color blanco del texto y el icono

  return (
    <div className="w-full py-4 flex items-center justify-center" style={{ backgroundColor: backgroundColor, color: textColor }}>
      <ShoppingCart className="w-14 h-19 mr-5 mx-8" />
      <div className="h-12 border border-white mx-1"></div>
      <p className="font-semibold text-lg mx-2">{textoPromocional}</p>
    </div>
  );
};