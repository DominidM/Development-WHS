import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Publicidad } from '../components/Publicidad';
import Marcas from '../components/Marcas';
import ProductDetail from '../components/ui/ProductDetail';

export function DetalleProducto() {
  const { slug } = useParams();
  return (
    <div>
      <Hero />
      <div className="container mx-auto py-10 px-4">
        {slug && <ProductDetail slug={slug} />}
      </div>
      <Publicidad textoPromocional="Delivery gratis a compras mayores a 200" />
      <Marcas />
    </div>
  );
}