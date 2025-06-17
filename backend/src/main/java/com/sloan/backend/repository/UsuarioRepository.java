package com.sloan.backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoPersona(String correoPersona);
    Optional<Usuario> findByCorreoPersonaAndPassword(String correoPersona, String password);
     Optional<Usuario> findByResetToken(String resetToken);
}