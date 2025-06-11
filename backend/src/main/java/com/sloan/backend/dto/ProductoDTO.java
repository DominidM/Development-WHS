package com.sloan.backend.dto;

import java.math.BigDecimal;

public class ProductoDTO {
    private Long idProducto;
    private String nombreProducto;
    private BigDecimal precioProducto;
    private String descripcionProducto;
    private String imagenProducto;
    private Integer stockProducto;
    private String slug;

    // Relaciones como IDs para persistencia
    private Long pkCategoriaProducto;
    private Long pkMarcaProducto;
    private Long pkEstadoProducto;

    // Relaciones como nombre para mostrar (opcional)
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