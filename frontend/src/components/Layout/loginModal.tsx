// src/Layout/LoginModal.tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { User , X } from 'lucide-react'

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

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
                      Iniciar sesión
                    </Dialog.Title>
                    <button onClick={closeModal}>
                      <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                  <form className="mt-4 flex flex-col gap-4">
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      className="border rounded px-3 py-2 w-full"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      Ingresar
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
