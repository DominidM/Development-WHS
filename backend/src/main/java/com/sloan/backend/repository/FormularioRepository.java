package com.sloan.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.Formulario;

public interface FormularioRepository extends JpaRepository<Formulario, Long> {
    // Puedes agregar métodos personalizados si lo necesitas
}