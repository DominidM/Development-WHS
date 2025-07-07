package com.sloan.backend.service;

import org.springframework.stereotype.Service;

import com.sloan.backend.repository.MovimientoRepository;

@Service
public class MovimientoService {

    private final MovimientoRepository movimientoRepository;

    public MovimientoService(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    // Sumar cantidad de productos restados por Pedidos Atendidos usando la query directa
    public int getTotalProductosRestadosPorPedidosAtendidos() {
        return movimientoRepository.sumaCantidadPorPedidosAtendidos();
    }
}