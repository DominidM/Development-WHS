package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "correo_persona", nullable = false, unique = true, length = 100)
    private String correoPersona;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "nombre_persona", nullable = false, length = 100)
    private String nombrePersona;

    @ManyToOne
    @JoinColumn(name = "pk_rol_usuario", nullable = false)
    private RolUsuario rolUsuario;

    @Column(name = "reset_token", length = 100)
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private Long resetTokenExpiry;

    public Usuario() {}

    public Usuario(String correoPersona, Long idUsuario, String nombrePersona, String password, RolUsuario rolUsuario) {
        this.correoPersona = correoPersona;
        this.idUsuario = idUsuario;
        this.nombrePersona = nombrePersona;
        this.password = password;
        this.rolUsuario = rolUsuario;
    }

    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
    public Long getId() { return getIdUsuario(); }
    public String getCorreoPersona() { return correoPersona; }
    public void setCorreoPersona(String correoPersona) { this.correoPersona = correoPersona; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getNombrePersona() { return nombrePersona; }
    public void setNombrePersona(String nombrePersona) { this.nombrePersona = nombrePersona; }
    public RolUsuario getRolUsuario() { return rolUsuario; }
    public void setRolUsuario(RolUsuario rolUsuario) { this.rolUsuario = rolUsuario; }
    public String getResetToken() { return resetToken; }
    public void setResetToken(String resetToken) { this.resetToken = resetToken; }
    public Long getResetTokenExpiry() { return resetTokenExpiry; }
    public void setResetTokenExpiry(Long resetTokenExpiry) { this.resetTokenExpiry = resetTokenExpiry; }
}