import React from 'react';

// Paleta base: azul oscuro #233876, azul claro #f5f7fa, gris #e4e9f2

const cardStyle: React.CSSProperties = {
  background: '#f5f7fa',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(35,56,118,0.07)',
  padding: '2rem',
  marginBottom: '2rem',
  border: '1px solid #e4e9f2'
};

const titleStyle: React.CSSProperties = {
  color: '#233876',
  fontWeight: 700,
  fontSize: '2rem',
  marginBottom: '0.5rem',
  letterSpacing: '0.5px'
};

const subtitleStyle: React.CSSProperties = {
  color: '#233876',
  fontWeight: 600,
  fontSize: '1.2rem',
  marginTop: '1.5rem'
};

const listIcon = (
  <span style={{
    display: 'inline-block',
    width: 16,
    height: 16,
    background: '#233876',
    borderRadius: '50%',
    marginRight: 8,
    verticalAlign: 'middle'
  }}></span>
);

const InstalacionPage: React.FC = () => (
  <div style={{
    padding: '2.5rem 1rem',
    maxWidth: 900,
    margin: '0 auto',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    color: '#233876'
  }}>
    <h1 style={titleStyle}>Servicio Profesional de Instalación de Gasfitería</h1>
    <div style={{ color: '#5871a5', marginBottom: 16, fontSize: '1.1rem' }}>
      Soluciones confiables y seguras para tu hogar o empresa
    </div>

    {/* ¿En qué consiste nuestro servicio? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿En qué consiste nuestro servicio?</div>
      <p>
        En <b>WHS Representaciones</b> brindamos instalación profesional de gasfitería: tuberías, grifería, sanitarios, termas y más. Nuestro equipo técnico garantiza un trabajo seguro, limpio y conforme a las normas técnicas.
      </p>
    </div>

    {/* ¿Por qué elegirnos? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿Por qué elegirnos?</div>
      <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
        <li><b>Personal certificado:</b> Técnicos calificados y con experiencia comprobada.</li>
        <li><b>Materiales de calidad:</b> Solo primeras marcas y productos de nuestro catálogo.</li>
        <li><b>Garantía:</b> Cobertura post-servicio y prueba de funcionamiento en cada instalación.</li>
        <li><b>Asesoría personalizada:</b> Soluciones adaptadas a tu necesidad y presupuesto.</li>
      </ul>
    </div>

    {/* ¿Qué productos instalamos? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿Qué productos instalamos?</div>
      <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
        <li>{listIcon}Tuberías (PVC, PPR, cobre, multicapa)</li>
        <li>{listIcon}Grifería (lavamanos, fregaderos, duchas, etc.)</li>
        <li>{listIcon}Sanitarios (inodoros, lavabos, urinarios)</li>
        <li>{listIcon}Termas y calentadores de agua</li>
        <li>{listIcon}Bombas y sistemas de presión</li>
        <li>{listIcon}Otros equipos comprados en nuestro ecommerce</li>
      </ul>
    </div>

    {/* ¿Cómo solicitar la instalación? */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>¿Cómo solicitar la instalación?</div>
      <ol style={{ paddingLeft: '1.3rem' }}>
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
      <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
        <li>{listIcon}Asegúrate de que el área esté despejada y accesible.</li>
        <li>{listIcon}Verifica que cuentes con los servicios básicos necesarios (agua, desagüe, energía eléctrica si corresponde).</li>
        <li>{listIcon}Ante dudas de compatibilidad, consulta con nuestro equipo antes de la instalación.</li>
      </ul>
    </div>

    {/* Preguntas frecuentes */}
    <div style={cardStyle}>
      <div style={subtitleStyle}>Preguntas frecuentes</div>
      <div style={{marginBottom: "0.8rem"}}>
        <b>¿Puedo pedir instalación si ya tengo el producto?</b><br/>
        Solo instalamos productos comprados en WHS Representaciones para garantizar compatibilidad y respaldo.
      </div>
      <div style={{marginBottom: "0.8rem"}}>
        <b>¿La instalación tiene costo adicional?</b><br/>
        El costo se muestra en el carrito y puede variar según producto y ubicación.
      </div>
      <div>
        <b>¿Ofrecen mantenimiento?</b><br/>
        Sí, revisa nuestra sección de <a href="/mantenimiento" style={{color:'#233876', textDecoration:'underline'}}>Mantenimiento</a>.
      </div>
    </div>

    {/* Contacto */}
    <div style={{
      background: '#233876',
      color: '#fff',
      borderRadius: '10px',
      padding: '1.5rem 2rem',
      textAlign: 'center',
      marginTop: 30
    }}>
      ¿Tienes dudas? Escribe a <a href="mailto:soporte@whs.com" style={{color:'#fff', textDecoration:'underline'}}>soporte@whs.com</a> o contáctanos por WhatsApp.
    </div>
  </div>
);

export default InstalacionPage;