import { useCart } from "../ui/CartContext";
import { useState } from "react";

export function Cart() {
  const { items, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  // Estado para método de pago y servicio extra usando los IDs REALES de la BD
  const [metodoPago, setMetodoPago] = useState<number>(1); // 1: MercadoPago
  const [extraServicio, setExtraServicio] = useState<number>(1); // 1: Sin servicio extra

  // Estado para mostrar/ocultar descripción por producto
  const [showDescriptions, setShowDescriptions] = useState<{ [id: string]: boolean }>({});

  const handleToggleDescription = (id: string) => {
    setShowDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const totalProductos = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Busca el costo según el extra seleccionado
  const extraServiciosCatalogo = [
    { id: 1, nombre: "Sin servicio extra", costo: 0.00 },
    { id: 2, nombre: "Instalación", costo: 50.00 },
    { id: 3, nombre: "Mantenimiento", costo: 30.00 },
    { id: 4, nombre: "Garantía extendida", costo: 25.00 }
  ];
  const costoExtra = extraServiciosCatalogo.find(e => e.id === extraServicio)?.costo ?? 0;
  const totalGeneral = totalProductos + costoExtra;

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
        (extraServicio !== 1
          ? ` + ${extraServiciosCatalogo.find(e => e.id === extraServicio)?.nombre}`
          : "");

      const cantidad = items.reduce((acc, item) => acc + item.quantity, 0);

      if (items.some(item => !item.productId || isNaN(item.productId))) {
        alert("Hay productos con datos inválidos en el carrito. Intenta eliminarlos y agregarlos de nuevo.");
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8081/api/public/pedidos/pagar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          descripcion,
          monto: totalGeneral,
          cantidad,
          pkUsuario: userId,
          items: items.map(item => ({
            pkProductoPedido: item.productId,
            cantidadPedido: item.quantity
          })),
          pkMetodoPago: metodoPago,
          pkExtra: extraServicio
        }),
      });

      const data = await response.json();

      if (data.tipo === "mercadopago" && data.link) {
        window.location.href = data.link;
      } else if (data.tipo === "efectivo") {
        // Muestra un voucher o número de pedido
        alert(`¡Pedido registrado!\n\nNúmero de pedido: ${data.numeroPedido}\n${data.mensaje}\n${data.voucherUrl ? `Descarga tu comprobante aquí: ${data.voucherUrl}` : ''}`);
        // Aquí puedes redirigir a una página de confirmación o mostrar el voucher en pantalla
      } else if (data.tipo === "transferencia") {
        // Muestra datos bancarios y mensaje
        alert(`¡Pedido registrado!\n\nNúmero de pedido: ${data.numeroPedido}\n${data.mensaje}\nBanco: ${data.datosBancarios?.banco}\nCuenta: ${data.datosBancarios?.cuenta}\nTitular: ${data.datosBancarios?.titular}`);
        // Aquí puedes mostrar un botón para cargar el comprobante, si lo implementas
      } else {
        // Fallback para otros métodos o errores
        alert('Pedido registrado. Revisa tu correo para más información.');
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
        {/* Lista de productos, ahora con scroll si hay muchos */}
        <div className="flex-1 bg-white border rounded-x1 p-8 space-y-7"
             style={{ maxHeight: 520, overflowY: "auto" }}>
          {items.length === 0 && <div className="text-gray-500">Tu carrito está vacío.</div>}
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-10 border-b pb-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 bg-gray-200 rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                {/* Toggle descripción */}
                <button
                  className="text-xs text-blue-700 underline mb-1"
                  onClick={() => handleToggleDescription(item.id)}
                  type="button"
                  tabIndex={0}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                >
                  {showDescriptions[item.id] ? "Ocultar descripción" : "Ver descripción"}
                </button>
                {showDescriptions[item.id] && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-800"> S/{item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="line-through text-gray-400 text-xs"> S/{item.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <label className="text-sm mt-2 block">Cant</label>
                <select
                  className="border rounded px-2 py-1 mt-1"
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
          {/* Selectores mejor presentados */}
          <div className="mb-6">
            {/* Servicio extra */}
            <div className="flex flex-col mb-4">
              <label htmlFor="extraServicio" className="font-semibold mb-1 text-gray-700">
                Servicio extra:
              </label>
              <select
                id="extraServicio"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition"
                value={extraServicio}
                onChange={e => setExtraServicio(Number(e.target.value))}
              >
                {extraServiciosCatalogo.map(serv => (
                  <option key={serv.id} value={serv.id}>
                    {serv.nombre} {serv.costo > 0 ? `(S/ ${serv.costo.toFixed(2)})` : ""}
                  </option>
                ))}
              </select>
            </div>
            {/* Método de pago */}
            <div className="flex flex-col">
              <label htmlFor="metodoPago" className="font-semibold mb-1 text-gray-700">
                Método de pago:
              </label>
              <select
                id="metodoPago"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition"
                value={metodoPago}
                onChange={e => setMetodoPago(Number(e.target.value))}
              >
                <option value={1}>MercadoPago</option>
                <option value={2}>Efectivo</option>
                <option value={3}>Transferencia</option>
              </select>
            </div>
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