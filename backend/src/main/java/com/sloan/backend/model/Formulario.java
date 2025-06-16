package com.sloan.backend.model;

import java.time.LocalDateTime;

// Importaciones necesarias para la persistencia JPA/Hibernate
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'formulario' en la base de datos.
 */
@Entity
@Table(name = "formulario")
public class Formulario {
    // Identificador único del formulario (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_formulario")
    private Long idFormulario;

    // Nombre del formulario
    @Column(name = "nombre_formulario")
    private String nombreFormulario;

    // Fecha de creación o registro del formulario
    @Column(name = "fecha_formulario")
    private LocalDateTime fechaFormulario;

    // DNI asociado al formulario (no puede ser nulo)
    @Column(name = "dni_formulario", nullable = false)
    private String dniFormulario;

    // Correo electrónico asociado al formulario
    @Column(name = "correo_formulario")
    private String correoFormulario;

    // Teléfono asociado al formulario
    @Column(name = "telefono_formulario")
    private String telefonoFormulario;

    // Relación ManyToOne con TipoForm (tipo de formulario), no puede ser nulo
    @ManyToOne
    @JoinColumn(name = "pk_tipo_formulario", nullable = false)
    private TipoForm tipoFormulario;

    // Relación ManyToOne con EstadoForm (estado del formulario), no puede ser nulo
    @ManyToOne
    @JoinColumn(name = "pk_estado_formulario", nullable = false)
    private EstadoForm estadoFormulario;

    // Texto adicional sobre el estado
    @Column(name = "text_estado")
    private String textEstado;

    // Relación ManyToOne con Usuario (usuario de atención), puede ser null (solo para admin)
    @ManyToOne
    @JoinColumn(name = "user_atencion")
    private Usuario usuarioAtencion; // Solo para admin, puede ser null

    /**
     * Constructor por defecto (necesario para JPA).
     */
    public Formulario() {
    }

    /**
     * Constructor con parámetros para crear una instancia de Formulario con todos sus campos.
     * 
     * @param correoFormulario    Correo electrónico asociado al formulario.
     * @param dniFormulario       DNI del usuario que llena el formulario.
     * @param estadoFormulario    Estado actual del formulario (relación a EstadoForm).
     * @param fechaFormulario     Fecha y hora en que se crea el formulario.
     * @param idFormulario        Identificador único del formulario.
     * @param nombreFormulario    Nombre o título del formulario.
     * @param telefonoFormulario  Teléfono de contacto asociado al formulario.
     * @param textEstado          Texto adicional sobre el estado del formulario.
     * @param tipoFormulario      Tipo de formulario (relación a TipoForm).
     * @param usuarioAtencion     Usuario que atiende el formulario (puede ser null).
     */
    public Formulario(String correoFormulario, String dniFormulario, EstadoForm estadoFormulario,
                      LocalDateTime fechaFormulario, Long idFormulario, String nombreFormulario,
                      String telefonoFormulario, String textEstado, TipoForm tipoFormulario,
                      Usuario usuarioAtencion) {
        this.correoFormulario = correoFormulario;
        this.dniFormulario = dniFormulario;
        this.estadoFormulario = estadoFormulario;
        this.fechaFormulario = fechaFormulario;
        this.idFormulario = idFormulario;
        this.nombreFormulario = nombreFormulario;
        this.telefonoFormulario = telefonoFormulario;
        this.textEstado = textEstado;
        this.tipoFormulario = tipoFormulario;
        this.usuarioAtencion = usuarioAtencion;
    }

      // ----- Getters y setters -----

    /**
     * Obtiene el identificador único del formulario.
     * @return idFormulario
     */
    public Long getIdFormulario() {
        return idFormulario;
    }

    /**
     * Establece el identificador único del formulario.
     * @param idFormulario nuevo ID
     */
    public void setIdFormulario(Long idFormulario) {
        this.idFormulario = idFormulario;
    }

    /**
     * Obtiene el nombre o título del formulario.
     * @return nombreFormulario
     */
    public String getNombreFormulario() {
        return nombreFormulario;
    }

