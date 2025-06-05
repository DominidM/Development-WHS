import React, { useEffect, useState } from 'react';
import { Carousel } from "@/components/Carousel";
import { Publicidad } from '../components/Publicidad';
import Marcas from '../components/Marcas';
import ProductCard from '../components/ui/ProductCard';

// Define el tipo que viene del backend (con nombres exactos)
type ProductoBackend = {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number | string; // Puede llegar como string si es BigDecimal
  descripcionProducto: string;
  imagenProducto?: string;
  stockProducto: number;
  slug: string;
  categoria: string;
  marca: string;
  estado: string;
};

// Tipo para el frontend, para usarlo con seguridad
interface Producto {
  idProducto: number;
  nombreProducto: string;
  precio: number;
  descripcionProducto: string;
  imagenProducto?: string;
  slug: string;
  marca: string;
}

const MARCAS = [
  "Trebol", "Sloan", "Genebre", "Vainsa", "Helvex", "Leeyes", "Sunmixer", "Otros"
];

const ProductsPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMarcas, setFiltroMarcas] = useState<string[]>([]);
  const [precioMax, setPrecioMax] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:8081/producto")
      .then(res => res.json())
      .then((data: ProductoBackend[]) => {
        // Adaptar los nombres y tipos
        const adaptados: Producto[] = data.map((p) => ({
          idProducto: p.idProducto,
          nombreProducto: p.nombreProducto,
          precio: typeof p.precioProducto === "string" ? parseFloat(p.precioProducto) : Number(p.precioProducto),
          descripcionProducto: p.descripcionProducto,
          imagenProducto: p.imagenProducto,
          slug: p.slug,
          marca: p.marca,
        }));
        setProductos(adaptados);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const hayProductos = productos.length > 0;
  const precios = productos.map(p => p.precio);
  const precioMasBajo = hayProductos ? Math.min(...precios) : 0;
  const precioMasAlto = hayProductos ? Math.max(...precios) : 0;

  useEffect(() => {
    if (hayProductos) {
      setPrecioMax(precioMasAlto);
    }
  }, [precioMasAlto, hayProductos]);

  const handleMarcaChange = (marca: string) => {
    setFiltroMarcas(prev =>
      prev.includes(marca)
        ? prev.filter(m => m !== marca)
        : [...prev, marca]
    );
  };

  const productosFiltrados = productos
    .filter(prod =>
      (filtroMarcas.length === 0 || filtroMarcas.includes(prod.marca)) &&
      prod.precio <= precioMax
    )
    .sort((a, b) => a.precio - b.precio);

  return (
    <div>
      <Carousel />
      <div className="container mx-auto py-8 grid grid-cols-4 gap-8">
        {/* Barra lateral de filtros */}
        <aside className="col-span-1">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Marca</h3>
            {MARCAS.map(marca => (
              <div key={marca}>
                <input
                  type="checkbox"
                  id={marca.toLowerCase()}
                  name="marca"
                  value={marca}
                  checked={filtroMarcas.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                />
                <label htmlFor={marca.toLowerCase()} className="ml-2">{marca}</label>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Precio</h3>
            {hayProductos ? (
              <>
                <input
                  type="range"
                  min={precioMasBajo}
                  max={precioMasAlto}
                  value={precioMax}
                  onChange={e => setPrecioMax(Number(e.target.value))}
                  className="w-full accent-sky-500"
                  disabled={precioMasBajo === precioMasAlto}
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>S/. {precioMasBajo}</span>
                  <span className="font-semibold text-sky-700">Hasta S/. {precioMax}</span>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">No hay productos para filtrar</div>
            )}
          </div>
        </aside>

        {/* Grilla de productos */}
        <main className="col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center">Cargando productos...</div>
          ) : productosFiltrados.length === 0 ? (
            <div className="col-span-full text-center">No hay productos disponibles.</div>
          ) : (
            productosFiltrados.map(producto => (
              <ProductCard
                key={producto.idProducto}
                nombre={producto.nombreProducto}
                descripcion={producto.descripcionProducto}
                imagen={producto.imagenProducto}
                slug={producto.slug}
                precio={producto.precio}
              />
            ))
          )}
        </main>
      </div>
      <Publicidad textoPromocional="Delivery gratis a compras mayores a 200" />
      <Marcas />
    </div>
  );
};

export default ProductsPage;