package com.sloan.backend.dto;

import java.math.BigDecimal;

/**
 * DTO que representa una oferta pública de un producto.
 * Incluye información tanto de la oferta como del producto relacionado.
 */
public class OfertaDTO {
    // Identificador de la oferta
    private Long idOferta;
    // Identificador del producto relacionado con la oferta
    private Long idProducto;
    // Nombre del producto
    private String nombreProducto;
    // Descripción del producto
    private String descripcionProducto;
    // URL o nombre de la imagen del producto
    private String imagenProducto;
    // Slug único para enlaces amigables del producto
    private String slug;
    // Precio original del producto
    private BigDecimal precioProducto;
    // Precio especial de la oferta
    private BigDecimal precioOferta;
    // Stock disponible del producto
    private Integer stockProducto;

    // Constructor vacío requerido para frameworks y serialización
    public OfertaDTO() {}

    /**
     * Constructor completo para inicializar todos los campos de la oferta.
     */
    public OfertaDTO(Long idOferta, Long idProducto, String nombreProducto, String descripcionProducto,
                     String imagenProducto, String slug, BigDecimal precioProducto, BigDecimal precioOferta, Integer stockProducto) {
        this.idOferta = idOferta;
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.descripcionProducto = descripcionProducto;
        this.imagenProducto = imagenProducto;
        this.slug = slug;
        this.precioProducto = precioProducto;
        this.precioOferta = precioOferta;
        this.stockProducto = stockProducto;
    }

    // Getters y setters para cada campo

    public Long getIdOferta() { return idOferta; }
    public void setIdOferta(Long idOferta) { this.idOferta = idOferta; }

    public Long getIdProducto() { return idProducto; }
    public void setIdProducto(Long idProducto) { this.idProducto = idProducto; }

    public String getNombreProducto() { return nombreProducto; }
    public void setNombreProducto(String nombreProducto) { this.nombreProducto = nombreProducto; }

    public String getDescripcionProducto() { return descripcionProducto; }
    public void setDescripcionProducto(String descripcionProducto) { this.descripcionProducto = descripcionProducto; }

    public String getImagenProducto() { return imagenProducto; }
    public void setImagenProducto(String imagenProducto) { this.imagenProducto = imagenProducto; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public BigDecimal getPrecioProducto() { return precioProducto; }
    public void setPrecioProducto(BigDecimal precioProducto) { this.precioProducto = precioProducto; }

    public BigDecimal getPrecioOferta() { return precioOferta; }
    public void setPrecioOferta(BigDecimal precioOferta) { this.precioOferta = precioOferta; }

    public Integer getStockProducto() { return stockProducto; }
    public void setStockProducto(Integer stockProducto) { this.stockProducto = stockProducto; }
}