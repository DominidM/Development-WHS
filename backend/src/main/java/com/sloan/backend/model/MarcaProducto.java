package com.sloan.backend.model;

// Importaciones necesarias para la persistencia JPA/Hibernate
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'marca_p' en la base de datos.
 */
@Entity
@Table(name = "marca_p")
public class MarcaProducto {

    // Identificador único de la marca de producto (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_marca_p")
    private Long idMarcaProducto;

    // Nombre de la marca de producto (no nulo, máximo 50 caracteres)
    @Column(name = "nombre_marca_p", length = 50, nullable = false)
    private String nombreMarcaProducto;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public MarcaProducto() {
    }

    /**
     * Constructor con parámetros para facilitar la creación de instancias.
     * @param idMarcaProducto ID de la marca de producto.
     * @param nombreMarcaProducto Nombre de la marca de producto.
     */
    public MarcaProducto(Long idMarcaProducto, String nombreMarcaProducto) {
        this.idMarcaProducto = idMarcaProducto;
        this.nombreMarcaProducto = nombreMarcaProducto;
    }

    // Getters y setters

    /**
     * Obtiene el ID de la marca de producto.
     * @return el ID de la marca.
     */
    public Long getIdMarcaProducto() {
        return idMarcaProducto;
    }

    /**
     * Establece el ID de la marca de producto.
     * @param idMarcaProducto el nuevo ID.
     */
    public void setIdMarcaProducto(Long idMarcaProducto) {
        this.idMarcaProducto = idMarcaProducto;
    }

    /**
     * Obtiene el nombre de la marca de producto.
     * @return el nombre de la marca.
     */
    public String getNombreMarcaProducto() {
        return nombreMarcaProducto;
    }

    /**
     * Establece el nombre de la marca de producto.
     * @param nombreMarcaProducto el nuevo nombre.
     */
    public void setNombreMarcaProducto(String nombreMarcaProducto) {
        this.nombreMarcaProducto = nombreMarcaProducto;
    }
}