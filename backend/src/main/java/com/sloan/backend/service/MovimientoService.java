package com.sloan.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.sloan.backend.model.Movimiento;
import com.sloan.backend.repository.MovimientoRepository;

@Service
public class MovimientoService {

    private final MovimientoRepository movimientoRepository;

    public MovimientoService(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    public int getTotalProductosRestadosPorPedidosAtendidos() {
        return movimientoRepository.sumaCantidadPorPedidosAtendidos();
    }

    public List<Movimiento> getAllMovimientos() {
        return movimientoRepository.findAll();
    }
}