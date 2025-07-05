package com.sloan.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.PedidoDetalles;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalles, Long> {
    List<PedidoDetalles> findByPkPedido(Long pkPedido);
}