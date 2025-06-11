package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sloan.backend.model.EstadoProducto;

@Repository
public interface EstadoProductoRepository extends JpaRepository<EstadoProducto, Long> {
}