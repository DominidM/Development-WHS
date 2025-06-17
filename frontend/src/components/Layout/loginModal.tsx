import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { User, X, LogOut, ShoppingBag } from 'lucide-react'
import { API_BASE_URL } from '../../apiConfig'; 

type Usuario = {
  nombrePersona: string
  correoPersona: string
  // Agrega más campos si tu backend devuelve otros
}

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState('')
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotCorreo, setForgotCorreo] = useState('')
  const [forgotMsg, setForgotMsg] = useState('')

  // Al cargar, busca usuario en localStorage
  useEffect(() => {
    const u = window.localStorage.getItem('usuario')
    if (u) {
      setUsuario(JSON.parse(u))
    }
  }, [])

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    setIsRegister(false)
    setCorreo('')
    setPassword('')
    setNombre('')
    setError('')
    setShowForgot(false)
    setForgotCorreo('')
    setForgotMsg('')
  }

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      })
      if (!response.ok) throw new Error('Datos inválidos')
      const usuario = await response.json()
      window.localStorage.setItem('usuario', JSON.stringify(usuario))
      setUsuario(usuario)
      closeModal()
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError("Error desconocido")
    }
  }

  // Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password, nombre })
      })
      if (!response.ok) throw new Error('No se pudo registrar')
      setIsRegister(false)
      setCorreo('')
      setPassword('')
      setNombre('')
      setError('')
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido')
    }
  }

  // Recuperar contraseña
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotMsg('')
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: forgotCorreo })
      })
      if (!response.ok) throw new Error('No se pudo enviar el correo')
      setForgotMsg('Se ha enviado un correo para restablecer la contraseña')
      setForgotCorreo('')
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Error desconocido')
    }
  }

  // Cerrar sesión
  const handleLogout = () => {
    window.localStorage.removeItem('usuario')
    setUsuario(null)
    closeModal()
  }

  // URL para pedidos anteriores, podrías personalizarlo
  const pedidosUrl = "/mis-pedidos"

  return (
    <>
      <button
        className="flex items-center gap-2 p-2 bg-transparent hover:bg-blue-50 rounded cursor-pointer"
        onClick={openModal}
      >
        <User className="w-7 h-7 text-blue-900" />
        <span className="font-medium text-gray-800">
          {usuario ? `Hola, ${usuario.nombrePersona}` : 'Hola, Iniciar sesión'}
        </span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <Dialog.Title className="text-lg font-bold text-gray-900">
                      {usuario
                        ? `Bienvenido, ${usuario.nombrePersona}`
                        : (isRegister ? 'Crear cuenta' : (showForgot ? 'Recuperar contraseña' : 'Iniciar sesión'))
                      }
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>

                  {/* Si está logueado, muestra menú */}
                  {usuario ? (
                    <div className="flex flex-col items-center gap-4 mt-6">
                      <span className="text-lg text-gray-800 mb-2">
                        ¡Hola, <b>{usuario.nombrePersona}</b>!
                      </span>
                      <a
                        href={pedidosUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Ver pedidos anteriores
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                      >
                        <LogOut className="w-5 h-5" />
                        Cerrar sesión
                      </button>
                    </div>
                  ) : showForgot ? (
                    <form className="flex flex-col gap-4 mt-4" onSubmit={handleForgotPassword}>
                      <input
                        type="email"
                        value={forgotCorreo}
                        onChange={e => setForgotCorreo(e.target.value)}
                        placeholder="Correo electrónico"
                        className="border rounded px-3 py-2 w-full"
                        required
                        autoFocus
                      />
                      {error && <span className="text-red-500">{error}</span>}
                      {forgotMsg && <span className="text-green-600">{forgotMsg}</span>}
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      >
                        Recuperar contraseña
                      </button>
                      <button
                        type="button"
                        className="text-blue-700 hover:underline"
                        onClick={() => setShowForgot(false)}
                      >
                        Volver al inicio de sesión
                      </button>
                    </form>
                  ) : !isRegister ? (
                    <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
                      <input
                        type="email"
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
                        placeholder="Correo electrónico"
                        className="border rounded px-3 py-2 w-full"
                        required
                        autoFocus
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="border rounded px-3 py-2 w-full"
                        required
                      />
                      {error && <span className="text-red-500">{error}</span>}
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      >
                        Ingresar
                      </button>
                      <span className="text-sm text-center">
                        ¿No tienes cuenta?{' '}
                        <button
                          type="button"
                          className="text-blue-700 hover:underline"
                          onClick={() => setIsRegister(true)}
                        >
                          Crear cuenta
                        </button>
                      </span>
                      <button
                        type="button"
                        className="text-blue-700 text-sm mt-2 hover:underline"
                        onClick={() => setShowForgot(true)}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </form>
                  ) : (
                    <form className="flex flex-col gap-4 mt-4" onSubmit={handleRegister}>
                      <input
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Nombre completo"
                        className="border rounded px-3 py-2 w-full"
                        required
                        autoFocus
                      />
                      <input
                        type="email"
                        value={correo}
                        onChange={e => setCorreo(e.target.value)}
                        placeholder="Correo electrónico"
                        className="border rounded px-3 py-2 w-full"
                        required
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="border rounded px-3 py-2 w-full"
                        required
                      />
                      {error && <span className="text-red-500">{error}</span>}
                      <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                      >
                        Registrarme
                      </button>
                      <span className="text-sm text-center">
                        ¿Ya tienes cuenta?{' '}
                        <button
                          type="button"
                          className="text-blue-700 hover:underline"
                          onClick={() => setIsRegister(false)}
                        >
                          Iniciar sesión
                        </button>
                      </span>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}