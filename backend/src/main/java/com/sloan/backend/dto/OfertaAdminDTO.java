package com.sloan.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OfertaAdminDTO {
    private Long idOferta;
    private Long idProducto;
    private String nombreProducto;
    private String descripcionProducto;
    private String slug;
    private BigDecimal precioProducto;
    private BigDecimal precioOferta;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private Integer stockProducto;

    public OfertaAdminDTO() {
        // Constructor por defecto
    }
    
    public OfertaAdminDTO(String descripcionProducto, LocalDateTime fechaFin, LocalDateTime fechaInicio, Long idOferta, Long idProducto, String nombreProducto, BigDecimal precioOferta, BigDecimal precioProducto, String slug, Integer stockProducto) {
        this.descripcionProducto = descripcionProducto;
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
        this.idOferta = idOferta;
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.precioOferta = precioOferta;
        this.precioProducto = precioProducto;
        this.slug = slug;
        this.stockProducto = stockProducto;
    }

    // Getters y setters para todos los campos...

    public Long getIdOferta() {
        return idOferta;
    }

    public void setIdOferta(Long idOferta) {
        this.idOferta = idOferta;
    }

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

    public String getDescripcionProducto() {
        return descripcionProducto;
    }

    public void setDescripcionProducto(String descripcionProducto) {
        this.descripcionProducto = descripcionProducto;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public BigDecimal getPrecioProducto() {
        return precioProducto;
    }

    public void setPrecioProducto(BigDecimal precioProducto) {
        this.precioProducto = precioProducto;
    }

    public BigDecimal getPrecioOferta() {
        return precioOferta;
    }

    public void setPrecioOferta(BigDecimal precioOferta) {
        this.precioOferta = precioOferta;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getStockProducto() {
        return stockProducto;
    }

    public void setStockProducto(Integer stockProducto) {
        this.stockProducto = stockProducto;
    }
}