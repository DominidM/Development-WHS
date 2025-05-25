import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import OpinonesPage from './pages/OpinonesPage';
import ProductsPage from './pages/Products';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFound';
import CartPage from './pages/CartPage';
import LibroReclamaciones from './pages/LibroReclamaciones';
import { DetalleProducto } from "./pages/DetalleProducto";

import Layout from './layouts/Layout';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/contacto" element={<ContactPage />} />  
        <Route path="/cart" element={<CartPage />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/libro" element={<LibroReclamaciones />} />
        <Route path="/opiniones" element={<OpinonesPage />} />

      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
