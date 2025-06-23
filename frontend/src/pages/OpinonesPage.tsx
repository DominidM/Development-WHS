import { useState } from "react";
import { UserCircle } from "lucide-react";
import { API_BASE_URL } from '../apiConfig'; 


interface Opinion {
  nombre: string;
  comentario: string;
}

const opinionesFake: Opinion[] = [
  {
    nombre: "Lucía Fernández",
    comentario: "Excelente servicio y atención. Recibí mis productos en perfecto estado y a tiempo.",
  },
  {
    nombre: "Carlos Ramírez",
    comentario: "La calidad de los productos es inigualable. 100% recomendados.",
  },
  {
    nombre: "Andrea Soto",
    comentario: "Me encantó el diseño moderno de las griferías. Volveré a comprar sin duda.",
  },
  {
    nombre: "Jorge Medina",
    comentario: "Buena relación calidad-precio. Además, la atención al cliente fue rápida y amable.",
  },
];

export default function OpinionesPage() {
  const [opiniones, setOpiniones] = useState<Opinion[]>(opinionesFake);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (nombre && comentario) {
      setEnviando(true);
      // Construye el objeto para el backend
      const data = {
        nombreFormulario: nombre, 
        dniFormulario: "",
        correoFormulario: "",
        telefonoFormulario: "",
        pkTipoFormulario: 4, 
        pkEstadoFormulario: 1, 
        textEstado: comentario,
      };

      try {
        const res = await fetch(`${API_BASE_URL}/api/public/formularios`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("No se pudo enviar la opinión");

        // Si fue exitoso, agrega a la lista local (opcional)
        setOpiniones([{ nombre, comentario }, ...opiniones]);
        setNombre("");
        setComentario("");
        setSuccess("¡Gracias por tu opinión!");
      } catch (err) {
        console.error(err);
        setError("Error al enviar la opinión. Intenta de nuevo.");
      } finally {
        setEnviando(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#0d3c6b]">
        Opiniones de nuestros clientes
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-4 border"
      >
        <h2 className="text-xl font-semibold text-gray-700">Deja tu opinión</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Escribe tu opinión..."
          className="w-full border border-gray-300 rounded px-4 py-2 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`bg-[#0d3c6b] text-white px-6 py-2 rounded hover:bg-blue-800 transition ${enviando ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {opiniones.map((op, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <UserCircle className="w-10 h-10 text-blue-600 mr-3" />
              <p className="font-semibold text-lg text-gray-800">{op.nombre}</p>
            </div>
            <p className="text-gray-700 leading-relaxed">{op.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}