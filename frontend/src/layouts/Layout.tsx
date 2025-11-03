import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import {Footer} from '../components/Layout/Footer';
import ScrollToTopButton  from '../components/Layout/ScrollToTopButton'; // Importa el nuevo componente
import { WhatsAppButton } from '../components/Layout/WhatsAppButton';
import AccessibilityButton from '../components/Layout/AccesibilityButton';
const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">
      <Outlet />
      </main>
      <WhatsAppButton />
      <ScrollToTopButton/>
      <AccessibilityButton />

      <Footer />
    </>
  );
};

export default Layout;
