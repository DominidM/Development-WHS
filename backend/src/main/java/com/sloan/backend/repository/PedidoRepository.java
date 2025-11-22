package com.sloan.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sloan.backend.model.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByPkUsuario(Long pkUsuario);
    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.usuario")
    List<Pedido> findAllWithUsuario();
    @Query("SELECT p FROM Pedido p LEFT JOIN FETCH p.usuario WHERE p.estadoPago = :estado")
    List<Pedido> findByEstadoWithUsuario(String estado);
    List<Pedido> findByUsuario_IdUsuario(Long idUsuario);
}