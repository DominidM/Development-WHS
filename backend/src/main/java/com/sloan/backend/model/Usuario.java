package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entidad JPA que representa la tabla 'Usuario' en la base de datos.
 */
@Entity
@Table(name = "Usuario")
public class Usuario {
    // ----- Atributos -----

    // Identificador único del usuario (clave primaria, autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    // Correo electrónico único del usuario (no nulo, único, máximo 100 caracteres)
    @Column(nullable = false, unique = true, length = 100)
    private String correoPersona;

    // Contraseña del usuario (no nulo, máximo 255 caracteres)
    @Column(nullable = false, length = 255)
    private String password;

    // Nombre del usuario (no nulo, máximo 100 caracteres)
    @Column(nullable = false, length = 100)
    private String nombrePersona;

    // Relación ManyToOne con el rol del usuario (no nulo)
    @ManyToOne
    @JoinColumn(name = "pk_rolUsuario", nullable = false)
    private RolUsuario rolUsuario;

    @Column(name = "reset_token", length = 100)
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private Long resetTokenExpiry;

    /**
     * Constructor por defecto (necesario para JPA)
     */
    public Usuario() {
    }

    /**
     * Constructor con parámetros para facilitar la creación de instancias.
     * @param correoPersona Correo electrónico del usuario.
     * @param idUsuario Identificador único del usuario.
     * @param nombrePersona Nombre del usuario.
     * @param password Contraseña del usuario.
     * @param rolUsuario Rol asociado al usuario.
     */
    public Usuario(String correoPersona, Long idUsuario, String nombrePersona, String password, RolUsuario rolUsuario) {
        this.correoPersona = correoPersona;
        this.idUsuario = idUsuario;
        this.nombrePersona = nombrePersona;
        this.password = password;
        this.rolUsuario = rolUsuario;
    }

    // ----- Getters y setters -----

    /**
     * Obtiene el identificador único del usuario.
     */
    public Long getIdUsuario() {
        return idUsuario;
    }

    /**
     * Establece el identificador único del usuario.
     */
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    /**
     * Obtiene el correo electrónico del usuario.
     */
    public String getCorreoPersona() {
        return correoPersona;
    }

    /**
     * Establece el correo electrónico del usuario.
     */
    public void setCorreoPersona(String correoPersona) {
        this.correoPersona = correoPersona;
    }

    /**
     * Obtiene la contraseña del usuario.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Establece la contraseña del usuario.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Obtiene el nombre del usuario.
     */
    public String getNombrePersona() {
        return nombrePersona;
    }

    /**
     * Establece el nombre del usuario.
     */
    public void setNombrePersona(String nombrePersona) {
        this.nombrePersona = nombrePersona;
    }

    /**
     * Obtiene el rol asociado al usuario.
     */
    public RolUsuario getRolUsuario() {
        return rolUsuario;
    }

    /**
     * Establece el rol asociado al usuario.
     */
    public void setRolUsuario(RolUsuario rolUsuario) {
        this.rolUsuario = rolUsuario;
    }

    public String getResetToken() {
        return resetToken;
    }
    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }
    public Long getResetTokenExpiry() {
        return resetTokenExpiry;
    }
    public void setResetTokenExpiry(Long resetTokenExpiry) {
        this.resetTokenExpiry = resetTokenExpiry;
    }
}