import React, { useState } from "react";

// Estructura del usuario en localStorage
type UsuarioStorage = {
  idUsuario: number;
  nombrePersona: string;
  correoPersona: string;
  token?: string;
};

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

function getUsuarioActual(): UsuarioStorage | null {
  const u = window.localStorage.getItem("usuario");
  return u ? JSON.parse(u) : null;
}

const MisPedidosPage: React.FC = () => {
  // Estado para datos
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [usuario] = useState<UsuarioStorage | null>(getUsuarioActual());

  // Estado para la interfaz y lógica
  const [passwordInput, setPasswordInput] = useState(""); // Contraseña ingresada por el usuario
  const [isAuthorized, setIsAuthorized] = useState(false); // ¿Ya se validó la contraseña?
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para llamar al API cuando el usuario envía el formulario
  const handleVerPedidos = async (e: React.FormEvent) => {
    e.preventDefault(); // Evitar recarga de página
    setError(null);
    setLoading(true);

    try {
      if (!usuario?.correoPersona) {
        throw new Error("No se encontró información de sesión.");
      }

      if (!passwordInput) {
        throw new Error("Por favor ingresa tu contraseña.");
      }

      // Codificamos credenciales para Basic Auth
      const credentials = btoa(`${usuario.correoPersona}:${passwordInput}`);

      const res = await fetch("http://localhost:8081/api/user/pedidos/mis-pedidos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`
        },
      });

      if (res.status === 401 || res.status === 403) {
        throw new Error("Contraseña incorrecta. Inténtalo de nuevo.");
      }

      if (!res.ok) {
        throw new Error("Error al conectar con el servidor.");
      }

      const data = await res.json();
      setPedidos(data);
      setIsAuthorized(true); // ¡Éxito! Ocultamos el form de contraseña y mostramos la lista

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
      // Si falla, nos aseguramos de que no pase a la pantalla de pedidos
      setIsAuthorized(false);
      setPedidos([]); 
    } finally {
      setLoading(false);
    }
  };

  // 1. Caso: No hay usuario en localStorage
  if (!usuario) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded border border-yellow-200">
          Debes iniciar sesión para ver tus pedidos.
        </div>
      </div>
    );
  }

  // 2. Caso: Usuario existe pero aún no ha ingresado su contraseña (o falló)
  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Seguridad de la Cuenta
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-center mb-6">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
              <i className="bi bi-shield-lock"></i>
            </div>
            <h2 className="text-lg font-semibold">Hola, {usuario.nombrePersona}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Por seguridad, confirma tu contraseña para visualizar tu historial de pedidos.
            </p>
          </div>

          <form onSubmit={handleVerPedidos}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pass">
                Contraseña
              </label>
              <input
                id="pass"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100 flex items-center">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Verificando...
                </span>
              ) : (
                "Ver Mis Pedidos"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Caso: Autorizado (Muestra la lista de pedidos)
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Pedidos</h1>
        <button 
          onClick={() => setIsAuthorized(false)} 
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Cerrar vista segura
        </button>
      </div>
      
      {pedidos.length === 0 ? (
        <div className="bg-blue-50 text-blue-800 p-8 rounded-lg text-center border border-blue-200">
          <i className="bi bi-bag-x text-4xl mb-3 block opacity-50"></i>
          <p className="text-lg">No tienes pedidos registrados en tu historial.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div key={pedido.idPedido} className="border rounded-lg shadow-sm bg-white overflow-hidden">
               {/* Encabezado Pedido */}
               <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:justify-between md:items-center border-b">
                  <div>
                    <span className="font-bold text-lg text-gray-800">Pedido #{pedido.idPedido}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-sm text-gray-600">
                      {new Date(pedido.fecha).toLocaleDateString()} {new Date(pedido.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${pedido.estadoPago === 'PAGADO' ? 'bg-green-100 text-green-700 border border-green-200' : 
                        pedido.estadoPago === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 
                        'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                      {pedido.estadoPago}
                    </span>
                    <div className="font-bold text-xl text-blue-700">
                      S/ {pedido.montoTotal.toFixed(2)}
                    </div>
                  </div>
               </div>
               
               {/* Contenido del pedido */}
               <div className="p-4">
                 <div className="overflow-x-auto">
                   <table className="min-w-full text-sm text-left">
                     <thead>
                       <tr className="text-gray-500 border-b border-gray-100">
                         <th className="pb-2 font-medium w-1/2">Producto</th>
                         <th className="pb-2 font-medium text-center">Cantidad</th>
                         <th className="pb-2 font-medium text-right">Precio Unit.</th>
                         <th className="pb-2 font-medium text-right">Subtotal</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                       {pedido.items.map((item, idx) => (
                         <tr key={idx} className="hover:bg-gray-50 transition-colors">
                           <td className="py-3 pr-2 font-medium text-gray-700">{item.nombreProducto}</td>
                           <td className="py-3 px-2 text-center text-gray-600">{item.cantidad}</td>
                           <td className="py-3 px-2 text-right text-gray-600">S/ {item.precioUnitario.toFixed(2)}</td>
                           <td className="py-3 pl-2 text-right font-semibold text-gray-800">
                              S/ {(item.cantidad * item.precioUnitario).toFixed(2)}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPedidosPage;