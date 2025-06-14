//actualizacion para prueba para cooreccion de errores de importación;
//update actulizacion para prueba;
//import React from 'react';
import { Publicidad } from '../components/Publicidad';
import { Hero } from "../components/Hero";
import { Cart } from "../components/Cart/Cart";
import  ProductCarousel from "../components/Home/ProductCarousel"; // Importa el nuevo componente de carrusel de productos




function CartPage() {

    return (
      <div className="min-h-screen bg-gray-100">
        <Hero />  
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-4">
          <Cart />
        </div>
        <Publicidad textoPromocional="Delivery gratis a compras mayores a 200" />  
        <ProductCarousel
            pkCategoria="Válvulas"
            titulo="MAS PRODUCTOS"
            subtitulo="Encuentra los mejores productos para tu baño y cocina"
          />

      
      
      </div>
    );
}

export default CartPage;
