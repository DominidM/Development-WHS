import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { User, X } from 'lucide-react'

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState('')

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    setIsRegister(false)
    setCorreo('')
    setPassword('')
    setNombre('')
    setError('')
  }

  // Lógica para login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      })
      if (!response.ok) throw new Error('Datos inválidos')
      const usuario = await response.json()
      window.localStorage.setItem('usuario', JSON.stringify(usuario))
      closeModal()
      // window.localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Error desconocido")
        }
    }
  }

  // Lógica para registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password, nombre })
      })
      if (!response.ok) throw new Error('No se pudo registrar')
      closeModal()
      // Puedes mostrar un mensaje de éxito o loguear automáticamente
   } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Error desconocido")
        }
    }
  }

  return (
    <>
      <User className="w-8 h-7 text-gray-900 hover:text-blue-600 cursor-pointer" onClick={openModal} />
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
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg font-bold text-gray-900">
                      {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>

                  {/* Login Form */}
                  {!isRegister && (
                    <form className="mt-4 flex flex-col gap-4" onSubmit={handleLogin}>
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
                    </form>
                  )}

                  {/* Register Form */}
                  {isRegister && (
                    <form className="mt-4 flex flex-col gap-4" onSubmit={handleRegister}>
                      <input
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Nombre completo"
                        className="border rounded px-3 py-2 w-full"
                        required
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