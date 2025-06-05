package com.sloan.backend.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sloan.backend.model.RolUsuario;

@Repository
public interface RolUsuarioRepository extends JpaRepository<RolUsuario, Long> {
    // Usa el nombre real del campo en tu entidad
    Optional<RolUsuario> findByNombreRol(String nombreRol); // Por ejemplo, si tu campo es 'nombreRol'
}