package com.sloan.backend.dto;

/**
 * DTO para la recepción de datos al crear un formulario mediante la API pública.
 * Contiene los datos necesarios para registrar un nuevo formulario de reclamo o contacto.
 */
public class FormularioRequest {
    // Nombre de la persona que completa el formulario
    private String nombreFormulario;
    // DNI del solicitante
    private String dniFormulario;
    // Correo electrónico de contacto
    private String correoFormulario;
    // Teléfono de contacto
    private String telefonoFormulario;
    // ID del tipo de formulario seleccionado (ej: Reclamo, Sugerencia, etc.)
    private Long pkTipoFormulario;
    // ID del estado inicial del formulario (ej: SIN_ATENDER)
    private Long pkEstadoFormulario;
    // Texto o mensaje inicial del estado del formulario (puede ser la descripción del reclamo)
    private String textEstado;

    // Getters y setters

    public String getNombreFormulario() {
        return nombreFormulario;
    }
    public void setNombreFormulario(String nombreFormulario) {
        this.nombreFormulario = nombreFormulario;
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

    public Long getPkTipoFormulario() {
        return pkTipoFormulario;
    }
    public void setPkTipoFormulario(Long pkTipoFormulario) {
        this.pkTipoFormulario = pkTipoFormulario;
    }

    public Long getPkEstadoFormulario() {
        return pkEstadoFormulario;
    }
    public void setPkEstadoFormulario(Long pkEstadoFormulario) {
        this.pkEstadoFormulario = pkEstadoFormulario;
    }

    public String getTextEstado() {
        return textEstado;
    }
    public void setTextEstado(String textEstado) {
        this.textEstado = textEstado;
    }
}