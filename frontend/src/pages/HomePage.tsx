//import { Outlet } from 'react-router-dom';
//import React from 'react';
import { Carousel } from "../components/Carousel";
import { OfertasSection } from '../components/Home/OfertasSection';
import { ImagenPrincipalConSecundarias } from '../components/Home/PublicidadSection'; // Importa el componente
import { Publicidad } from '../components/Publicidad';
import  ProductCarousel from "../components/Home/ProductCarousel"; // Importa el nuevo componente de carrusel de productos

import  Marcas from '../components/Marcas'; // Importa el nuevo componente
import Text from "../components/ui/text"; // Importa el nuevo componente de texto
//import ProductCarousel from "../components/ui/ProductCarousel";


function HomePage() {
  return (
    <div className="min-h-screen bg-gray-#ffffff">
      <Carousel />
      <Publicidad textoPromocional="¡Bienvenido a nuestra tienda online! Encuentra los mejores productos al mejor precio." />
      <Text
      title="OFERTAS PRINCIPALES DE LA SEMANA"
      subtitle="Aprovecha los descuentos y promociones especiales en nuestros productos destacados"
      color="#0D3C6B"
      />
      <OfertasSection />
      <ImagenPrincipalConSecundarias /> {/* Simplemente renderiza el componente */}
            <Publicidad textoPromocional="Delivery gratis a compras mayores a 200" />

     <ProductCarousel
            pkCategoria="lavaderos"
            titulo="LAVADEROS"
            subtitulo="Encuentra los mejores productos para tu baño y cocina"
            maxProductos={10} // Puedes ajustar el número máximo de productos a mostrar
      />
      <ProductCarousel
        pkCategoria="fluxometros"
        titulo="FLUXOMETROS"
        subtitulo="Mejora la eficiencia de tu baño con nuestros fluxómetros de alta calidad"
        maxProductos={10} // Puedes ajustar el número máximo de productos a mostrar
      />

      
    
      
      <Marcas/>
    </div>
  );
}

export default HomePage;