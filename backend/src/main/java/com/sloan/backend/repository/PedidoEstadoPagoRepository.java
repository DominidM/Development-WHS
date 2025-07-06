package com.sloan.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.PedidoEstadoPago;

public interface PedidoEstadoPagoRepository extends JpaRepository<PedidoEstadoPago, Long> {
    List<PedidoEstadoPago> findByPkPedidoOrderByFechaEstadoAsc(Long pkPedido);
}