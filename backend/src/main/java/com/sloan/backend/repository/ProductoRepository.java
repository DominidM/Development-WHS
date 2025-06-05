package com.sloan.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findBySlug(String slug);
    boolean existsBySlug(String slug);
    Optional<Producto> findBySlugIgnoreCase(String slug);
}