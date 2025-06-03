package com.sloan.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.UsuarioRepository;

@Service
public class AuthServiceImpl implements AuthService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public Usuario login(String correo, String password) {
        Usuario usuario = usuarioRepository.findByCorreoPersona(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return usuario;
    }

    @Override
    public Usuario register(Usuario usuario) {
        if (usuarioRepository.findByCorreoPersona(usuario.getCorreoPersona()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }
}