import { useCart } from "../ui/CartContext";
import { useState } from "react";

export function Cart() {
  const { items, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  // Estado para método de pago. 
  // Restaurado a 1 (MercadoPago) como default
  const [metodoPago, setMetodoPago] = useState<number>(1); 
  const [extraServicio, setExtraServicio] = useState<number>(1); // 1: Sin servicio extra

  // Estado para mostrar/ocultar descripción por producto
  const [showDescriptions, setShowDescriptions] = useState<{
    [id: string]: boolean;
  }>({});

  const handleToggleDescription = (id: string) => {
    setShowDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
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
    { id: 1, nombre: "Sin servicio extra", costo: 0.0 },
    { id: 2, nombre: "Instalación", costo: 50.0 },
    { id: 3, nombre: "Mantenimiento", costo: 30.0 },
    { id: 4, nombre: "Garantía extendida", costo: 25.0 },
  ];
  const costoExtra =
    extraServiciosCatalogo.find((e) => e.id === extraServicio)?.costo ?? 0;
  const totalGeneral = totalProductos + costoExtra;

  const handleCheckout = async () => {
    let userId: number | undefined = undefined;
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      // Aceptamos tanto idUsuario (backend) como id (posible legacy)
      userId = usuario?.idUsuario || usuario?.id;
    } catch {
      userId = undefined;
    }
    
    if (items.length === 0 || !userId) {
      alert("Debes tener productos en el carrito y estar logueado.");
      return;
    }

    setLoading(true);

    try {
      const descripcion =
        items.map((item) => `${item.quantity}x ${item.name}`).join(", ") +
        (extraServicio !== 1
          ? ` + ${
              extraServiciosCatalogo.find((e) => e.id === extraServicio)?.nombre
            }`
          : "");

      const cantidad = items.reduce((acc, item) => acc + item.quantity, 0);

      if (items.some((item) => !item.productId || isNaN(item.productId))) {
        alert(
          "Hay productos con datos inválidos en el carrito. Intenta eliminarlos y agregarlos de nuevo."
        );
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:8081/api/public/pedidos/pagar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            descripcion,
            monto: totalGeneral,
            cantidad,
            pkUsuario: userId,
            items: items.map((item) => ({
              pkProductoPedido: item.productId,
              cantidadPedido: item.quantity,
            })),
            pkMetodoPago: metodoPago,
            pkExtra: extraServicio,
          }),
        }
      );
      if (!response.ok) {
        const txt = await response.text();
        throw new Error("Backend error: " + txt);
      }
      const data = await response.json();

      if (data.tipo === "mercadopago" && data.link) {
        // Redirigir a la pasarela de pago
        window.location.href = data.link;
      } else if (data.tipo === "efectivo") {
        alert(
          `¡Pedido registrado con éxito!\n\n` +
          `Número de pedido: ${data.pedidoId}\n` +
          `Monto a pagar: S/ ${totalGeneral.toFixed(2)}\n\n` +
          `Acércate a caja con tu número de pedido para realizar el pago.`
        );
      } else if (data.tipo === "transferencia") {
        alert(
          `¡Pedido registrado!\n\n` +
          `Número de pedido: ${data.pedidoId}\n` +
          `Banco: ${data.datosBancarios?.banco}\n` +
          `Cuenta: ${data.datosBancarios?.cuenta}\n` +
          `Titular: ${data.datosBancarios?.titular}`
        );
      } else {
        alert(`Pedido registrado correctamente. Nro: ${data.pedidoId}`);
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
        <div
          className="flex-1 bg-white border rounded-x1 p-8 space-y-7"
          style={{ maxHeight: 520, overflowY: "auto" }}
        >
          {items.length === 0 && (
            <div className="text-gray-500">Tu carrito está vacío.</div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-10 border-b pb-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 bg-gray-200 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                {/* Toggle descripción */}
                <button
                  className="text-xs text-blue-700 underline mb-1"
                  onClick={() => handleToggleDescription(item.id)}
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  {showDescriptions[item.id]
                    ? "Ocultar descripción"
                    : "Ver descripción"}
                </button>
                {showDescriptions[item.id] && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-800">
                    S/{item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="line-through text-gray-400 text-xs">
                      S/{item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <label className="text-sm mt-2 block">Cant</label>
                <select
                  className="border rounded px-2 py-1 mt-1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                >
                  {[...Array(Math.min(item.stock ?? 10, 20)).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-700 font-bold text-xl px-2"
                onClick={() => removeItem(item.id)}
                title="Eliminar producto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="w-full md:w-80 bg-gray-100 rounded-xl p-4 h-fit">
          <div className="mb-2 flex justify-between">
            <span>
              Artículos ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </span>
            <span className="font-semibold">
              S/ {totalProductos.toFixed(2)}
            </span>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Envío a Lima</span>
            <span className="text-green-600 font-semibold">Gratis</span>
          </div>
          
          <div className="mb-6">
            {/* Servicio extra */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="extraServicio"
                className="font-semibold mb-1 text-gray-700"
              >
                Servicio extra:
              </label>
              <select
                id="extraServicio"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition"
                value={extraServicio}
                onChange={(e) => setExtraServicio(Number(e.target.value))}
              >
                {extraServiciosCatalogo.map((serv) => (
                  <option key={serv.id} value={serv.id}>
                    {serv.nombre}{" "}
                    {serv.costo > 0 ? `(S/ ${serv.costo.toFixed(2)})` : ""}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Método de pago - RESTAURADO MERCADOPAGO */}
            <div className="flex flex-col">
              <label
                htmlFor="metodoPago"
                className="font-semibold mb-1 text-gray-700"
              >
                Método de pago:
              </label>
              <select
                id="metodoPago"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white transition"
                value={metodoPago}
                onChange={(e) => setMetodoPago(Number(e.target.value))}
              >
                <option value={1}>MercadoPago</option>
                <option value={2}>Efectivo</option>
                <option value={3}>Transferencia</option>
              </select>
            </div>
          </div>
          
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total</span>
            <span>S/ {totalGeneral.toFixed(2)}</span>
          </div>
          
          <button
            className="
              w-full py-3
              bg-gradient-to-r from-green-500 to-blue-600
              hover:from-green-600 hover:to-blue-700
              text-white font-bold rounded-xl
              shadow-lg transition transform duration-300
              hover:scale-[1.02] hover:shadow-2xl
              flex items-center justify-center gap-3
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={loading || items.length === 0}
            onClick={handleCheckout}
          >
            {loading ? (
              <span>Procesando...</span>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Confirmar Compra
              </>
            )}
          </button>
          
          <div className="flex justify-center items-center gap-4 mt-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Imagenes placeholder */}
            <div className="text-xs text-gray-500 text-center">
              Pago 100% Seguro <br/> MercadoPago, Efectivo o Transferencia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}