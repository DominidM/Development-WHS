import { useEffect, useState } from "react";

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
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8081/producto/${slug}`)
      .then(res => res.json())
      .then(setProducto)
      .catch(() => setProducto(null));
  }, [slug]);

  if (!producto) {
    return <div className="text-center py-12 text-gray-400">Cargando producto...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Imagen principal */}
      <div>
        <div className="bg-blue-50 rounded-lg flex items-center justify-center h-80 mb-4">
          {producto.imagenProducto ? (
            <img src={producto.imagenProducto} alt={producto.nombreProducto} className="h-72 object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-200">Sin imagen</div>
          )}
        </div>
        {/* Miniaturas (dummy, puedes adaptar para varias imágenes) */}
        <div className="flex gap-2 justify-center">
          {[producto.imagenProducto, producto.imagenProducto, producto.imagenProducto, producto.imagenProducto].map((img, i) =>
            <div key={i} className="w-16 h-16 rounded bg-blue-100 flex items-center justify-center overflow-hidden">
              {img ? <img src={img} alt="" className="h-full object-contain" /> : <span />}
            </div>
          )}
        </div>
      </div>

      {/* Info y acción */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">{producto.nombreProducto}</h1>
          <div className="text-xl font-semibold text-blue-600 mb-4">S/. {producto.precioProducto.toFixed(2)}</div>
          <p className="text-gray-600 mb-6">{producto.descripcionProducto}</p>
          <div className="flex items-center gap-3 mb-6">
            {/* Selector cantidad */}
            <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">-</button>
            <span className="text-lg font-semibold">1</span>
            <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">+</button>
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-400 text-white font-bold shadow mb-3 hover:from-blue-800 hover:to-blue-500 transition-all">
            Añadir al carrito
          </button>
          <div className="text-xs text-blue-800 text-center mb-4">Envío gratis a partir de S/. 200</div>
        </div>
        {/* Acordeones simples */}
        <div className="mt-4 border-t divide-y">
          <details className="py-2 cursor-pointer">
            <summary className="font-medium text-blue-800">Características</summary>
            <div className="text-sm text-gray-600 pt-2">- Marca: {producto.marca}</div>
          </details>
          <details className="py-2 cursor-pointer">
            <summary className="font-medium text-blue-800">Cuidados</summary>
            <div className="text-sm text-gray-600 pt-2">Limpieza y uso adecuado.</div>
          </details>
          <details className="py-2 cursor-pointer">
            <summary className="font-medium text-blue-800">Envío</summary>
            <div className="text-sm text-gray-600 pt-2">Delivery gratis a compras mayores a S/. 200</div>
          </details>
          <details className="py-2 cursor-pointer">
            <summary className="font-medium text-blue-800">Devoluciones</summary>
            <div className="text-sm text-gray-600 pt-2">Consulta políticas de devolución.</div>
          </details>
        </div>
      </div>
    </div>
  );
}