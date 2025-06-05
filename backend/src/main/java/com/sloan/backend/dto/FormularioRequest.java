package com.sloan.backend.dto;

public class FormularioRequest {
    private String nombreFormulario; 
    private String dniFormulario;
    private String correoFormulario;
    private String telefonoFormulario;
    private Long pkTipoFormulario;
    private Long pkEstadoFormulario;
    private String textEstado;

    // Getters y setters

    public String getNombreFormulario() {
        return nombreFormulario;
    }
    public void setNombreFormulario(String nombreFormulario) {
        this.nombreFormulario = nombreFormulario;
    }

    public String getDniFormulario() { return dniFormulario; }
    public void setDniFormulario(String dniFormulario) { this.dniFormulario = dniFormulario; }

    public String getCorreoFormulario() { return correoFormulario; }
    public void setCorreoFormulario(String correoFormulario) { this.correoFormulario = correoFormulario; }

    public String getTelefonoFormulario() { return telefonoFormulario; }
    public void setTelefonoFormulario(String telefonoFormulario) { this.telefonoFormulario = telefonoFormulario; }

    public Long getPkTipoFormulario() { return pkTipoFormulario; }
    public void setPkTipoFormulario(Long pkTipoFormulario) { this.pkTipoFormulario = pkTipoFormulario; }

    public Long getPkEstadoFormulario() { return pkEstadoFormulario; }
    public void setPkEstadoFormulario(Long pkEstadoFormulario) { this.pkEstadoFormulario = pkEstadoFormulario; }

    public String getTextEstado() { return textEstado; }
    public void setTextEstado(String textEstado) { this.textEstado = textEstado; }
}