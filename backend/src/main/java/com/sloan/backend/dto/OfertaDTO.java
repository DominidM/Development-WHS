package com.sloan.backend.dto;

import java.math.BigDecimal;

public class OfertaDTO {
    private Long idOferta;
    private Long idProducto;
    private String nombreProducto;
    private String descripcionProducto;
    private String imagenProducto;
    private String slug;
    private BigDecimal precioProducto; // precio original
    private BigDecimal precioOferta;   // precio de oferta
    private Integer stockProducto;     // <--- Añadido stock

    public OfertaDTO() {}

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

    // Getters y setters...
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