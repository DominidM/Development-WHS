import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../ui/CartContext';
import { ShoppingCartModal } from './ShoppingCartModal';
import LoginModal from '../Layout/loginModal';

export function Navbar() {
  const desiredScrollOffset = 520;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");

 const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchText.trim().length > 0) {
      navigate(`/productos?search=${encodeURIComponent(searchText.trim())}`);
      setSearchText("");
    }
  };
  
  const handleInicioClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate('/');
    setTimeout(() => {
      window.scrollTo({
        top: desiredScrollOffset,
        behavior: 'smooth',
      });
    }, 100);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrollToOfertas, setScrollToOfertas] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items} = useCart();

  useEffect(() => {
    if (location.pathname === '/' && scrollToOfertas) {
      const ofertasElement = document.getElementById('ofertas');
      if (ofertasElement) {
        ofertasElement.scrollIntoView({ behavior: 'smooth' });
        setScrollToOfertas(false);
      }
    }
  }, [location, scrollToOfertas]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    w-full bg-[#f7fafd] shadow-md border-t-[10px] border-[#0D3C6B]
    transition-all duration-300 ease-in-out
    ${isScrolled ? "fixed top-0 left-0 z-50" : "relative"}
  `;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
  }, []);

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <header className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          {/* Logo box */}
          <div className="flex items-center space-x-3 border-r-2 border-[#1e62a6] pr-12">
            <Link to="/">
              <img src="/logo.png" className="h-16 w-auto drop-shadow-lg" alt="Logo WHC" />
            </Link>
          </div>
          {/* Search box grande y decorado */}
           <div className="hidden md:flex flex-1 justify-center mx-8">
            <div className="relative w-full max-w-2xl">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  className="
                    w-full px-8 py-4 text-lg border border-blue-900 rounded-full shadow-md
                    focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white
                    placeholder:text-blaxk-800 font-medium transition
                  "
                  style={{
                    boxShadow: "0 4px 24px 0 rgba(13,60,107,0.08)",
                    letterSpacing: "0.03em"
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-800"
                  tabIndex={-1}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          {/* ICONOS */}
          <div className="flex items-center space-x-10">
            <LoginModal />
            <div onClick={openCart} className="relative cursor-pointer group">
              <ShoppingCart className="h-7 w-7 text-blue-900 group-hover:text-blue-600 transition" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-tr from-red-400 to-red-700 text-white rounded-full px-2 text-xs font-bold shadow-md border-2 border-white">
                  {items.length}
                </span>
              )}
            </div>
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
            <div className="md:hidden px-4 pb-4 space-y-4 bg-[#f7fafd]">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200 shadow"
              />
            </form>
            <nav className="flex flex-col space-y-2 text-base font-semibold">
              <Link to="/" onClick={handleInicioClick}>Ofertas</Link>
              <Link to="/productos" className="hover:text-blue-500">Catálogo</Link>
              <Link to="/contacto" className="hover:text-blue-500">Contacto</Link>
            </nav>
          </div>
        )}
      </header>

      {/* BARRA DE LINKS SECUNDARIA DEBAJO DEL NAVBAR */}
      <nav className="w-full bg-[#ededed] border-b border-blue-100 shadow-sm hidden md:flex">
        <div className="max-w-7xl mx-auto flex flex-row w-full justify-center">
          <Link
            to="/"
            onClick={handleInicioClick}
            className="flex-1 py-3.5 text-center font-bold text-blue-900 border-r border-blue-200 text-lg hover:bg-blue-200/40 hover:text-blue-700 transition-colors"
            style={{ minWidth: 180, letterSpacing: "0.01em" }}
          >
            Ofertas
          </Link>
          <Link
            to="/productos"
            className="flex-1 py-3.5 text-center font-bold text-blue-900 border-r border-blue-200 text-lg hover:bg-blue-200/40 hover:text-blue-700 transition-colors"
            style={{ minWidth: 180, letterSpacing: "0.01em" }}
          >
            Catálogo
          </Link>
          <Link
            to="/contacto"
            className="flex-1 py-3.5 text-center font-bold text-blue-900 text-lg hover:bg-blue-200/40 hover:text-blue-700 transition-colors"
            style={{ minWidth: 180, letterSpacing: "0.01em" }}
          >
            Contacto
          </Link>
        </div>
      </nav>

      {isCartOpen && <ShoppingCartModal onClose={closeCart} />}
    </>
  );
}