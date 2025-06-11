package com.sloan.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByCorreoPersona(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Usa tu CustomUserDetails que ya asigna "ROLE_" + nombreRol.toUpperCase()
        return new CustomUserDetails(usuario);
    }
}