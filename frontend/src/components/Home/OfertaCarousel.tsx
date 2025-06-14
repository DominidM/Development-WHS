import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import { API_BASE_URL } from '../../apiConfig'; 

interface Oferta {
  idOferta: number;
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  imagenProducto?: string;
  slug: string;
  precioProducto: number;
  precioOferta: number;
  fechaInicio?: string;
  fechaFin?: string;
  stockProducto: number; // <--- STOCK AÑADIDO
}

export default function OfertaCarousel() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/public/ofertas/activas`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener ofertas");
        return res.json();
      })
      .then(data => {
        setOfertas(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setOfertas([]);
        setError(String(err));
        console.error('Error obteniendo ofertas:', err);
      });
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Mobile: Scroll horizontal, Desktop: Grid */}
        <div
          className={`
            flex md:hidden gap-2 overflow-x-auto pb-1 px-1 scroll-smooth snap-x snap-mandatory
          `}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {loading ? (
            <div className="text-center w-full py-8 text-gray-400">Cargando ofertas...</div>
          ) : ofertas.length === 0 ? (
            <div className="text-center w-full py-8 text-gray-400">No hay productos en oferta.</div>
          ) : (
            ofertas.map(oferta => (
              <div
                key={oferta.idOferta}
                className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0"
              >
                <ProductCard
                  nombre={oferta.nombreProducto}
                  descripcion={oferta.descripcionProducto}
                  imagen={oferta.imagenProducto}
                  slug={oferta.slug}
                  precio={oferta.precioOferta}
                  precioOriginal={oferta.precioProducto}
                  stock={oferta.stockProducto} // <-- PASA EL STOCK AQUÍ
                />
              </div>
            ))
          )}
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {loading ? (
            <div className="text-center w-full py-8 text-gray-400 col-span-4">Cargando ofertas...</div>
          ) : ofertas.length === 0 ? (
            <div className="text-center w-full py-8 text-gray-400 col-span-4">No hay productos en oferta.</div>
          ) : (
            ofertas.map(oferta => (
              <div key={oferta.idOferta} className="flex justify-center">
                <ProductCard
                  nombre={oferta.nombreProducto}
                  descripcion={oferta.descripcionProducto}
                  imagen={oferta.imagenProducto}
                  slug={oferta.slug}
                  precio={oferta.precioOferta}
                  precioOriginal={oferta.precioProducto}
                  stock={oferta.stockProducto} // <-- PASA EL STOCK AQUÍ TAMBIÉN
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}