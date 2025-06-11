package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sloan.backend.model.MarcaProducto;

@Repository
public interface MarcaProductoRepository extends JpaRepository<MarcaProducto, Long> {
}