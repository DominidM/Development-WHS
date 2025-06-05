package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipo_form")
public class TipoForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_form")
    private Long idTipoForm;

    @Column(name = "nombre_tipo")
    private String nombreTipo;

    // Constructor por defecto
    public TipoForm() {
    }

    // Constructor con parámetros
    public TipoForm(Long idTipoForm, String nombreTipo) {
        this.idTipoForm = idTipoForm;
        this.nombreTipo = nombreTipo;
    }

    // Getters y setters

    public Long getIdTipoForm() {
        return idTipoForm;
    }

    public void setIdTipoForm(Long idTipoForm) {
        this.idTipoForm = idTipoForm;
    }

    public String getNombreTipo() {
        return nombreTipo;
    }

    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }
}