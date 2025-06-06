import React, { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";

interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number;
  descripcionProducto: string;
  imagenProducto?: string;
  slug: string;
  marca: string;
  categoria: string;
}

interface ProductCarouselProps {
  pkCategoria: string;
  titulo: string;
  subtitulo?: string;
  maxProductos?: number; // <-- nuevo prop para controlar
}

export default function ProductCarousel({ pkCategoria, titulo, subtitulo, maxProductos = 8 }: ProductCarouselProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8081/producto?categoria=${encodeURIComponent(pkCategoria)}`)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      });
  }, [pkCategoria]);

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-1">
          {titulo}
        </h2>
        {subtitulo && (
          <div className="text-center text-gray-600 mb-4">{subtitulo}</div>
        )}

        {/* Carrusel */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-2 px-2 scroll-smooth snap-x snap-mandatory"
               style={{ WebkitOverflowScrolling: "touch" }}>
            {loading ? (
              <div className="text-center w-full py-8 text-gray-400">Cargando productos...</div>
            ) : productos.length === 0 ? (
              <div className="text-center w-full py-8 text-gray-400">No hay productos para esta categoría.</div>
            ) : (
              productos.slice(0, maxProductos).map(producto => (
                <div
                  key={producto.idProducto}
                  className="min-w-[260px] max-w-[280px] snap-start"
                >
                  <ProductCard
                    nombre={producto.nombreProducto}
                    descripcion={producto.descripcionProducto}
                    imagen={producto.imagenProducto}
                    slug={producto.slug}
                    precio={producto.precioProducto}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}