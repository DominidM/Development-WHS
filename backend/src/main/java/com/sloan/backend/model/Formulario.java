package com.sloan.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "formulario")
public class Formulario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_formulario")
    private Long idFormulario;

    @Column(name = "nombre_formulario")
    private String nombreFormulario;

    @Column(name = "fecha_formulario")
    private LocalDateTime fechaFormulario;

    @Column(name = "dni_formulario", nullable = false)
    private String dniFormulario;

    @Column(name = "correo_formulario")
    private String correoFormulario;

    @Column(name = "telefono_formulario")
    private String telefonoFormulario;

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "pk_tipo_formulario", nullable = false)
    private TipoForm tipoFormulario;

    @ManyToOne
    @JoinColumn(name = "pk_estado_formulario", nullable = false)
    private EstadoForm estadoFormulario;

    @Column(name = "text_estado")
    private String textEstado;

    @ManyToOne
    @JoinColumn(name = "user_atencion")
    private Usuario usuarioAtencion; // Solo para admin, puede ser null

    // --- ELIMINADO textRespuesta (text_respuesta) ---

    // Constructor por defecto
    public Formulario() {
    }

    // Constructor con parámetros
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

    // Getters y setters

    public Long getIdFormulario() {
        return idFormulario;
    }

    public void setIdFormulario(Long idFormulario) {
        this.idFormulario = idFormulario;
    }

    public String getNombreFormulario() {
        return nombreFormulario;
    }

    public void setNombreFormulario(String nombreFormulario) {
        this.nombreFormulario = nombreFormulario;
    }

    public LocalDateTime getFechaFormulario() {
        return fechaFormulario;
    }

    public void setFechaFormulario(LocalDateTime fechaFormulario) {
        this.fechaFormulario = fechaFormulario;
    }

    public String getDniFormulario() {
        return dniFormulario;
    }

    public void setDniFormulario(String dniFormulario) {
        this.dniFormulario = dniFormulario;
    }

    public String getCorreoFormulario() {
        return correoFormulario;
    }

    public void setCorreoFormulario(String correoFormulario) {
        this.correoFormulario = correoFormulario;
    }

    public String getTelefonoFormulario() {
        return telefonoFormulario;
    }

    public void setTelefonoFormulario(String telefonoFormulario) {
        this.telefonoFormulario = telefonoFormulario;
    }

    public TipoForm getTipoFormulario() {
        return tipoFormulario;
    }

    public void setTipoFormulario(TipoForm tipoFormulario) {
        this.tipoFormulario = tipoFormulario;
    }

    public EstadoForm getEstadoFormulario() {
        return estadoFormulario;
    }

    public void setEstadoFormulario(EstadoForm estadoFormulario) {
        this.estadoFormulario = estadoFormulario;
    }

    public String getTextEstado() {
        return textEstado;
    }

    public void setTextEstado(String textEstado) {
        this.textEstado = textEstado;
    }

    public Usuario getUsuarioAtencion() {
        return usuarioAtencion;
    }

    public void setUsuarioAtencion(Usuario usuarioAtencion) {
        this.usuarioAtencion = usuarioAtencion;
    }

    @PrePersist
    public void prePersist() {
        if (fechaFormulario == null) {
            fechaFormulario = LocalDateTime.now();
        }
    }
}