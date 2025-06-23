import React from 'react';
import { Wrench, CheckCircle, ShieldCheck, Users, MessageCircle, ChevronRight } from 'lucide-react';

// Paleta base: azul oscuro #233876, azul claro #f5f7fa, gris #e4e9f2

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '18px',
  boxShadow: '0 6px 32px rgba(35,56,118,0.12)',
  padding: '2.2rem 1.5rem',
  marginBottom: '2rem',
  border: '1px solid #e4e9f2',
  maxWidth: 750,
  margin: '0 auto 2rem auto'
};

const titleStyle: React.CSSProperties = {
  color: '#233876',
  fontWeight: 800,
  fontSize: '2.4rem',
  marginBottom: '0.7rem',
  letterSpacing: '0.5px',
  fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
};

const subtitleStyle: React.CSSProperties = {
  color: '#233876',
  fontWeight: 700,
  fontSize: '1.32rem',
  marginTop: '1.2rem',
  marginBottom: '1.1rem',
  letterSpacing: '0.1px'
};

const iconList = [
  <Users size={18} style={{ color: "#233876", marginRight: 8, verticalAlign: "middle" }}/>
  ,<CheckCircle size={18} style={{ color: "#233876", marginRight: 8, verticalAlign: "middle" }}/>
  ,<ShieldCheck size={18} style={{ color: "#233876", marginRight: 8, verticalAlign: "middle" }}/>
  ,<MessageCircle size={18} style={{ color: "#233876", marginRight: 8, verticalAlign: "middle" }}/>
];

