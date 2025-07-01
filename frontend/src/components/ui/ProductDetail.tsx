import { useEffect, useState } from "react";
import { Heart, Truck } from "lucide-react";
import { useCart } from "./CartContext";
import { API_BASE_URL } from '../../apiConfig'; 

interface ProductDetailProps {
  slug: string;
}

interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number;
  descripcionProducto: string;
  imagenProducto?: string;
  slug: string;
  marca: string;
  stockProducto?: number;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);

  const { addItem, items } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/public/productos/${slug}`)
      .then(res => res.json())
      .then(setProducto)
      .catch(() => setProducto(null));
  }, [slug]);

  // Limitar cantidad máxima si hay stock
  const stockDisponible = producto?.stockProducto ?? 0;

  // Buscar si ya está en el carrito y cuántos hay
  const cartItem = items.find(item => item.id === (producto?.idProducto?.toString() ?? ""));
  const cantidadEnCarrito = cartItem?.quantity ?? 0;
  // El máximo que puede seleccionar es el stock menos lo que ya tiene en el carrito
  const cantidadMaxSeleccionable = Math.max(0, stockDisponible - cantidadEnCarrito);

  // Si cambia el producto, resetea cantidad
  useEffect(() => {
    setCantidad(1);
  }, [producto?.idProducto]);

  if (!producto) {
    return <div className="text-center py-12 text-gray-400">Cargando producto...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:p-8">
        {/* Imagen principal con zoom al hover */}
        <div className="flex flex-col items-center">
          <div className="relative w-full flex justify-center">
            <div className="bg-blue-50 rounded-lg flex items-center justify-center h-80 w-full max-w-md group overflow-hidden border border-blue-100">
              {producto.imagenProducto ? (
                <img
                  src={producto.imagenProducto}
                  alt={producto.nombreProducto}
                  className="h-72 transition-transform duration-300 object-contain group-hover:scale-110"
                  onError={e => { e.currentTarget.src = "https://via.placeholder.com/240x200?text=Sin+imagen"; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-blue-200">Sin imagen</div>
              )}
            </div>
          </div>
        </div>

        {/* Info y acción */}
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Marca y favorito */}
            <div className="flex items-start justify-between mb-2">
              <span className="uppercase text-xs font-semibold tracking-widest text-blue-600">{producto.marca}</span>
              <button className="p-1 rounded-full hover:bg-blue-100 transition-colors">
                <Heart className="w-6 h-6 text-blue-500" />
              </button>
            </div>
            {/* Nombre */}
            <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">{producto.nombreProducto}</h1>
            {/* Código producto */}
            <div className="text-xs text-gray-400 mb-1">Código: {producto.idProducto}</div>
            {/* Precios */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-gray-400 text-sm line-through">S/. {(producto.precioProducto * 1.1).toFixed(2)} pza</div>
              <div>
                <div className="text-xs text-gray-600">Precio Internet</div>
                <div className="text-xl font-bold text-blue-800">S/. {producto.precioProducto.toFixed(2)} pza</div>
              </div>
            </div>
            {/* Cantidad y acciones */}
            <div className="flex items-center gap-2 mb-4">
              <button
                className="w-8 h-8 rounded border border-blue-300 text-blue-700 font-bold hover:bg-blue-100 active:bg-blue-200 transition"
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                aria-label="Disminuir cantidad"
                disabled={cantidad <= 1}
              >-</button>
              <span className="text-lg font-semibold w-6 text-center">{cantidad}</span>
              <button
                className="w-8 h-8 rounded border border-blue-300 text-blue-700 font-bold hover:bg-blue-100 active:bg-blue-200 transition"
                onClick={() => setCantidad(Math.min(cantidadMaxSeleccionable, cantidad + 1))}
                aria-label="Aumentar cantidad"
                disabled={cantidad >= cantidadMaxSeleccionable}
              >+</button>
              <span className={`ml-2 text-xs ${cantidadMaxSeleccionable === 0 ? "text-red-500" : "text-gray-500"}`}>
                {cantidadMaxSeleccionable === 0 ? "Sin stock" : `Stock: ${cantidadMaxSeleccionable}`}
              </span>
            </div>
            {/* Botón principal de carrito */}
            <button
              className="flex items-center justify-center w-full py-3 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold shadow transition mb-3 gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={() => {
                if (cantidadMaxSeleccionable === 0) return;
                addItem({
                  id: producto.idProducto.toString(), // string único para UI
                  productId: producto.idProducto,     // numérico para backend
                  name: producto.nombreProducto,
                  price: producto.precioProducto,
                  quantity: cantidad,
                  image: producto.imagenProducto,
                  stock: stockDisponible,
                  brand: producto.marca,
                  description: producto.descripcionProducto,
                });
              }}
              disabled={cantidadMaxSeleccionable === 0}
            >
              <Truck className="w-5 h-5" />
              Agregar al carro
            </button>
          </div>
        </div>
      </div>
      {/* Descripción ampliada */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-3">Descripción</h2>
        {producto.descripcionProducto ? (
          <p className="text-gray-700 mb-6">{producto.descripcionProducto}</p>
        ) : (
          <p className="text-gray-400 mb-6">Sin descripción disponible.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Características</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>Marca: {producto.marca}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Cuidados y Envío</h3>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>Limpieza y uso adecuado.</li>
              <li>Delivery gratis a compras mayores a S/. 200</li>
              <li>Consulta políticas de devolución.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}