package com.sloan.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'producto' en la base de datos.
 */
@Entity
@Table(name = "producto")
public class Producto {

    // Identificador único del producto (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    // Nombre del producto (no nulo, máximo 150 caracteres)
    @Column(name = "nombre_producto", length = 150, nullable = false)
    private String nombreProducto;

    // Precio del producto (no nulo, hasta 10 dígitos, 2 decimales)
    @Column(name = "precio_producto", precision = 10, scale = 2, nullable = false)
    private BigDecimal precioProducto;

    // Descripción textual del producto
    @Column(name = "descripcion_producto")
    private String descripcionProducto;

    // URL o nombre del archivo de la imagen del producto (máximo 255 caracteres)
    @Column(name = "imagen_producto", length = 255)
    private String imagenProducto;

    // Cantidad de stock disponible (no nulo)
    @Column(name = "stock_producto", nullable = false)
    private Integer stockProducto;

    // Relación ManyToOne con la categoría del producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_categoria_producto", referencedColumnName = "id_categoria_p")
    private CategoriaProducto categoria;

    // Relación ManyToOne con la marca del producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_marca_producto", referencedColumnName = "id_marca_p")
    private MarcaProducto marca;

    // Relación ManyToOne con el estado del producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_estado_producto", referencedColumnName = "id_estado_p")
    private EstadoProducto estado;

    // Slug único para URLs amigables (máximo 180 caracteres)
    @Column(name = "slug", length = 180, unique = true)
    private String slug;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public Producto() {
    }

    /**
     * Constructor con parámetros para facilitar la creación de instancias.
     * @param categoria             Categoría asociada al producto.
     * @param descripcionProducto   Descripción textual del producto.
     * @param estado                Estado actual del producto.
     * @param idProducto            Identificador único del producto.
     * @param imagenProducto        Imagen representativa del producto.
     * @param marca                 Marca asociada al producto.
     * @param nombreProducto        Nombre del producto.
     * @param precioProducto        Precio del producto.
     * @param slug                  Slug único para URL.
     * @param stockProducto         Cantidad de stock disponible.
     */
    public Producto(CategoriaProducto categoria, String descripcionProducto, EstadoProducto estado, Long idProducto, String imagenProducto, MarcaProducto marca, String nombreProducto, BigDecimal precioProducto, String slug, Integer stockProducto) {
        this.categoria = categoria;
        this.descripcionProducto = descripcionProducto;
        this.estado = estado;
        this.idProducto = idProducto;
        this.imagenProducto = imagenProducto;
        this.marca = marca;
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.slug = slug;
        this.stockProducto = stockProducto;
    }

    // ----- Getters y Setters -----

    /**
     * Obtiene el ID del producto.
     */
    public Long getIdProducto() {
        return idProducto;
    }

    /**
     * Establece el ID del producto.
     */
    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    /**
     * Obtiene el nombre del producto.
     */
    public String getNombreProducto() {
        return nombreProducto;
    }

    /**
     * Establece el nombre del producto.
     */
    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    /**
     * Obtiene el precio del producto.
     */
    public BigDecimal getPrecioProducto() {
        return precioProducto;
    }

    /**
     * Establece el precio del producto.
     */
    public void setPrecioProducto(BigDecimal precioProducto) {
        this.precioProducto = precioProducto;
    }

    /**
     * Obtiene la descripción del producto.
     */
    public String getDescripcionProducto() {
        return descripcionProducto;
    }

    /**
     * Establece la descripción del producto.
     */
    public void setDescripcionProducto(String descripcionProducto) {
        this.descripcionProducto = descripcionProducto;
    }

    /**
     * Obtiene la imagen del producto.
     */
    public String getImagenProducto() {
        return imagenProducto;
    }

    /**
     * Establece la imagen del producto.
     */
    public void setImagenProducto(String imagenProducto) {
        this.imagenProducto = imagenProducto;
    }

    /**
     * Obtiene la cantidad de stock del producto.
     */
    public Integer getStockProducto() {
        return stockProducto;
    }

    /**
     * Establece la cantidad de stock del producto.
     */
    public void setStockProducto(Integer stockProducto) {
        this.stockProducto = stockProducto;
    }

    /**
     * Obtiene la categoría asociada al producto.
     */
    public CategoriaProducto getCategoria() {
        return categoria;
    }

    /**
     * Establece la categoría asociada al producto.
     */
    public void setCategoria(CategoriaProducto categoria) {
        this.categoria = categoria;
    }

    /**
     * Obtiene la marca asociada al producto.
     */
    public MarcaProducto getMarca() {
        return marca;
    }

    /**
     * Establece la marca asociada al producto.
     */
    public void setMarca(MarcaProducto marca) {
        this.marca = marca;
    }

    /**
     * Obtiene el estado del producto.
     */
    public EstadoProducto getEstado() {
        return estado;
    }

    /**
     * Establece el estado del producto.
     */
    public void setEstado(EstadoProducto estado) {
        this.estado = estado;
    }

    /**
     * Obtiene el slug del producto.
     */
    public String getSlug() {
        return slug;
    }

    /**
     * Establece el slug del producto.
     */
    public void setSlug(String slug) {
        this.slug = slug;
    }
}