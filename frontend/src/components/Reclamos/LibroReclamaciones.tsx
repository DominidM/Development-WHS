import React, { useState } from 'react';
import { API_BASE_URL } from '../../apiConfig'; 


interface FormData {
  nombre: string;
  dni: string;
  email: string;
  telefono: string;
  detalle: string;
  pkTipoFormulario: number | null;
  acepta: boolean;
}

export function LibroReclamacionesForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    dni: "",
    email: "",
    telefono: "",
    detalle: "",
    pkTipoFormulario: null,
    acepta: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const opcionesTipo = [
    { label: "Reclamo Producto", value: 1 },
    { label: "Reclamo Servicio", value: 2 },
    { label: "Reclamo Instalacion", value: 3 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value, type } = target;

    const newValue =
      type === "checkbox" && target instanceof HTMLInputElement
        ? target.checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleTipoChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      pkTipoFormulario: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acepta) {
      alert("Debe aceptar los términos para continuar.");
      return;
    }
    if (!formData.pkTipoFormulario) {
      alert("Debes seleccionar el tipo de reclamo.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Nombres alineados con el DTO backend
      const dataToSend = {
        nombreFormulario: formData.nombre, // <-- AGREGADO Y CORRECTO
        dniFormulario: formData.dni,
        correoFormulario: formData.email,
        telefonoFormulario: formData.telefono,
        pkTipoFormulario: formData.pkTipoFormulario,
        pkEstadoFormulario: 1, // por defecto "SIN_ATENDER"
        textEstado: formData.detalle,
      };
    
      const response = await fetch(`${API_BASE_URL}/api/public/formularios`, { // ✅ Comilla invertida al final
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error(`Error al enviar el reclamo: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Reclamo enviado correctamente:', responseData);
      alert("Reclamo enviado correctamente");
      setFormData({
        nombre: "",
        dni: "",
        email: "",
        telefono: "",
        detalle: "",
        pkTipoFormulario: null,
        acepta: false,
      });

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Error al enviar el reclamo:", error);
      } else {
        setError("An unexpected error occurred");
        console.error("Unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 border border-blue-100">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
          Libro de Reclamaciones
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">DNI</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tipo de reclamo */}
          <div>
            <label className="block mb-4 font-medium text-gray-700">
              Tipo de Reclamo
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {opcionesTipo.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  className={`w-full px-6 py-4 rounded-lg font-semibold border text-center transition ${
                    formData.pkTipoFormulario === value
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => handleTipoChange(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {!formData.pkTipoFormulario && (
              <p className="text-sm text-red-500 mt-2">Selecciona una opción</p>
            )}
          </div>

          {/* Detalle del reclamo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Detalle del reclamo
            </label>
            <textarea
              name="detalle"
              value={formData.detalle}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Aceptación */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="acepta"
              checked={formData.acepta}
              onChange={handleChange}
              className="mt-1 accent-blue-700 w-5 h-5"
            />
            <label className="text-sm text-gray-600 leading-snug">
              Acepto que esta información será tratada según la política de
              protección de datos personales.
            </label>
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar reclamo'}
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}