package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.TipoForm;

public interface TipoFormRepository extends JpaRepository<TipoForm, Long> {
}