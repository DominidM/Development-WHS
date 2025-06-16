package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'tipo_form' en la base de datos.
 */
@Entity
@Table(name = "tipo_form")
public class TipoForm {

    // Identificador único del tipo de formulario (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_form")
    private Long idTipoForm;

    // Nombre del tipo de formulario (columna 'nombre_tipo')
    @Column(name = "nombre_tipo")
    private String nombreTipo;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public TipoForm() {
    }

    /**
     * Constructor con parámetros para crear instancias fácilmente.
     * @param idTipoForm ID del tipo de formulario.
     * @param nombreTipo Nombre del tipo de formulario.
     */
    public TipoForm(Long idTipoForm, String nombreTipo) {
        this.idTipoForm = idTipoForm;
        this.nombreTipo = nombreTipo;
    }

    // Getters y setters

    /**
     * Obtiene el ID del tipo de formulario.
     * @return el ID del tipo.
     */
    public Long getIdTipoForm() {
        return idTipoForm;
    }

    /**
     * Establece el ID del tipo de formulario.
     * @param idTipoForm el nuevo ID.
     */
    public void setIdTipoForm(Long idTipoForm) {
        this.idTipoForm = idTipoForm;
    }

    /**
     * Obtiene el nombre del tipo de formulario.
     * @return el nombre del tipo.
     */
    public String getNombreTipo() {
        return nombreTipo;
    }

    /**
     * Establece el nombre del tipo de formulario.
     * @param nombreTipo el nuevo nombre.
     */
    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }
}