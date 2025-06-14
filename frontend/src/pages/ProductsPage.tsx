import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Carousel } from "@/components/Carousel";
import { Publicidad } from '../components/Publicidad';
import Marcas from '../components/Marcas';
import ProductCard from '../components/ui/ProductCard';
import { API_BASE_URL } from '../apiConfig'; 


type ProductoBackend = {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number | string;
  descripcionProducto: string;
  imagenProducto?: string;
  stockProducto: number;
  slug: string;
  categoria: string;
  marca: string;
  estado: string;
};

interface Producto {
  idProducto: number;
  nombreProducto: string;
  precio: number;
  descripcionProducto: string;
  imagenProducto?: string;
  slug: string;
  marca: string;
  stockProducto: number;
}

const MARCAS = [
  "Trébol", "Sloan", "Genebre", "Vainsa", "Helvex", "Leeyes", "Sunmixer"
];

// Cantidad de productos por página (tanto mobile como desktop)
const PAGE_SIZE = 8;

const ProductsPage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMarcas, setFiltroMarcas] = useState<string[]>([]);
  const [precioMax, setPrecioMax] = useState<number>(0);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);

  // Lógica de búsqueda
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/public/productos`)
      .then(res => res.json())
      .then((data: ProductoBackend[]) => {
        const adaptados: Producto[] = data.map((p) => ({
          idProducto: p.idProducto,
          nombreProducto: p.nombreProducto,
          precio: typeof p.precioProducto === "string" ? parseFloat(p.precioProducto) : Number(p.precioProducto),
          descripcionProducto: p.descripcionProducto,
          imagenProducto: p.imagenProducto,
          slug: p.slug,
          marca: p.marca,
          stockProducto: p.stockProducto,
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
    setPaginaActual(1); // Reset a página 1 al cambiar filtro
  };

  // Filtrado por búsqueda, marcas y precio
  const productosFiltrados = productos
    .filter(prod =>
      (filtroMarcas.length === 0 || filtroMarcas.includes(prod.marca)) &&
      prod.precio <= precioMax &&
      prod.nombreProducto.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => a.precio - b.precio);

  // Paginación
  const cantidadResultados = productosFiltrados.length;
  const totalPaginas = Math.ceil(cantidadResultados / PAGE_SIZE);
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * PAGE_SIZE,
    paginaActual * PAGE_SIZE
  );

  const cambiarPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) setPaginaActual(pagina);
  };

  // Renderizador de paginación
  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 my-6">
      <button
        onClick={() => cambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-2 py-1 text-blue-700 disabled:text-gray-400"
        aria-label="Página anterior"
      >
        &lt;
      </button>
      {Array.from({ length: totalPaginas }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => cambiarPagina(i + 1)}
          className={`px-2 py-1 rounded ${paginaActual === i + 1 ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => cambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-2 py-1 text-blue-700 disabled:text-gray-400"
        aria-label="Página siguiente"
      >
        &gt;
      </button>
    </div>
  );

  return (
    <div>
      <Carousel />

      {/* Filtros y cantidad en mobile */}
      <div className="block lg:hidden px-4 mb-4">
        <div className="bg-white rounded-lg shadow p-4 mb-2 flex flex-col gap-4">
          <div>
            <span className="font-semibold">Marca</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {MARCAS.map(marca => (
                <label key={marca} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={filtroMarcas.includes(marca)}
                    onChange={() => handleMarcaChange(marca)}
                    className="accent-blue-600"
                  />
                  <span className="text-sm">{marca}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold">Precio máximo</span>
            <input
              type="range"
              min={precioMasBajo}
              max={precioMasAlto}
              value={precioMax}
              onChange={e => setPrecioMax(Number(e.target.value))}
              className="w-full accent-sky-500"
              disabled={precioMasBajo === precioMasAlto}
            />
            <div className="flex justify-between text-xs mt-1">
              <span>S/. {precioMasBajo}</span>
              <span className="font-semibold text-sky-700">Hasta S/. {precioMax}</span>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-700 mb-2">{cantidadResultados} Resultados</div>
      </div>

      {/* Filtros y cantidad en desktop */}
      <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-1/4 flex-shrink-0">
          <div className="mb-4">
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
                  className="accent-blue-600"
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
          <div className="text-sm font-medium text-gray-700 mb-2">{cantidadResultados} Resultados</div>
        </aside>

        {/* Grilla de productos */}
        <main className="w-full lg:w-3/4">
          <div className="text-sm font-medium text-gray-700 mb-2 hidden lg:block">{cantidadResultados} Resultados</div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center">Cargando productos...</div>
            ) : productosPaginados.length === 0 ? (
              <div className="col-span-full text-center">No hay productos disponibles.</div>
            ) : (
              productosPaginados.map(producto => (
                <ProductCard
                  key={producto.idProducto}
                  nombre={producto.nombreProducto}
                  descripcion={producto.descripcionProducto}
                  imagen={producto.imagenProducto}
                  slug={producto.slug}
                  precio={producto.precio}
                  stock={producto.stockProducto}
                />
              ))
            )}
          </div>
          {/* Paginación */}
          {totalPaginas > 1 && <Pagination />}
        </main>
      </div>

      <Publicidad textoPromocional="Delivery gratis a compras mayores a 200" />
      <Marcas />
    </div>
  );
};

export default ProductsPage;