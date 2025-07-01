import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

interface ProductCardProps {
  id: number; // <-- obligatorio y numérico
  nombre: string;
  descripcion: string;
  imagen?: string;
  slug: string;
  precio: number;
  precioOriginal?: number;
  stock?: number;
}

export default function ProductCard({
  id,
  nombre,
  descripcion,
  imagen,
  slug,
  precio,
  precioOriginal,
  stock,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem, items } = useCart();

  const handleCardClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.closest(".add-to-cart-btn")) return;
    navigate(`/productos/${slug}`);
  };

  const cartItem = items.find(
    item => item.id === id.toString()
  );
  const cantidadEnCarrito = cartItem?.quantity ?? 0;
  const stockDisponible = typeof stock === "number" ? stock : 0;

  const handleAddToCart = () => {
    if (typeof id !== "number" || isNaN(id)) {
      alert("ID de producto no válido. No se puede agregar al carrito.");
      return;
    }
    if (stockDisponible === 0) {
      alert("Producto sin stock.");
      return;
    }
    if (cantidadEnCarrito >= stockDisponible) {
      alert("Ya tienes el máximo disponible de este producto en el carrito.");
      return;
    }
    addItem({
      id: id.toString(),      // string único para la UI
      productId: id,          // numérico para el backend
      name: nombre,
      price: precio,
      quantity: 1,
      image: imagen,
      stock: stockDisponible,
      description: descripcion,
    });
  };

  return (
    <div
      className="
        bg-white rounded-4xl shadow-md border border-blue-100
        transition-transform hover:scale-105 hover:shadow-xl cursor-pointer
        w-[280px] h-[320px] flex flex-col justify-between
        mx-auto
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
          <img
            src={imagen}
            alt={nombre}
            className="object-contain h-32 w-full"
            onError={e => { e.currentTarget.src = ""; }}
          />
        ) : (
          <span className="text-blue-200">Sin imagen</span>
        )}
      </div>
      <div className="flex-1 flex flex-col px-4 py-3 justify-between">
        <h4 className="text-blue-800 font-bold text-base truncate mb-2">{nombre}</h4>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{descripcion}</p>
        <div className="mb-3">
          {precioOriginal && precioOriginal !== precio ? (
            <>
              <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-sm shadow w-fit mr-3">
                S/. {precio.toFixed(2)}
              </span>
              <span className="text-gray-400 line-through text-sm">
                S/. {precioOriginal.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-sm shadow w-fit">
              S/. {precio.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex justify-between items-end mt-auto">
          <span className={`text-xs font-medium mr-2 ${stockDisponible === 0 ? "text-red-600" : "text-green-700"}`}>
            {stockDisponible === 0 ? "Sin stock" : `Stock: ${stockDisponible}`}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
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
            disabled={stockDisponible === 0 || cantidadEnCarrito >= stockDisponible}
          >
            <ShoppingCart className="w-6 h-6 text-green-600 group-hover:text-green-700 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}