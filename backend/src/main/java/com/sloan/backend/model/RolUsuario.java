package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'RolUsuario' en la base de datos.
 */
@Entity
@Table(name = "RolUsuario")
public class RolUsuario {
    
    // Identificador único del rol de usuario (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRolUsuario;

    // Nombre del rol (no nulo, máximo 50 caracteres)
    @Column(nullable = false, length = 50)
    private String nombreRol;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public RolUsuario() {
    }

    /**
     * Constructor con parámetros para facilitar la creación de instancias.
     * @param idRolUsuario ID del rol de usuario.
     * @param nombreRol Nombre del rol.
     */
    public RolUsuario(Long idRolUsuario, String nombreRol) {
        this.idRolUsuario = idRolUsuario;
        this.nombreRol = nombreRol;
    }

    // Getters y setters

    /**
     * Obtiene el ID del rol de usuario.
     * @return el ID del rol.
     */
    public Long getIdRolUsuario() {
        return idRolUsuario;
    }

    /**
     * Establece el ID del rol de usuario.
     * @param idRolUsuario el nuevo ID.
     */
    public void setIdRolUsuario(Long idRolUsuario) {
        this.idRolUsuario = idRolUsuario;
    }

    /**
     * Obtiene el nombre del rol de usuario.
     * @return el nombre del rol.
     */
    public String getNombreRol() {
        return nombreRol;
    }

    /**
     * Establece el nombre del rol de usuario.
     * @param nombreRol el nuevo nombre.
     */
    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }
}