package com.sloan.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "extra_servicio")
public class ExtraServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio")
    private Long idServicio;

    @Column(name = "nombre_servicio", length = 100, nullable = false)
    private String nombreServicio;

    @Column(name = "descripcion_servicio")
    private String descripcionServicio;

    @Column(name = "costo", precision = 10, scale = 2)
    private BigDecimal costo;

    @Column(name = "duracion_dias")
    private Integer duracionDias;

    @Column(name = "activo")
    private Boolean activo = true;

    // Constructor vacío para JPA
    public ExtraServicio() {
    }

    // Constructor con parámetros
    public ExtraServicio(String nombreServicio, String descripcionServicio, BigDecimal costo, Integer duracionDias, Boolean activo) {
        this.nombreServicio = nombreServicio;
        this.descripcionServicio = descripcionServicio;
        this.costo = costo;
        this.duracionDias = duracionDias;
        this.activo = activo;
    }

    public Long getIdServicio() {
        return idServicio;
    }

    public void setIdServicio(Long idServicio) {
        this.idServicio = idServicio;
    }

    public String getNombreServicio() {
        return nombreServicio;
    }

    public void setNombreServicio(String nombreServicio) {
        this.nombreServicio = nombreServicio;
    }

    public String getDescripcionServicio() {
        return descripcionServicio;
    }

    public void setDescripcionServicio(String descripcionServicio) {
        this.descripcionServicio = descripcionServicio;
    }

    public BigDecimal getCosto() {
        return costo;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;
    }

    public Integer getDuracionDias() {
        return duracionDias;
    }

    public void setDuracionDias(Integer duracionDias) {
        this.duracionDias = duracionDias;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}