import React from 'react';

// Paleta base: azul oscuro #233876, azul claro #f5f7fa, gris #e4e9f2

const cardStyle: React.CSSProperties = {
  background: '#f5f7fa',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(35,56,118,0.10)',
  padding: '2rem',
  marginBottom: '2.5rem',
  border: '1px solid #e4e9f2',
  display: 'flex',
  alignItems: 'center',
  gap: '2.5rem',
  transition: 'box-shadow 0.3s',
};

const imgStyle: React.CSSProperties = {
  width: 130,
  height: 130,
  objectFit: 'cover',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(35,56,118,0.08)',
  border: '2px solid #e4e9f2',
  background: '#fff',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const imgContainerStyle: React.CSSProperties = {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleStyle: React.CSSProperties = {
  color: '#233876',
  fontWeight: 800,
  fontSize: '2.2rem',
  marginBottom: '0.8rem',
  letterSpacing: '1px'
};

const subtitleStyle: React.CSSProperties = {
  color: '#233876',
  fontWeight: 600,
  fontSize: '1.25rem',
  marginBottom: '0.7rem'
};

const listStyle: React.CSSProperties = {
  paddingLeft: '1.3rem',
  marginBottom: 0
};

const destacadoStyle: React.CSSProperties = {
  background: '#233876',
  color: '#fff',
  borderRadius: '12px',
  padding: '1.7rem 2.3rem',
  textAlign: 'center',
  marginTop: 34,
  fontSize: '1.17rem',
  boxShadow: '0 2px 8px rgba(35,56,118,0.07)',
  letterSpacing: '0.5px'
};

const MantenimientoPage: React.FC = () => (
  <div style={{
    padding: '2.5rem 1rem',
    maxWidth: 950,
    margin: '0 auto',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    color: '#233876'
  }}>
    <h1 style={titleStyle}>Servicio de Soporte y Mantenimiento</h1>
    <div style={{ color: '#5871a5', marginBottom: 24, fontSize: '1.18rem' }}>
      Protege tu inversión. Mantenemos tus instalaciones funcionando como nuevas, con respaldo profesional y atención inmediata.
    </div>

    {/* Mantenimiento Preventivo */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento1.webp"
          alt="Mantenimiento Preventivo"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}>Mantenimiento Preventivo</div>
        <p>
          Realizamos revisiones periódicas para prevenir fallas, fugas y desgaste en tus sistemas de gasfitería. Incluye limpieza, ajuste y diagnóstico profesional de tuberías, grifería, sanitarios y equipos instalados. ¡Evita emergencias y alarga la vida útil de tus productos!
        </p>
      </div>
    </div>

    {/* Mantenimiento Correctivo */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento2.jpg"
          alt="Mantenimiento Correctivo"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}>Mantenimiento Correctivo</div>
        <p>
          ¿Tienes una fuga o un desperfecto? Solucionamos cualquier problema en tus instalaciones: cambio de piezas, reparación de grifería, sanitarios, termas y bombas. Servicio rápido, seguro y con garantía WHC Representaciones.
        </p>
      </div>
    </div>

    {/* Soporte Técnico Especializado */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento3.jpg"
          alt="Soporte Técnico Especializado"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}>Soporte Técnico Especializado</div>
        <p>
          Nuestro equipo te asesora en el uso, instalación y cuidado de todos los productos comprados en WHC Representaciones. Atención personalizada por chat, correo o WhatsApp, para resolver tus dudas y ayudarte siempre.
        </p>
      </div>
    </div>

    {/* Beneficios */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento4.jpg"
          alt="Beneficios del Servicio"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}>Beneficios de nuestro servicio</div>
        <ul style={listStyle}>
          <li>Extiende la vida útil de tus instalaciones y equipos.</li>
          <li>Previene emergencias y gastos inesperados.</li>
          <li>Atención rápida y profesional, donde nos necesites.</li>
          <li>Uso exclusivo de repuestos originales y materiales de calidad.</li>
          <li>Garantía en todos nuestros trabajos y visitas técnicas.</li>
        </ul>
      </div>
    </div>

    {/* Solicita tu Servicio */}
    <div style={destacadoStyle}>
      ¿Necesitas mantenimiento o soporte? Solicítalo desde tu área de usuario, <a href="mailto:soporte@whc.com" style={{color:'#fff', textDecoration:'underline'}}>escríbenos</a> o contáctanos por WhatsApp. ¡Respaldo inmediato, siempre contigo!
    </div>
  </div>
);

export default MantenimientoPage;