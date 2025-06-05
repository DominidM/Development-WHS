import { useEffect, useState } from "react";

interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number;
  descripcionProducto: string;
  imagenProducto?: string;
  slug: string;
  marca: string;
}

export default function ProductDetail({ slug }: { slug: string }) {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProducto(null); setError(null);
    console.log("Haciendo fetch a:", `/api/producto/${slug}`);
    fetch(`/api/producto/${slug}`)
      .then(res => {
        console.log("Status de respuesta:", res.status);
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(data => {
        console.log("Producto recibido:", data);
        setProducto(data);
      })
      .catch((e) => {
        console.error("Error en fetch:", e);
        setError("Producto no encontrado");
      });
  }, [slug]);

  console.log("slug recibido:", slug);

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!producto) return <div className="p-8 text-center text-gray-400">Cargando producto...</div>;
  return (
    <div>
      <h1>{producto.nombreProducto}</h1>
      {/* etc... */}
    </div>
  );
}