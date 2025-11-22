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

// Interfaz para los errores de validación
interface FormErrors {
  nombre?: string;
  dni?: string;
  email?: string;
  telefono?: string;
  detalle?: string;
  pkTipoFormulario?: string;
  acepta?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const opcionesTipo = [
    { label: "Reclamo Producto", value: 1 },
    { label: "Reclamo Servicio", value: 2 },
    { label: "Reclamo Instalacion", value: 3 },
  ];

  // Función de validación
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validar Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio.";
      isValid = false;
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
      isValid = false;
    }

    // Validar DNI (Perú: 8 dígitos numéricos)
    const dniRegex = /^\d{8}$/;
    if (!formData.dni) {
      newErrors.dni = "El DNI es obligatorio.";
      isValid = false;
    } else if (!dniRegex.test(formData.dni)) {
      newErrors.dni = "El DNI debe contener exactamente 8 números.";
      isValid = false;
    }

    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
      isValid = false;
    }

    // Validar Teléfono (Mínimo 7 dígitos, máximo 15, solo números)
    const phoneRegex = /^\d{7,15}$/;
    if (formData.telefono && !phoneRegex.test(formData.telefono)) {
      newErrors.telefono = "El teléfono debe contener entre 7 y 15 números.";
      isValid = false;
    }

    // Validar Tipo de Reclamo
    if (!formData.pkTipoFormulario) {
      newErrors.pkTipoFormulario = "Debes seleccionar el tipo de reclamo.";
      isValid = false;
    }

    // Validar Detalle
    if (!formData.detalle.trim()) {
      newErrors.detalle = "El detalle del reclamo es obligatorio.";
      isValid = false;
    } else if (formData.detalle.trim().length < 10) {
      newErrors.detalle = "Por favor, detalla un poco más tu reclamo (mínimo 10 caracteres).";
      isValid = false;
    }

    // Validar Aceptación
    if (!formData.acepta) {
      newErrors.acepta = "Debes aceptar los términos para continuar.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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

    // Limpiar error del campo mientras se escribe
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTipoChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      pkTipoFormulario: value,
    }));
    if (errors.pkTipoFormulario) {
      setErrors((prev) => ({ ...prev, pkTipoFormulario: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Ejecutar validaciones antes de enviar
    if (!validateForm()) {
      return; // Detiene el envío si hay errores
    }

    setLoading(true);
    try {
      const dataToSend = {
        nombreFormulario: formData.nombre,
        dniFormulario: formData.dni,
        correoFormulario: formData.email,
        telefonoFormulario: formData.telefono,
        pkTipoFormulario: formData.pkTipoFormulario,
        pkEstadoFormulario: 1,
        textEstado: formData.detalle,
      };
    
      const response = await fetch(`${API_BASE_URL}/api/public/formularios`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el reclamo: ${response.status}`);
      }

      // Limpiar formulario tras éxito
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
      setErrors({}); // Limpiar errores

    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
        console.error("Error al enviar el reclamo:", error);
      } else {
        setServerError("Ocurrió un error inesperado. Inténtalo más tarde.");
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

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Datos personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Campo Nombre */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none ${
                  errors.nombre 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>

            {/* Campo DNI */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                DNI <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dni"
                maxLength={8}
                value={formData.dni}
                onChange={(e) => {
                    // Solo permitir números
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) handleChange(e);
                }}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none ${
                  errors.dni 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
            </div>

            {/* Campo Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none ${
                  errors.email 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Campo Teléfono */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                maxLength={15}
                value={formData.telefono}
                onChange={(e) => {
                    // Solo permitir números
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) handleChange(e);
                }}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none ${
                  errors.telefono 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
            </div>
          </div>

          {/* Tipo de reclamo */}
          <div>
            <label className="block mb-4 font-medium text-gray-700">
              Tipo de Reclamo <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {opcionesTipo.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  className={`w-full px-6 py-4 rounded-lg font-semibold border text-center transition ${
                    formData.pkTipoFormulario === value
                      ? "bg-blue-700 text-white border-blue-700 ring-2 ring-offset-2 ring-blue-500"
                      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                  } ${errors.pkTipoFormulario ? "border-red-500" : ""}`}
                  onClick={() => handleTipoChange(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.pkTipoFormulario && (
              <p className="text-red-500 text-sm mt-2 text-center sm:text-left">{errors.pkTipoFormulario}</p>
            )}
          </div>

          {/* Detalle del reclamo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Detalle del reclamo <span className="text-red-500">*</span>
            </label>
            <textarea
              name="detalle"
              value={formData.detalle}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none resize-none ${
                errors.detalle 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.detalle && <p className="text-red-500 text-xs mt-1">{errors.detalle}</p>}
          </div>

          {/* Aceptación */}
          <div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="acepta"
                checked={formData.acepta}
                onChange={handleChange}
                className="mt-1 accent-blue-700 w-5 h-5 cursor-pointer"
                id="acepta-terms"
              />
              <label htmlFor="acepta-terms" className="text-sm text-gray-600 leading-snug cursor-pointer select-none">
                Acepto que esta información será tratada según la política de
                protección de datos personales. <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.acepta && <p className="text-red-500 text-xs mt-1 ml-8">{errors.acepta}</p>}
          </div>

          {/* Botón y Errores de Servidor */}
          <div className="text-center">
            <button
              type="submit"
              className={`bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 ease-in-out ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar reclamo'
              )}
            </button>
            {serverError && <p className="mt-4 text-red-600 font-medium bg-red-50 p-2 rounded">{serverError}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}