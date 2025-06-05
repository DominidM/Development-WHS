import { Link } from "react-router-dom";

interface ProductCardProps {
  nombre: string;
  descripcion: string;
  imagen?: string;
  slug: string;
  precio: number;
  onAddToCart?: () => void; // Optional callback for "Añadir carrito"
}

export default function ProductCard({
  nombre,
  descripcion,
  imagen,
  slug,
  precio,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden border border-blue-100 transition-transform hover:scale-105 hover:shadow-xl">
      <div className="h-40 w-full flex items-center justify-center bg-white">
        {imagen ? (
          <img src={imagen} alt={nombre} className="object-contain h-36 w-full" />
        ) : (
          <span className="text-blue-200">Sin imagen</span>
        )}
      </div>
      <div className="flex-1 flex flex-col px-4 py-3">
        <h4 className="text-blue-800 font-bold text-base truncate mb-2">{nombre}</h4>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{descripcion}</p>
        <div className="mb-3">
          <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm shadow">
            S/. {precio.toFixed(2)}
          </span>
        </div>
        <div className="mt-auto">
          <div className="flex gap-2">
            <Link to={`/productos/${slug}`} className="flex-1">
              <button
                className="
                  w-full bg-gradient-to-r from-blue-600 to-blue-400
                  text-white font-bold py-2 rounded-full
                  shadow transition-all duration-150 ease-in-out
                  hover:from-blue-700 hover:to-blue-500 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Ver detalle
              </button>
            </Link>
            <button
              type="button"
              onClick={onAddToCart}
              className="
                flex-1 bg-gradient-to-r from-green-600 to-green-400
                text-white font-bold py-2 rounded-full
                shadow transition-all duration-150 ease-in-out
                hover:from-green-700 hover:to-green-500 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Añadir carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}