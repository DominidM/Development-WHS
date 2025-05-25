import React from 'react';
import { FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importa el componente Link

export function Footer() {
  return (
    <footer className="bg-[#1E293B] text-gray-300 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h6 className="text-sm font-semibold uppercase mb-6 text-gray-400">Productos</h6>
          <ul className="text-sm">
            <li className="mb-3">
              <Link to="/productos" className=" hover:text-white transition duration-200">
                Nuestros Productos
              </Link>
            </li>            
            <li className="mb-3"><a href="#" className="hover:text-white transition duration-200">Más Vendidos</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-sm font-semibold uppercase mb-6 text-gray-400">Compañía</h6>
          <ul className="text-sm">
            <li className="mb-3"><a href="/contacto" className="hover:text-white transition duration-200">Contacto</a></li>
            <li><a href="/opiniones" className="hover:text-white transition duration-200">Opiniones de Clientes</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-sm font-semibold uppercase mb-6 text-gray-400">Servicios</h6>
          <ul className="text-sm">
            <li className="mb-3"><a href="/instalacion" className="hover:text-white transition duration-200">Servicio de Instalación</a></li>
            <li><a href="/mantenimiento" className="hover:text-white transition duration-200">Servicio der Soporte y Mantenimiento</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-sm font-semibold uppercase mb-6 text-gray-400">Información Legal</h6>
          <ul className="text-sm">
            <li>
              <Link to="/libro" className="hover:text-white transition duration-200 flex items-center">
                <FaBook className="mr-2" /> Libro de Reclamaciones
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
      <p>
        © {new Date().getFullYear()}{" "}
        <a
          href="https://www.instagram.com/solvegrades.com_/" // Reemplaza con la URL real
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          SolveGrudes
        </a>. Todos los derechos reservados.
      </p>
      </div>
    </footer>
  );
}