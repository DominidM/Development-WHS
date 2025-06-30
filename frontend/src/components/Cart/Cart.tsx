import { useCart } from "../ui/CartContext";
import { useState } from "react";
import { API_BASE_URL } from '../../apiConfig';

export function Cart() {
  const { items, updateQuantity, removeItem } = useCart();
  const [servicioInstalacion, setServicioInstalacion] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const totalProductos = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const costoInstalacion = servicioInstalacion ? 100 : 0;
  const totalGeneral = totalProductos + costoInstalacion;

  // Obtén el usuario logueado desde localStorage con la clave correcta
  let userId: number | undefined = undefined;
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    userId = usuario?.idUsuario;
  } catch {
    userId = undefined;
  }

  const handleCheckout = async () => {
    if (items.length === 0 || !userId) {
      alert("Debes tener productos en el carrito y estar logueado.");
      return;
    }

    setLoading(true);

    try {
      const descripcion =
        items.map(item => `${item.quantity}x ${item.name}`).join(", ") +
        (servicioInstalacion ? " + instalación" : "");

      const cantidad = items.reduce((acc, item) => acc + item.quantity, 0);

      const response = await fetch(`${API_BASE_URL}/api/public/pedidos/pagar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          descripcion,
          monto: totalGeneral,
          cantidad,
          pkUsuario: userId,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = await response.text();
        alert("Error al proceder con el pago:\n" + errorText.slice(0, 200));
        return;
      }

      if (contentType && contentType.includes("application/json")) {
        // Respuesta como JSON: recomendado
        const data = await response.json();
        if (data.link) {
          window.location.href = data.link;
        } else {
          alert("El backend no devolvió un link de pago válido.");
        }
      } else if (contentType && contentType.includes("text/html")) {
        // El backend devolvió HTML (probablemente el login)
        const html = await response.text();
        alert("El backend devolvió HTML (probablemente el login):\n" + html.slice(0, 200));
      } else {
        // Respuesta como texto plano (string)
        const text = await response.text();
        if (text.startsWith("http")) {
          window.location.href = text;
        } else {
          alert("Respuesta inesperada del backend:\n" + text.slice(0, 200));
        }
      }
    } catch (error) {
      alert("Ocurrió un error al proceder con la transacción.\n" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-1 bg-white">
      <h2 className="text-2xl font-bold mb-6">Carro de compras</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Lista de productos */}
        <div className="flex-1 bg-white border rounded-x1 p-8 space-y-7">
          {items.length === 0 && <div className="text-gray-500">Tu carrito está vacío.</div>}
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-10 border-b pb-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 bg-gray-200 rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-800"> S/{item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="line-through text-gray-400 text-xs"> S/{item.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <label className="text-sm mt-2 block">Cant</label>
                <select
                  className="border rounded px-2 py-1 mt1"
                  value={item.quantity}
                  onChange={e =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                >
                  {[...Array((item.stock ?? 10)).keys()].map(n => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              {/* Botón para eliminar producto */}
              <button
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => removeItem(item.id)}
                title="Eliminar producto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="w-full md:w-80 bg-gray-100 rounded-xl p-4">
          <div className="mb-2 flex justify-between">
            <span>Artículos ({items.reduce((acc, item) => acc + item.quantity, 0)})</span>
            <span className="font-semibold">S/ {totalProductos.toFixed(2)}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Envío a 15000</span>
            <span className="text-green-600 font-semibold">Gratis</span>
          </div>
          <div className="mb-2 flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-green-500"
                checked={servicioInstalacion}
                onChange={() => setServicioInstalacion(v => !v)}
              />
              <span>Servicio de instalación</span>
            </label>
            <span className="font-semibold">{servicioInstalacion ? "S/ 100.00" : "S/ 0.00"}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Subtotal</span>
            <span>S/ {totalGeneral.toFixed(2)}</span>
          </div>
          <button
            className="
              mt-6 w-full py-3
              bg-gradient-to-r from-green-400 to-blue-500
              hover:from-green-500 hover:to-blue-600
              text-white font-bold rounded-xl
              shadow-lg transition transform duration-300
              hover:scale-105 hover:shadow-2xl
              flex items-center justify-center gap-3
              group
            "
            disabled={loading || items.length === 0}
            onClick={handleCheckout}
          >
            <span className="transition-all duration-300 group-hover:-translate-y-1">
              <svg
                className="inline mr-2"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="7" width="20" height="13" rx="2" fill="#a3f9bb" />
                <rect x="5" y="10" width="5" height="3" rx="1.5" fill="#56be3e" />
                <circle cx="10" cy="16" r="1" fill="#379e1f" />
                <circle cx="14" cy="16" r="1" fill="#379e1f" />
                <circle cx="18" cy="16" r="1" fill="#379e1f" />
              </svg>
            </span>
            {loading ? "Redirigiendo..." : "Completar la transacción"}
          </button>
          <div className="flex justify-center items-center gap-2 mt-4">
            <img src="./assets/visa.png" alt="Visa" className="h-6" />
            <img src="./assets/yape.png" alt="Yape" className="h-6" />
            <img src="./assets/efectivo.png" alt="Efectivo" className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}