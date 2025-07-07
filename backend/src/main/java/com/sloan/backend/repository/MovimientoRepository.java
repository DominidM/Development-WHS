package com.sloan.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sloan.backend.model.Movimiento;  

@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
    List<Movimiento> findByTipoMovimiento(String tipoMovimiento);

    @Query("SELECT COALESCE(SUM(m.cantidad), 0) FROM Movimiento m WHERE m.tipoMovimiento = 'PEDIDO_ATENDIDO'")
    int sumaCantidadPorPedidosAtendidos();
}