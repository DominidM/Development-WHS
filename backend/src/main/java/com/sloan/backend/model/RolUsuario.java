package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "RolUsuario")
public class RolUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRolUsuario;

    @Column(nullable = false, length = 50)
    private String nombreRol;

    // Constructor por defecto
    public RolUsuario() {
    }

    // Constructor con parámetros
    public RolUsuario(Long idRolUsuario, String nombreRol) {
        this.idRolUsuario = idRolUsuario;
        this.nombreRol = nombreRol;
    }

    // Getters y setters
    public Long getIdRolUsuario() {
        return idRolUsuario;
    }

    public void setIdRolUsuario(Long idRolUsuario) {
        this.idRolUsuario = idRolUsuario;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }
}