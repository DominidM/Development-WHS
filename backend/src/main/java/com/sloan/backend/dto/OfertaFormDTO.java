package com.sloan.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OfertaFormDTO {
    private Long idOferta; // Puede ser null para crear
    private Long idProducto;
    private BigDecimal precioOferta;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;

    // Getters y setters
    public Long getIdOferta() { return idOferta; }
    public void setIdOferta(Long idOferta) { this.idOferta = idOferta; }

    public Long getIdProducto() { return idProducto; }
    public void setIdProducto(Long idProducto) { this.idProducto = idProducto; }

    public BigDecimal getPrecioOferta() { return precioOferta; }
    public void setPrecioOferta(BigDecimal precioOferta) { this.precioOferta = precioOferta; }

    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDateTime getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDateTime fechaFin) { this.fechaFin = fechaFin; }
}