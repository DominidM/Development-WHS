package com.sloan.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.EstadoForm;

public interface EstadoFormRepository extends JpaRepository<EstadoForm, Long> {
    Optional<EstadoForm> findByNombreEstado(String nombreEstado);
}