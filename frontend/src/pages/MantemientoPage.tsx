import React from 'react';
import { ShieldCheck, Wrench, LifeBuoy, CheckCircle, MessageCircle, CalendarCheck, UserCheck, RefreshCcw } from 'lucide-react';

// Paleta base: azul oscuro #233876, azul claro #f5f7fa, gris #e4e9f2, detalles extra: verde #2dc99d
const COLORS = {
  primary: '#233876',
  secondary: '#5e7fd9',
  accent: '#2dc99d',
  background: '#f5f7fa',
  card: '#fff',
  border: '#e4e9f2',
  text: '#233876',
  subtitle: '#5871a5',
};

const cardStyle: React.CSSProperties = {
  background: COLORS.card,
  borderRadius: '18px',
  boxShadow: '0 6px 32px rgba(35,56,118,0.09)',
  padding: '2.2rem 1.5rem',
  marginBottom: '2.2rem',
  border: `1px solid ${COLORS.border}`,
  display: 'flex',
  alignItems: 'center',
  gap: '2.1rem',
  transition: 'box-shadow 0.3s',
};

const imgStyle: React.CSSProperties = {
  width: 110,
  height: 110,
  objectFit: 'cover',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(35,56,118,0.08)',
  border: `2px solid ${COLORS.border}`,
  background: '#fff',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const imgContainerStyle: React.CSSProperties = {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 60%, #e4e9f2 100%)',
  borderRadius: '12px',
  padding: 10,
};

const titleStyle: React.CSSProperties = {
  color: COLORS.primary,
  fontWeight: 900,
  fontSize: '2.2rem',
  marginBottom: '0.7rem',
  letterSpacing: '1px',
  fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
  textAlign: 'center' as const,
};

const subtitleStyle: React.CSSProperties = {
  color: COLORS.primary,
  fontWeight: 700,
  fontSize: '1.25rem',
  marginBottom: '0.7rem',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const listStyle: React.CSSProperties = {
  paddingLeft: '1.3rem',
  marginBottom: 0,
  fontSize: '1.09rem',
  color: COLORS.text
};

const destacadoStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #233876 85%, #5e7fd9 100%)',
  color: '#fff',
  borderRadius: '13px',
  padding: '1.7rem 2.3rem',
  textAlign: 'center' as const,
  marginTop: 36,
  fontSize: '1.17rem',
  boxShadow: '0 4px 24px rgba(35,56,118,0.10)',
  letterSpacing: '0.5px',
  fontWeight: 500,
  maxWidth: 650,
  marginLeft: 'auto',
  marginRight: 'auto'
};

const iconSize = 24;
const iconColor = COLORS.accent;

const PreguntasFrecuentes: React.FC = () => (
  <section style={{ ...cardStyle, flexDirection: "column", alignItems: "flex-start", gap: "1.2rem" }}>
    <div style={subtitleStyle}><MessageCircle size={iconSize} color={iconColor} />Preguntas frecuentes</div>
    <div>
      <b>¿Puedo solicitar mantenimiento si no compré el producto en WHS?</b>
      <br />
      Por políticas de garantía y compatibilidad, el servicio de mantenimiento y soporte está disponible exclusivamente para productos adquiridos en WHS Representaciones.
    </div>
    <div>
      <b>¿Cuánto tiempo tarda un mantenimiento?</b>
      <br />
      La duración depende del tipo de equipo y la complejidad, pero la mayoría de servicios se realizan en el mismo día de la visita.
    </div>
    <div>
      <b>¿El mantenimiento tiene garantía?</b>
      <br />
      Sí, todos nuestros servicios cuentan con garantía sobre mano de obra y repuestos originales.
    </div>
    <div>
      <b>¿Puedo agendar el mantenimiento en fin de semana?</b>
      <br />
      Sí, puedes coordinar tu cita según disponibilidad del equipo técnico. Escríbenos para consultar fechas especiales.
    </div>
    <div>
      <b>¿Qué hago si tengo una emergencia?</b>
      <br />
      Contáctanos de inmediato por WhatsApp o teléfono para priorizar tu caso. Atendemos urgencias dentro de Lima Metropolitana.
    </div>
  </section>
);

const BeneficiosExtra: React.FC = () => (
  <ul style={listStyle}>
    <li style={{display:'flex',alignItems:'center',gap:8}}><UserCheck size={18} color={iconColor} /> Atención personalizada y seguimiento post-servicio.</li>
    <li style={{display:'flex',alignItems:'center',gap:8}}><CalendarCheck size={18} color={iconColor} /> Puedes programar mantenimientos periódicos.</li>
    <li style={{display:'flex',alignItems:'center',gap:8}}><RefreshCcw size={18} color={iconColor} /> Servicio de renovación y modernización de equipos sanitarios.</li>
  </ul>
);

const MantenimientoPage: React.FC = () => (
  <div style={{
    padding: '2.4rem 0.6rem 2.7rem 0.6rem',
    maxWidth: 950,
    margin: '0 auto',
    fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
    color: COLORS.primary,
    background: COLORS.background,
    minHeight: '100vh'
  }}>
    {/* HERO */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      marginBottom: 28,
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 70%, ${COLORS.secondary} 100%)`,
        width: 70,
        height: 70,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 22px rgba(35,56,118,0.15)',
        marginBottom: 12
      }}>
        <ShieldCheck size={38} color="#fff" />
      </div>
      <h1 style={titleStyle}>Soporte y Mantenimiento Profesional</h1>
      <div style={{ color: COLORS.subtitle, marginBottom: 0, fontSize: '1.13rem', textAlign: 'center', fontWeight: 500, letterSpacing: 0.2 }}>
        Protege tu inversión: mantenemos tus instalaciones funcionando como nuevas, con respaldo profesional, garantía y atención inmediata.
      </div>
    </div>

    {/* Mantenimiento Preventivo */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento1.webp"
          alt="Mantenimiento Preventivo"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}><CheckCircle size={iconSize} color={iconColor} />Mantenimiento Preventivo</div>
        <p>
          Realizamos revisiones periódicas para prevenir fallas, fugas y desgaste en tus sistemas de gasfitería. Incluye limpieza, ajuste y diagnóstico profesional de tuberías, grifería, sanitarios y equipos instalados. <b style={{color:iconColor}}>¡Evita emergencias y alarga la vida útil de tus productos!</b>
        </p>
        <ul style={listStyle}>
          <li>Chequeo de instalaciones y detección de fugas.</li>
          <li>Limpieza y desinfección de componentes.</li>
          <li>Revisión de presión y funcionamiento de sistemas hidráulicos.</li>
        </ul>
      </div>
    </div>

    {/* Mantenimiento Correctivo */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento2.jpg"
          alt="Mantenimiento Correctivo"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}><Wrench size={iconSize} color={iconColor} />Mantenimiento Correctivo</div>
        <p>
          ¿Tienes una fuga o un desperfecto? Solucionamos cualquier problema en tus instalaciones: cambio de piezas, reparación de grifería, sanitarios, termas y bombas. Servicio <b style={{color:iconColor}}>rápido, seguro y con garantía</b> WHS Representaciones.
        </p>
        <ul style={listStyle}>
          <li>Reemplazo de piezas dañadas o desgastadas.</li>
          <li>Reparación inmediata de fugas.</li>
          <li>Mantenimiento de termas, bombas y válvulas.</li>
        </ul>
      </div>
    </div>

    {/* Soporte Técnico Especializado */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento3.jpg"
          alt="Soporte Técnico Especializado"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}><LifeBuoy size={iconSize} color={iconColor} />Soporte Técnico Especializado</div>
        <p>
          Nuestro equipo te asesora en el uso, instalación y cuidado de todos los productos comprados en <b>WHS Representaciones</b>. Atención personalizada por chat, correo o WhatsApp, para resolver tus dudas y ayudarte siempre.
        </p>
        <ul style={listStyle}>
          <li>Asesoría remota y presencial.</li>
          <li>Capacitación sobre uso óptimo de equipos.</li>
          <li>Diagnóstico de problemas recurrentes.</li>
        </ul>
      </div>
    </div>

    {/* Beneficios */}
    <div style={cardStyle}>
      <div style={imgContainerStyle}>
        <img
          src="/assets/mantenimiento4.jpg"
          alt="Beneficios del Servicio"
          style={imgStyle}
          onMouseOver={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>
      <div>
        <div style={subtitleStyle}><ShieldCheck size={iconSize} color={iconColor} />Beneficios de nuestro servicio</div>
        <ul style={listStyle}>
          <li>Extiende la vida útil de tus instalaciones y equipos.</li>
          <li>Previene emergencias y gastos inesperados.</li>
          <li>Atención rápida y profesional, donde nos necesites.</li>
          <li>Uso exclusivo de repuestos originales y materiales de calidad.</li>
          <li>Garantía en todos nuestros trabajos y visitas técnicas.</li>
        </ul>
        <BeneficiosExtra />
      </div>
    </div>

    {/* Preguntas Frecuentes */}
    <PreguntasFrecuentes />

    {/* Solicita tu Servicio */}
    <div style={destacadoStyle}>
      ¿Necesitas mantenimiento o soporte? Solicítalo desde tu área de usuario, <a href="mailto:soporte@whs.com" style={{color:'#fff', textDecoration:'underline'}}>escríbenos</a> o contáctanos por WhatsApp. <span style={{color:iconColor, fontWeight:700}}>¡Respaldo inmediato, siempre contigo!</span>
      <div style={{marginTop:10, fontSize:"1rem", opacity:0.85}}>
        <b>Horario de atención:</b> Lunes a Sábado de 8:00 a.m. a 7:00 p.m. | Lima y provincias
      </div>
    </div>
    <div style={{textAlign:"center", margin:"2.5rem 0 0 0", color:COLORS.subtitle, fontSize:"1.05rem"}}>
      &copy; {new Date().getFullYear()} WHS Representaciones - Todos los derechos reservados.
    </div>
  </div>
);

export default MantenimientoPage;