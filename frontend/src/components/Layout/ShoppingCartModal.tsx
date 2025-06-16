import React from 'react';
import { useCart } from '../ui/CartContext';
import { Link } from 'react-router-dom';
import { XCircle, Trash2, PlusCircle, MinusCircle } from 'lucide-react';

interface ShoppingCartModalProps {
  onClose: () => void;
}

export const ShoppingCartModal: React.FC<ShoppingCartModalProps> = ({ onClose }) => {
  const { items, removeItem, updateQuantity } = useCart();
  const calculateTotal = () => items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-end">
        <div
          className="bg-white w-[430px] p-6 rounded-2xl shadow-xl relative border border-blue-100"
          style={{ background: "linear-gradient(135deg, #f8fbff 70%, #eaf3fb 100%)" }}
        >
          <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-blue-500">
            <XCircle className="h-7 w-7" />
          </button>
          <h2 className="text-xl font-bold mb-6 text-blue-900">Carrito de compras</h2>
          <p className="text-sm text-gray-600">Tu carrito está vacío.</p>
          <Link
            to="/cart"
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }}
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm"
          >
            Ver carrito
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-end">
      <div
        className="w-[480px] max-w-full p-7 rounded-2xl shadow-xl relative border border-blue-100 flex flex-col"
        style={{
          background: "linear-gradient(135deg, #f8fbff 70%, #eaf3fb 100%)",
          margin: "24px 0"
        }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-blue-500">
          <XCircle className="h-7 w-7" />
        </button>
        <h2 className="text-xl font-bold mb-7 text-blue-900">Carrito de compras</h2>
        <ul className="space-y-8 mb-7 max-h-[430px] overflow-y-auto pr-3">
          {items.map(item => (
            <li
              key={item.id}
              className="flex items-center gap-6 pb-2 relative group"
            >
              <div className="flex-shrink-0 w-20 h-20 bg-white border border-blue-100 rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={e => { (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/80x80?text=Sin+imagen"; }}
                  />
                ) : (
                  <span className="text-xs text-gray-400">Sin imagen</span>
                )}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h6 className="text-[16px] font-semibold text-blue-900 truncate max-w-[240px]">{item.name}</h6>
                <p className="text-xs text-gray-500 mb-1">S/ {item.price}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-400 hover:text-blue-500 focus:outline-none"
                    disabled={item.quantity <= 1}
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                  <span className="text-sm">Cant: {item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-400 hover:text-blue-500 focus:outline-none"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none ml-4 flex-shrink-0"
                title="Eliminar"
              >
                <Trash2 className="h-7 w-7" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-7 pt-4 border-t border-blue-100">
          <p className="font-semibold text-base text-blue-900 flex justify-between mb-3">
            <span>Subtotal:</span>
            <span>S/ {calculateTotal()}</span>
          </p>
          <Link
            to="/cart"
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }}
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-xl text-base w-full text-center shadow transition"
          >
            Ir a mi carrito
          </Link>
        </div>
      </div>
    </div>
  );
};