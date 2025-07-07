import { useEffect, useRef, useState } from "react";
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
  stockProducto: number;
}

export default function OfertaCarousel() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref para el contenedor del carrusel
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/public/ofertas/activas`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener ofertas");
        return res.json();
      })
      .then(data => {
        setOfertas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setOfertas([]);
        setError(String(err));
      });
  }, []);

  const scrollBy = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="py-2 bg-gray-50">
      <div className="container mx-auto px-4 relative">

        <div className="relative">
          {/* Flechas para desktop */}
          <button
            onClick={() => scrollBy(-320)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100 transition"
            style={{ left: '-60px' }}
            aria-label="Anterior"
            disabled={loading || ofertas.length === 0}
          >
            <svg width={24} height={24} fill="none" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg>
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 shadow rounded-full w-10 h-10 items-center justify-center hover:bg-gray-100 transition"
            style={{ right: '-25px' }}
            aria-label="Siguiente"
            disabled={loading || ofertas.length === 0}
          >
            <svg width={24} height={24} fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" /></svg>
          </button>

          {/* Carrusel horizontal */}
          <div
            ref={carouselRef}
            className={`
              flex gap-4 overflow-x-auto pb-2 px-1 scroll-smooth snap-x snap-mandatory
              hide-scrollbar
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
                  className="snap-center min-w-[260px] max-w-[280px] flex-shrink-0"
                >
                  <ProductCard
                    id={oferta.idProducto}
                    nombre={oferta.nombreProducto}
                    descripcion={oferta.descripcionProducto}
                    imagen={oferta.imagenProducto}
                    slug={oferta.slug}
                    precio={oferta.precioOferta}
                    precioOriginal={oferta.precioProducto}
                    stock={oferta.stockProducto}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </section>
  );
}