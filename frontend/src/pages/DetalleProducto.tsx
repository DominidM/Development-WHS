import { useParams } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Publicidad } from '../components/Publicidad';
import  Marcas from '../components/Marcas'; // Importa el nuevo componente

export function DetalleProducto() {
  const { id } = useParams();

  // Adasdadasdquí puedes usar el id para hacer una llamada a la API y obtener los detalles del producto
  // c
  // 
  // onst [producto, setProducto] = useState<Producto | null>(null);
  return (
    <div>
        <Hero />  

    
      <h1>Detalle del producto: {id}</h1>
      {/* Renderiza la especificación aquí */}
      <Publicidad textoPromocional="Delivery gratis a compras mayores a 200" />
      <Marcas/>
    </div>
  );
}
