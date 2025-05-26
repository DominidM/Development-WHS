import React from 'react';
import { ContactHero } from '../components/Contact/ContactHero';
import { ContactSection } from '../components/Contact/ContactSection';
import { Publicidad } from '../components/Publicidad';


const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
        <ContactHero />
        <ContactSection />
        <Publicidad textoPromocional=" Mercado en linea " />  

        <div className="mt-8 mb-8 ml-10 mr-10 "> {/* He quitado la clase mx-auto */}
            <video controls width="940" height="360" className="mx-auto rounded-lg shadow-md">
                <source src="../assets/Sloan TruFlush Instalación  Español.mp4" type="video/mp4" />
                Tu navegador no soporta el tag de video.
            </video>
        </div>
      </div>
    );
};

export default ContactPage;
