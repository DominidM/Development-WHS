import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Layout/Navbar';
import {Footer} from '../components/Layout/Footer';
import ScrollToTopButton  from '../components/Layout/ScrollToTopButton'; // Importa el nuevo componente
import { WhatsAppButton } from '../components/Layout/WhatsAppButton';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">
      <Outlet />
      </main>
      <WhatsAppButton />
      <ScrollToTopButton/>
      
      <Footer />
    </>
  );
};

export default Layout;