    /**
     * Establece el nombre o título del formulario.
     * @param nombreFormulario nuevo nombre
     */
    public void setNombreFormulario(String nombreFormulario) {
        this.nombreFormulario = nombreFormulario;
    }

    /**
     * Obtiene la fecha y hora de creación del formulario.
     * @return fechaFormulario
     */
    public LocalDateTime getFechaFormulario() {
        return fechaFormulario;
    }

    /**
     * Establece la fecha y hora de creación del formulario.
     * @param fechaFormulario nueva fecha
     */
    public void setFechaFormulario(LocalDateTime fechaFormulario) {
        this.fechaFormulario = fechaFormulario;
    }

    /**
     * Obtiene el DNI asociado al formulario.
     * @return dniFormulario
     */
    public String getDniFormulario() {
        return dniFormulario;
    }

    /**
     * Establece el DNI asociado al formulario.
     * @param dniFormulario nuevo DNI
     */
    public void setDniFormulario(String dniFormulario) {
        this.dniFormulario = dniFormulario;
    }

    /**
     * Obtiene el correo electrónico asociado al formulario.
     * @return correoFormulario
     */
    public String getCorreoFormulario() {
        return correoFormulario;
    }

    /**
     * Establece el correo electrónico asociado al formulario.
     * @param correoFormulario nuevo correo
     */
    public void setCorreoFormulario(String correoFormulario) {
        this.correoFormulario = correoFormulario;
    }

    /**
     * Obtiene el teléfono asociado al formulario.
     * @return telefonoFormulario
     */
    public String getTelefonoFormulario() {
        return telefonoFormulario;
    }

    /**
     * Establece el teléfono asociado al formulario.
     * @param telefonoFormulario nuevo teléfono
     */
    public void setTelefonoFormulario(String telefonoFormulario) {
        this.telefonoFormulario = telefonoFormulario;
    }

    /**
     * Obtiene el tipo de formulario (relación a TipoForm).
     * @return tipoFormulario
     */
    public TipoForm getTipoFormulario() {
        return tipoFormulario;
    }

    /**
     * Establece el tipo de formulario (relación a TipoForm).
     * @param tipoFormulario nuevo tipo de formulario
     */
    public void setTipoFormulario(TipoForm tipoFormulario) {
        this.tipoFormulario = tipoFormulario;
    }

    /**
     * Obtiene el estado actual del formulario (relación a EstadoForm).
     * @return estadoFormulario
     */
    public EstadoForm getEstadoFormulario() {
        return estadoFormulario;
    }

    /**
     * Establece el estado actual del formulario (relación a EstadoForm).
     * @param estadoFormulario nuevo estado
     */
    public void setEstadoFormulario(EstadoForm estadoFormulario) {
        this.estadoFormulario = estadoFormulario;
    }

    /**
     * Obtiene el texto adicional sobre el estado del formulario.
     * @return textEstado
     */
    public String getTextEstado() {
        return textEstado;
    }

    /**
     * Establece el texto adicional sobre el estado del formulario.
     * @param textEstado nuevo texto de estado
     */
    public void setTextEstado(String textEstado) {
        this.textEstado = textEstado;
    }

    /**
     * Obtiene el usuario que atiende el formulario (puede ser null).
     * @return usuarioAtencion
     */
    public Usuario getUsuarioAtencion() {
        return usuarioAtencion;
    }

    /**
     * Establece el usuario que atiende el formulario.
     * @param usuarioAtencion nuevo usuario de atención
     */
    public void setUsuarioAtencion(Usuario usuarioAtencion) {
        this.usuarioAtencion = usuarioAtencion;
    }

    /**
    * Método de ciclo de vida JPA: se ejecuta antes de persistir la entidad.
    * Si la fecha del formulario no está definida, la asigna con la fecha y hora actual.
    */
    @PrePersist
    public void prePersist() {
        if (fechaFormulario == null) {
            fechaFormulario = LocalDateTime.now();
        }
    }
}