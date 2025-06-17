import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Token inválido o faltante.");
      return;
    }
    if (!password || !confirm) {
      setError("Completa ambos campos.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });
      if (!res.ok) throw new Error("No se pudo cambiar la contraseña.");
      setSuccess("¡Contraseña restablecida! Ya puedes iniciar sesión.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido al cambiar la contraseña.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0 2px 16px #0002" }}>
      <h2 style={{ marginBottom: 18 }}>Restablecer contraseña</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
        {error && <span style={{ color: "red" }}>{error}</span>}
        {success && <span style={{ color: "green" }}>{success}</span>}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;