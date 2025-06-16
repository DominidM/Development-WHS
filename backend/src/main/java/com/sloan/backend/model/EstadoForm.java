package com.sloan.backend.model;

// Importaciones de JPA/Hibernate para mapear la entidad a una tabla de base de datos
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'estado_form' en la base de datos.
 */
@Entity
@Table(name = "estado_form")
public class EstadoForm {
    
    // Identificador único del estado del formulario (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_form")
    private Long idEstadoForm;

    // Nombre del estado (columna 'nombre_estado')
    @Column(name = "nombre_estado")
    private String nombreEstado;

    // Texto explicativo del estado (columna 'text_estado')
    @Column(name = "text_estado")
    private String textEstado;

    /**
     * Constructor por defecto (requerido por JPA)
     */
    public EstadoForm() {
    }

    /**
     * Constructor con parámetros para crear instancias fácilmente.
     * 
     * @param idEstadoForm ID del estado del formulario.
     * @param nombreEstado Nombre del estado.
     * @param textEstado Texto explicativo del estado.
     */
    public EstadoForm(Long idEstadoForm, String nombreEstado, String textEstado) {
        this.idEstadoForm = idEstadoForm;
        this.nombreEstado = nombreEstado;
        this.textEstado = textEstado;
    }

    // Getters y setters

    /**
     * Obtiene el ID del estado del formulario.
     * @return el ID del estado.
     */
    public Long getIdEstadoForm() {
        return idEstadoForm;
    }

    /**
     * Establece el ID del estado del formulario.
     * @param idEstadoForm el nuevo ID.
     */
    public void setIdEstadoForm(Long idEstadoForm) {
        this.idEstadoForm = idEstadoForm;
    }

    /**
     * Obtiene el nombre del estado.
     * @return el nombre del estado.
     */
    public String getNombreEstado() {
        return nombreEstado;
    }

    /**
     * Establece el nombre del estado.
     * @param nombreEstado el nuevo nombre.
     */
    public void setNombreEstado(String nombreEstado) {
        this.nombreEstado = nombreEstado;
    }

    /**
     * Obtiene el texto del estado.
     * @return el texto del estado.
     */
    public String getTextEstado() {
        return textEstado;
    }

    /**
     * Establece el texto del estado.
     * @param textEstado el nuevo texto.
     */
    public void setTextEstado(String textEstado) {
        this.textEstado = textEstado;
    }
}