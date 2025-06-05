package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "estado_form")
public class EstadoForm {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_form")
    private Long idEstadoForm;

    @Column(name = "nombre_estado")
    private String nombreEstado;

    @Column(name = "text_estado")
    private String textEstado;

    // Constructor por defecto
    public EstadoForm() {
    }

    // Constructor con parámetros
    public EstadoForm(Long idEstadoForm, String nombreEstado, String textEstado) {
        this.idEstadoForm = idEstadoForm;
        this.nombreEstado = nombreEstado;
        this.textEstado = textEstado;
    }

    // Getters y setters

    public Long getIdEstadoForm() {
        return idEstadoForm;
    }

    public void setIdEstadoForm(Long idEstadoForm) {
        this.idEstadoForm = idEstadoForm;
    }

    public String getNombreEstado() {
        return nombreEstado;
    }

    public void setNombreEstado(String nombreEstado) {
        this.nombreEstado = nombreEstado;
    }

    public String getTextEstado() {
        return textEstado;
    }

    public void setTextEstado(String textEstado) {
        this.textEstado = textEstado;
    }
}