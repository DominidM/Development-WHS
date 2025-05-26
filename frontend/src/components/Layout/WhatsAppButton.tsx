import { BsWhatsapp } from 'react-icons/bs';

export function WhatsAppButton() {
  const handleClick = () => {
    // Reemplaza con tu número de teléfono y mensaje opcional
    const phoneNumber = '922862739';
    const message = 'Hola, quiero más información.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
    >
      <BsWhatsapp className="w-6 h-6" />
    </button>
  );
}