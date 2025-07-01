package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.PedidoDetalles;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalles, Long> {
}