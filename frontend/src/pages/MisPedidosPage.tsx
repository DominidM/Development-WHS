import React, { useEffect, useState } from "react";

type Pedido = {
  idPedido: number;
  fecha: string;
  montoTotal: number;
  estadoPago: string;
  items: {
    productoId: number;
    nombreProducto: string;
    cantidad: number;
    precioUnitario: number;
  }[];
  historialEstados?: {
    comentario: string;
    estado: string;
    fechaEstado: string;
  }[];
};

function getUsuarioActual() {
  const u = window.localStorage.getItem("usuario");
  return u ? JSON.parse(u) : null;
}

const MisPedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Solo obtener el usuario una vez al montar el componente
  const [usuario] = useState(getUsuarioActual());

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!usuario) {
          setPedidos([]);
          setLoading(false);
          return;
        }
        // Aquí debes pasar el token si tu backend lo requiere
        const res = await fetch("/api/public/pedidos/mis-pedidos", {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer TOKEN' // Si usas JWT
          },
        });
        if (!res.ok) throw new Error("No se pudieron obtener los pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar los pedidos");
        }
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, [usuario?.id]); // Si usuario no cambia, también puedes usar []

  if (!usuario) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Mis Pedidos</h1>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded text-center">
          Debes iniciar sesión para ver tus pedidos.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Pedidos</h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[150px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-blue-700">Cargando pedidos...</span>
        </div>
      ) : pedidos.length === 0 ? (
        <div className="bg-blue-50 text-blue-800 p-4 rounded text-center">
          No tienes pedidos registrados.
        </div>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.idPedido}
              className="border rounded-lg shadow-sm p-6 bg-white hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <div>
                  <span className="font-semibold">Pedido #{pedido.idPedido}</span>
                  <span className="ml-3 text-gray-500">
                    {new Date(pedido.fecha).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-sm font-medium 
                      ${
                        pedido.estadoPago === "Entregado"
                          ? "bg-green-100 text-green-700"
                          : pedido.estadoPago === "En camino"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {pedido.estadoPago}
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Producto</th>
                      <th className="text-center py-2 px-2">Cantidad</th>
                      <th className="text-right py-2 px-2">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedido.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-2">{item.nombreProducto}</td>
                        <td className="py-2 px-2 text-center">{item.cantidad}</td>
                        <td className="py-2 px-2 text-right">S/ {item.precioUnitario.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <span className="font-semibold text-lg">
                  Total: S/ {pedido.montoTotal.toFixed(2)}
                </span>
              </div>
              {/* Historial de estados/pagos, si lo quieres mostrar */}
              {pedido.historialEstados && pedido.historialEstados.length > 0 && (
                <div className="mt-4">
                  <div className="font-semibold mb-1">Historial de estados:</div>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {pedido.historialEstados.map((estado, i) => (
                      <li key={i}>
                        <span className="font-medium">{estado.estado}</span>
                        {estado.comentario && (
                          <span className="ml-2 italic">({estado.comentario})</span>
                        )}
                        <span className="ml-2">
                          {new Date(estado.fechaEstado).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mt-6 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default MisPedidosPage;