const InstalacionPage: React.FC = () => (
  <div style={{
    padding: '2.4rem 0.6rem 2.7rem 0.6rem',
    maxWidth: 930,
    margin: '0 auto',
    fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
    color: '#233876'
  }}>
    {/* HERO */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      marginBottom: 24
    }}>
      <div style={{
        background: 'linear-gradient(100deg, #233876 60%, #4f6dbe 100%)',
        width: 64,
        height: 64,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 18px rgba(35,56,118,0.15)',
        marginBottom: 12
      }}>
        <Wrench size={36} color="#fff" />
      </div>
      <h1 style={titleStyle}>Servicio Profesional de Instalación</h1>
      <div style={{ color: '#5871a5', marginBottom: 0, fontSize: '1.13rem', textAlign: 'center', fontWeight: 500, letterSpacing: 0.2 }}>
        Soluciones confiables y seguras para tu hogar o empresa con técnicos certificados.
      </div>
    </div>

    {/* ¿En qué consiste nuestro servicio? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿En qué consiste nuestro servicio?</div>
      <p style={{fontSize:'1.08rem', margin: 0}}>
        En <b>WHS Representaciones</b> ofrecemos instalación profesional de sistemas de gasfitería: tuberías, grifería, sanitarios, termas y más. Nuestro equipo técnico garantiza un trabajo seguro, limpio y conforme a las normas técnicas, con atención a detalle en cada proyecto.
      </p>
    </div>

    {/* ¿Por qué elegirnos? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿Por qué elegirnos?</div>
      <ul style={{ paddingLeft: '0', marginBottom: 0, listStyle: "none" }}>
        <li style={{marginBottom: 10, display:'flex',alignItems:'center'}}>{iconList[0]}<b>Personal certificado:</b> Técnicos calificados y experiencia comprobada.</li>
        <li style={{marginBottom: 10, display:'flex',alignItems:'center'}}>{iconList[1]}<b>Calidad de materiales:</b> Solo primeras marcas y productos garantizados.</li>
        <li style={{marginBottom: 10, display:'flex',alignItems:'center'}}>{iconList[2]}<b>Garantía real:</b> Cobertura post-servicio y prueba de funcionamiento en cada instalación.</li>
        <li style={{display:'flex',alignItems:'center'}}>{iconList[3]}<b>Asesoría personalizada:</b> Soluciones adaptadas a tu necesidad y presupuesto.</li>
      </ul>
    </div>

    {/* ¿Qué productos instalamos? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿Qué productos instalamos?</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
        gap: 8,
        fontSize: '1.05rem'
      }}>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Tuberías (PVC, PPR, cobre, multicapa)</div>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Grifería (lavamanos, fregaderos, duchas, etc.)</div>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Sanitarios (inodoros, lavabos, urinarios)</div>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Termas y calentadores de agua</div>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Bombas y sistemas de presión</div>
        <div style={{display:'flex',alignItems:'center',marginBottom:6}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Otros equipos comprados en nuestro ecommerce</div>
      </div>
    </div>

    {/* ¿Cómo solicitar la instalación? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿Cómo solicitar la instalación?</div>
      <ol style={{ paddingLeft: '1.1rem', margin: 0, fontSize:'1.04rem' }}>
        <li>
          <b>Compra tu producto:</b> Realiza la compra de cualquier artículo con opción de instalación.
        </li>
        <li>
          <b>Selecciona el servicio de instalación:</b> Agrégalo al carrito o solicita cotización personalizada.
        </li>
        <li>
          <b>Coordinación:</b> Nuestro equipo te contactará para agendar la visita de instalación.
        </li>
        <li>
          <b>Instalación:</b> Técnicos certificados realizarán el servicio en la fecha acordada.
        </li>
        <li>
          <b>Prueba y garantía:</b> Verificamos el funcionamiento y entregamos garantía.
        </li>
      </ol>
    </div>

    {/* Recomendaciones antes de la instalación */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>Recomendaciones antes de la instalación</div>
      <ul style={{ paddingLeft: '0', marginBottom: 0, listStyle: "none" }}>
        <li style={{marginBottom: 9, display:'flex',alignItems:'center'}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Asegúrate de que el área esté despejada y accesible.</li>
        <li style={{marginBottom: 9, display:'flex',alignItems:'center'}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>Verifica que cuentes con los servicios básicos necesarios (agua, desagüe, energía eléctrica si corresponde).</li>
        <li style={{display:'flex',alignItems:'center'}}><ChevronRight size={18} color="#233876" style={{marginRight:7}}/>¿Tienes dudas de compatibilidad? Consulta con nuestro equipo antes de la instalación.</li>
      </ul>
    </div>

    {/* Preguntas frecuentes */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>Preguntas frecuentes</div>
      <div style={{marginBottom: "0.8rem", fontSize:'1rem'}}>
        <b>¿Puedo pedir instalación si ya tengo el producto?</b><br/>
        Solo instalamos productos comprados en WHS Representaciones para garantizar compatibilidad y respaldo.
      </div>
      <div style={{marginBottom: "0.8rem", fontSize:'1rem'}}>
        <b>¿La instalación tiene costo adicional?</b><br/>
        El costo se muestra en el carrito y puede variar según producto y ubicación.
      </div>
      <div style={{fontSize:'1rem'}}>
        <b>¿Ofrecen mantenimiento?</b><br/>
        Sí, revisa nuestra sección de <a href="/mantenimiento" style={{color:'#233876', textDecoration:'underline'}}>Mantenimiento</a>.
      </div>
    </div>

    {/* Contacto */}
    <div style={{
      background: 'linear-gradient(90deg, #233876 80%, #4f6dbe 100%)',
      color: '#fff',
      borderRadius: '12px',
      padding: '1.7rem 2rem 1.3rem 2rem',
      textAlign: 'center',
      margin: '34px auto 0 auto',
      maxWidth: 700,
      fontSize: '1.12rem',
      fontWeight: 500,
      boxShadow: '0 4px 24px rgba(35,56,118,0.12)'
    }}>
      ¿Tienes dudas? Escribe a <a href="mailto:soporte@whs.com" style={{color:'#fff', textDecoration:'underline'}}>soporte@whs.com</a> o contáctanos por WhatsApp.
    </div>
  </div>
);

export default InstalacionPage;