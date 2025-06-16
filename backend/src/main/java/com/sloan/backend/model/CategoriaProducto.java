package com.sloan.backend.model;

// Importaciones necesarias para JPA/Hibernate
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'categoria_p' en la base de datos.
 */
@Entity
@Table(name = "categoria_p")
public class CategoriaProducto {

    // Identificador único de la categoría de producto (clave primaria)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria_p")
    private Long idCategoriaProducto;

    // Nombre de la categoría de producto (no puede ser nulo, máximo 50 caracteres)
    @Column(name = "nombre_categoria_p", length = 50, nullable = false)
    private String nombreCategoriaProducto;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public CategoriaProducto() {
    }

    /**
     * Constructor con parámetros para crear instancias más fácilmente.
     * @param idCategoriaProducto ID de la categoría.
     * @param nombreCategoriaProducto Nombre de la categoría.
     */
    public CategoriaProducto(Long idCategoriaProducto, String nombreCategoriaProducto) {
        this.idCategoriaProducto = idCategoriaProducto;
        this.nombreCategoriaProducto = nombreCategoriaProducto;
    }

    // Getters y setters

    /**
     * Obtiene el ID de la categoría de producto.
     * @return el ID de la categoría.
     */
    public Long getIdCategoriaProducto() {
        return idCategoriaProducto;
    }

    /**
     * Establece el ID de la categoría de producto.
     * @param idCategoriaProducto el nuevo ID.
     */
    public void setIdCategoriaProducto(Long idCategoriaProducto) {
        this.idCategoriaProducto = idCategoriaProducto;
    }

    /**
     * Obtiene el nombre de la categoría de producto.
     * @return el nombre de la categoría.
     */
    public String getNombreCategoriaProducto() {
        return nombreCategoriaProducto;
    }

    /**
     * Establece el nombre de la categoría de producto.
     * @param nombreCategoriaProducto el nuevo nombre.
     */
    public void setNombreCategoriaProducto(String nombreCategoriaProducto) {
        this.nombreCategoriaProducto = nombreCategoriaProducto;
    }
}