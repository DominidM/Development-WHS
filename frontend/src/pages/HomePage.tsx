//import { Outlet } from 'react-router-dom';
//import React from 'react';
import { Carousel } from "../components/Carousel";
import { OfertasSection } from '../components/Home/OfertasSection';
import { ImagenPrincipalConSecundarias } from '../components/Home/PublicidadSection'; // Importa el componente
import { Publicidad } from '../components/Publicidad';
import { SeccionesProductos } from '../components/Home/SeccionesProducto'; // Importa el nuevo componente
import { SeccionesProductos1 } from '../components/Home/SeccionesProducto1'; // Importa el nuevo componente
import { SeccionesProductos2 } from '../components/Home/SeccionesProducto2'; // Importa el nuevo componente

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
      <Text
      title="LAVADEROS"
      subtitle="Encuentra los mejores productos para tu baño y cocina"
      color="#0D3C6B"
      />
      <SeccionesProductos /> 
      <Text
      title="FLUXOMETROS"
      subtitle="Mejora la eficiencia de tu baño con nuestros fluxómetros de alta calidad"
      color="#0D3C6B"
      />
      <SeccionesProductos1/> 
     <Text
      title="DUCHAS Y MEZCLADORAS"
      subtitle="Disfruta de una experiencia de ducha única con nuestras duchas y mezcladoras"
      color="#0D3C6B"
      />
      <SeccionesProductos2/> 
      
      <Marcas/>
    </div>
  );
}

export default HomePage;