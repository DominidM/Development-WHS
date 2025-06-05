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

@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    @Column(name = "nombre_producto", length = 150, nullable = false)
    private String nombreProducto;

    @Column(name = "precio_producto", precision = 10, scale = 2, nullable = false)
    private BigDecimal precioProducto;

    @Column(name = "descripcion_pro")
    private String descripcionProducto;

    @Column(name = "imagen_producto", length = 255)
    private String imagenProducto;

    @Column(name = "stock_producto", nullable = false)
    private Integer stockProducto;

    // Relations
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_categoria_producto", referencedColumnName = "id_categoria_p")
    private CategoriaProducto categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_marca_producto", referencedColumnName = "id_marca_p")
    private MarcaProducto marca;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_estado_producto", referencedColumnName = "id_estado_p")
    private EstadoProducto estado;

    @Column(name = "slug", length = 180, unique = true)
    private String slug;

    // Constructor por defecto
    public Producto() {
    }

    // Constructor con parámetros
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

    // Getters y Setters
    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public BigDecimal getPrecioProducto() {
        return precioProducto;
    }

    public void setPrecioProducto(BigDecimal precioProducto) {
        this.precioProducto = precioProducto;
    }

    public String getDescripcionProducto() {
        return descripcionProducto;
    }

    public void setDescripcionProducto(String descripcionProducto) {
        this.descripcionProducto = descripcionProducto;
    }

    public String getImagenProducto() {
        return imagenProducto;
    }

    public void setImagenProducto(String imagenProducto) {
        this.imagenProducto = imagenProducto;
    }

    public Integer getStockProducto() {
        return stockProducto;
    }

    public void setStockProducto(Integer stockProducto) {
        this.stockProducto = stockProducto;
    }

    public CategoriaProducto getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaProducto categoria) {
        this.categoria = categoria;
    }

    public MarcaProducto getMarca() {
        return marca;
    }

    public void setMarca(MarcaProducto marca) {
        this.marca = marca;
    }

    public EstadoProducto getEstado() {
        return estado;
    }

    public void setEstado(EstadoProducto estado) {
        this.estado = estado;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }
}