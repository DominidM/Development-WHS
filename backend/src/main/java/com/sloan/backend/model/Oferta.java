package com.sloan.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

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
@Table(name = "oferta")
public class Oferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oferta")
    private Long idOferta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_producto", referencedColumnName = "id_producto")
    private Producto producto;

    @Column(name = "precio_oferta", nullable = false)
    private BigDecimal precioOferta;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    // Constructor por defecto
    public Oferta() {
    }
    // Constructor con parámetros
    public Oferta(LocalDate fechaFin, LocalDate fechaInicio, Long idOferta, BigDecimal precioOferta, Producto producto) {
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
        this.idOferta = idOferta;
        this.precioOferta = precioOferta;
        this.producto = producto;
    }

    // Getters y setters
    public Long getIdOferta() { return idOferta; }
    public void setIdOferta(Long idOferta) { this.idOferta = idOferta; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }

    public BigDecimal getPrecioOferta() { return precioOferta; }
    public void setPrecioOferta(BigDecimal precioOferta) { this.precioOferta = precioOferta; }

    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }
}