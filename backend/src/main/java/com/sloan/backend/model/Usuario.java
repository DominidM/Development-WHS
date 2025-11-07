package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "correo_persona", nullable = false, unique = true, length = 100)
    @NotBlank(message = "El correo es requerido")
    @Email(message = "Formato de email inválido")
    @Size(max = 100, message = "El correo no puede exceder 100 caracteres")
    private String correoPersona;

    // Permitir almacenar hashes largos (ej. bcrypt ~60). Validación de la contraseña en DTOs.
    @Column(nullable = false, length = 255)
    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 8, max = 255, message = "La contraseña debe tener entre 8 y 255 caracteres")
    private String password;

    @Column(name = "nombre_persona", nullable = false, length = 100)
    @NotBlank(message = "El nombre es requerido")
    @Size(min = 1, max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombrePersona;

    @ManyToOne
    @JoinColumn(name = "pk_rol_usuario", nullable = false)
    @NotNull(message = "El rol es requerido")
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