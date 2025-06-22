import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import OpinonesPage from './pages/OpinonesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import LibroReclamaciones from './pages/LibroReclamacionesPage';
import { DetalleProducto } from "./pages/DetalleProductoPage";

import Layout from './layouts/Layout';
import ResetPasswordPage from './pages/ResetPasswordPage'; // <--- Agrega este import

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/contacto" element={<ContactPage />} />  
        <Route path="/cart" element={<CartPage />} />
        <Route path="/productos/:slug" element={<DetalleProducto />} />    
        <Route path="/libro" element={<LibroReclamaciones />} />
        <Route path="/opiniones" element={<OpinonesPage />} />
        <Route path="/instalacion" element={<OpinonesPage />} />
        <Route path="/mantenimiento" element={<OpinonesPage />} />

      </Route>
      <Route path="/reset-password" element={<ResetPasswordPage />} /> {/* <-- Nueva ruta */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;