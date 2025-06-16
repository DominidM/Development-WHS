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

/**
 * Entidad JPA que representa la tabla 'oferta' en la base de datos.
 */
@Entity
@Table(name = "oferta")
public class Oferta {

    // Identificador único de la oferta (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oferta")
    private Long idOferta;

    // Relación ManyToOne con Producto (una oferta pertenece a un producto)
    // Carga perezosa para optimizar el rendimiento
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_producto", referencedColumnName = "id_producto")
    private Producto producto;

    // Precio de la oferta (no nulo)
    @Column(name = "precio_oferta", nullable = false)
    private BigDecimal precioOferta;

    // Fecha de inicio de la oferta (no nulo)
    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    // Fecha de fin de la oferta (no nulo)
    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public Oferta() {
    }

    /**
     * Constructor con parámetros para facilitar la creación de instancias.
     * @param fechaFin Fecha de fin de la oferta.
     * @param fechaInicio Fecha de inicio de la oferta.
     * @param idOferta Identificador único de la oferta.
     * @param precioOferta Precio de la oferta.
     * @param producto Producto asociado a la oferta.
     */
    public Oferta(LocalDate fechaFin, LocalDate fechaInicio, Long idOferta, BigDecimal precioOferta, Producto producto) {
        this.fechaFin = fechaFin;
        this.fechaInicio = fechaInicio;
        this.idOferta = idOferta;
        this.precioOferta = precioOferta;
        this.producto = producto;
    }

    // Getters y setters

    /**
     * Obtiene el identificador único de la oferta.
     * @return idOferta
     */
    public Long getIdOferta() { return idOferta; }

    /**
     * Establece el identificador único de la oferta.
     * @param idOferta nuevo ID de la oferta
     */
    public void setIdOferta(Long idOferta) { this.idOferta = idOferta; }

    /**
     * Obtiene el producto asociado a la oferta.
     * @return producto
     */
    public Producto getProducto() { return producto; }

    /**
     * Establece el producto asociado a la oferta.
     * @param producto nuevo producto
     */
    public void setProducto(Producto producto) { this.producto = producto; }

    /**
     * Obtiene el precio de la oferta.
     * @return precioOferta
     */
    public BigDecimal getPrecioOferta() { return precioOferta; }

    /**
     * Establece el precio de la oferta.
     * @param precioOferta nuevo precio
     */
    public void setPrecioOferta(BigDecimal precioOferta) { this.precioOferta = precioOferta; }

    /**
     * Obtiene la fecha de inicio de la oferta.
     * @return fechaInicio
     */
    public LocalDate getFechaInicio() { return fechaInicio; }

    /**
     * Establece la fecha de inicio de la oferta.
     * @param fechaInicio nueva fecha de inicio
     */
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }

    /**
     * Obtiene la fecha de fin de la oferta.
     * @return fechaFin
     */
    public LocalDate getFechaFin() { return fechaFin; }

    /**
     * Establece la fecha de fin de la oferta.
     * @param fechaFin nueva fecha de fin
     */
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }
}