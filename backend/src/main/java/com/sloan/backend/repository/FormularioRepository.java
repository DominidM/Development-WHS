package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sloan.backend.model.Formulario;

@Repository
public interface FormularioRepository extends JpaRepository<Formulario, Long> {
}