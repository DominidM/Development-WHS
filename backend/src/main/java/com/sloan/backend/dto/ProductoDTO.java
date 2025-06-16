package com.sloan.backend.dto;

import java.math.BigDecimal;

/**
 * DTO para representar los datos de un producto en la capa de presentación y transporte.
 * Incluye atributos principales, relaciones por ID (para persistencia) y nombres (para visualización).
 */
public class ProductoDTO {
    // Identificador único del producto
    private Long idProducto;
    // Nombre del producto
    private String nombreProducto;
    // Precio del producto
    private BigDecimal precioProducto;
    // Descripción breve o detallada del producto
    private String descripcionProducto;
    // URL o nombre del archivo de la imagen del producto
    private String imagenProducto;
    // Cantidad de unidades disponibles en stock
    private Integer stockProducto;
    // Slug amigable para URLs o búsqueda
    private String slug;

    // Relaciones como IDs para persistencia (foreign keys)
    private Long pkCategoriaProducto;
    private Long pkMarcaProducto;
    private Long pkEstadoProducto;

    // Relaciones como nombre para mostrar en la vista (opcional)
    private String categoria;
    private String marca;
    private String estado;

    // Getters y setters

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

    public String getSlug() {
        return slug;
    }
    public void setSlug(String slug) {
        this.slug = slug;
    }

    public Long getPkCategoriaProducto() {
        return pkCategoriaProducto;
    }
    public void setPkCategoriaProducto(Long pkCategoriaProducto) {
        this.pkCategoriaProducto = pkCategoriaProducto;
    }

    public Long getPkMarcaProducto() {
        return pkMarcaProducto;
    }
    public void setPkMarcaProducto(Long pkMarcaProducto) {
        this.pkMarcaProducto = pkMarcaProducto;
    }

    public Long getPkEstadoProducto() {
        return pkEstadoProducto;
    }
    public void setPkEstadoProducto(Long pkEstadoProducto) {
        this.pkEstadoProducto = pkEstadoProducto;
    }

    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
}