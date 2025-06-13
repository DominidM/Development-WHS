import { ContactHero } from '../components/Contact/ContactHero';
import { ContactSection } from '../components/Contact/ContactSection';
import { Publicidad } from '../components/Publicidad';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ContactHero />
      <ContactSection />
      <Publicidad textoPromocional=" Mercado en linea " />

      <div className="mt-8 mb-8 flex justify-center">
        <div
          className="
            relative
            rounded-xl
            shadow-xl
            overflow-hidden
            bg-gradient-to-br from-blue-800/20 via-blue-900/10 to-blue-700/90
            border-t-8 border-blue-900 
            max-w-4xl w-full
            p-1
            sm:p-4
            transition-transform hover:scale-105 hover:shadow-2xl
          "
        >
          <div className="bg-black rounded-lg shadow-inner overflow-hidden">
            {/* Opcional: título sobre el video */}
            <div className="py-2 px-4">
              <h2 className="text-lg text-white font-bold text-center tracking-wide">SLOAN -Video instructivo</h2>
            </div>
            <video
              controls
              width="100%"
              height="360"
              className="mx-auto rounded-b-lg bg-black"
              poster="/assets/video-poster.jpg" // Coloca una imagen de portada si tienes una
            >
              <source src="../assets/Sloan TruFlush Instalación  Español.mp4" type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;