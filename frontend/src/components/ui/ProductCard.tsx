import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  nombre: string;
  descripcion: string;
  imagen?: string;
  slug: string;
  precio: number;
  onAddToCart?: () => void;
}

export default function ProductCard({
  nombre,
  descripcion,
  imagen,
  slug,
  precio,
  onAddToCart,
}: ProductCardProps) {
  const navigate = useNavigate();

  // Navega al detalle al hacer click en la card (excepto si el click fue en el botón de carrito)
  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.closest(".add-to-cart-btn")) return;
    navigate(`/productos/${slug}`);
  };

  return (
    <div
      className="
        bg-white rounded-4xl shadow-md border border-blue-100
        transition-transform hover:scale-105 hover:shadow-xl cursor-pointer
        w-[280px] h-[320px] flex flex-col justify-between
        mx-auto p-
      "
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalle de ${nombre}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(`/productos/${slug}`);
      }}
    >
      <div className="h-80 w-full flex items-center justify-center bg-white">
        {imagen ? (
          <img src={imagen} alt={nombre} className="object-contain h-32 w-full" />
        ) : (
          <span className="text-blue-200">Sin imagen</span>
        )}
      </div>
      <div className="flex-1 flex flex-col px-4 py-3 justify-between">
        <h4 className="text-blue-800 font-bold text-base truncate mb-2">{nombre}</h4>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{descripcion}</p>
        <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm shadow w-fit mb-3">
          S/. {precio.toFixed(2)}
        </span>
        <div className="flex justify-end items-end mt-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="
              add-to-cart-btn flex items-center justify-center
              rounded-lg border border-green-500 bg-white
              hover:bg-green-100 active:bg-green-200
              transition-all duration-150
              shadow-sm p-0 w-10 h-10
              focus:outline-none focus:ring-2 focus:ring-green-300
              group
            "
            title="Añadir al carrito"
            tabIndex={0}
            aria-label="Añadir al carrito"
          >
            <ShoppingCart className="w-6 h-6 text-green-600 group-hover:text-green-700 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}