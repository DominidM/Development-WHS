import React, { useState } from 'react';

const extras = [
  { id: 1, nombre: "Instalación" },
  { id: 2, nombre: "Envío a domicilio" },
  { id: 3, nombre: "Recojo en tienda" }
];

const metodosPago = [
  { id: 1, nombre: "Efectivo" },
  { id: 2, nombre: "Tarjeta" },
  { id: 3, nombre: "Yape" }
];

// 1. Define los tipos de los props
interface CheckoutFormProps {
  onProcesarPedido: (data: { pk_extra: number; pk_metodopago: number }) => Promise<void>;
  loading: boolean;
}

// 2. Usa el tipo en el componente
export default function CheckoutForm({ onProcesarPedido, loading }: CheckoutFormProps) {
  const [pk_extra, setExtra] = useState<number>(extras[1].id); // Por defecto: Envío a domicilio
  const [pk_metodopago, setMetodoPago] = useState<number>(2); // Por defecto: Tarjeta
  const [procesando, setProcesando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcesando(true);
    await onProcesarPedido({ pk_extra, pk_metodopago });
    setProcesando(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="font-bold block mb-1">Servicio Extra:</label>
        <select
          className="w-full border rounded p-2"
          value={pk_extra}
          onChange={e => setExtra(Number(e.target.value))}
        >
          {extras.map(extra => (
            <option key={extra.id} value={extra.id}>{extra.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="font-bold block mb-1">Método de Pago:</label>
        <select
          className="w-full border rounded p-2"
          value={pk_metodopago}
          onChange={e => setMetodoPago(Number(e.target.value))}
        >
          {metodosPago.map(m => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={procesando || loading}
        className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition"
      >
        {procesando || loading ? "Procesando..." : "Completar la transacción"}
      </button>
    </form>
  );
}