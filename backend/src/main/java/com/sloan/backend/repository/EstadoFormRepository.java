package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sloan.backend.model.EstadoForm;

@Repository
public interface EstadoFormRepository extends JpaRepository<EstadoForm, Long> {
    // Puedes agregar métodos personalizados si lo necesitas
}