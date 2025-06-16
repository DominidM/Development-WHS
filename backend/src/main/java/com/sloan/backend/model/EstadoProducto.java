package com.sloan.backend.model;

// Importaciones necesarias para la persistencia JPA/Hibernate
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'estado_p' en la base de datos.
 */
@Entity
@Table(name = "estado_p")
public class EstadoProducto {

    // Identificador único del estado del producto (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_p")
    private Long idEstadoProducto;

    // Nombre del estado del producto (no nulo, máximo 100 caracteres)
    @Column(name = "nombre_estado_p", length = 100, nullable = false)
    private String nombreEstadoProducto;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public EstadoProducto() {
    }

    /**
     * Constructor con parámetros para facilitar la creación de instancias.
     * @param idEstadoProducto ID del estado del producto.
     * @param nombreEstadoProducto Nombre del estado del producto.
     */
    public EstadoProducto(Long idEstadoProducto, String nombreEstadoProducto) {
        this.idEstadoProducto = idEstadoProducto;
        this.nombreEstadoProducto = nombreEstadoProducto;
    }

    /**
     * Obtiene el ID del estado del producto.
     * @return el ID del estado del producto.
     */
    public Long getIdEstadoProducto() {
        return idEstadoProducto;
    }

    /**
     * Establece el ID del estado del producto.
     * @param idEstadoProducto el nuevo ID.
     */
    public void setIdEstadoProducto(Long idEstadoProducto) {
        this.idEstadoProducto = idEstadoProducto;
    }

    /**
     * Obtiene el nombre del estado del producto.
     * @return el nombre del estado del producto.
     */
    public String getNombreEstadoProducto() {
        return nombreEstadoProducto;
    }

    /**
     * Establece el nombre del estado del producto.
     * @param nombreEstadoProducto el nuevo nombre del estado.
     */
    public void setNombreEstadoProducto(String nombreEstadoProducto) {
        this.nombreEstadoProducto = nombreEstadoProducto;
    }

}