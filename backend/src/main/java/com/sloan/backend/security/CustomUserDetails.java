package com.sloan.backend.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sloan.backend.model.Usuario;

/**
 * Implementación personalizada de UserDetails para Spring Security,
 * basada en la entidad Usuario de la aplicación.
 */
public class CustomUserDetails implements UserDetails {
    private final Usuario usuario;

    public CustomUserDetails(Usuario usuario) {
        this.usuario = usuario;
    }

    /**
     * Devuelve la colección de roles/autorizaciones del usuario.
     * Se mapea el nombre del rol a la convención de Spring Security: "ROLE_NOMBRE".
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleName = usuario.getRolUsuario().getNombreRol();
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase()));
    }

    @Override
    public String getPassword() {
        return usuario.getPassword();
    }

    @Override
    public String getUsername() {
        return usuario.getCorreoPersona();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }

    /**
     * Permite acceder al objeto Usuario original.
     */
    public Usuario getUsuario() { return usuario; }
}