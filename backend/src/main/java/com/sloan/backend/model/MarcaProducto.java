package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "marca_p")
public class MarcaProducto {

    // Identificador único del usuario
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_marca_p")
    private Long idMarcaProducto;

    @Column(name = "nombre_marca_p", length = 50, nullable = false)
    private String nombreMarcaProducto;

    // Constructor por defecto
    public MarcaProducto() {
    }

    // Constructor con parámetros
    public MarcaProducto(Long idMarcaProducto, String nombreMarcaProducto) {
        this.idMarcaProducto = idMarcaProducto;
        this.nombreMarcaProducto = nombreMarcaProducto;
    }

    // Getters y setters
    public Long getIdMarcaProducto() {
        return idMarcaProducto;
    }

    public void setIdMarcaProducto(Long idMarcaProducto) {
        this.idMarcaProducto = idMarcaProducto;
    }

    public String getNombreMarcaProducto() {
        return nombreMarcaProducto;
    }

    public void setNombreMarcaProducto(String nombreMarcaProducto) {
        this.nombreMarcaProducto = nombreMarcaProducto;
    }

    
}