package com.sloan.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sloan.backend.model.Oferta;

public interface OfertaRepository extends JpaRepository<Oferta, Long> {
    // Consultar ofertas activas por fecha actual
    @Query("SELECT o FROM Oferta o WHERE :hoy BETWEEN o.fechaInicio AND o.fechaFin")
    List<Oferta> findOfertasActivas(LocalDate hoy);

    // Buscar oferta por producto específico y fecha (opcional)
    @Query("SELECT o FROM Oferta o WHERE o.producto.idProducto = :idProducto AND :hoy BETWEEN o.fechaInicio AND o.fechaFin")
    Oferta findOfertaActivaByProducto(Long idProducto, LocalDate hoy);
}