package com.sloan.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sloan.backend.model.Oferta;
import com.sloan.backend.model.Producto;

public interface OfertaRepository extends JpaRepository<Oferta, Long> {
    // Para evitar duplicados:
    Optional<Oferta> findByProducto(Producto producto);

    // Si ya usas esto para el DTO:
    Optional<Oferta> findByProducto_IdProducto(Long idProducto);

    // Ofertas activas por fecha
    @Query("SELECT o FROM Oferta o WHERE o.fechaInicio <= :hoy AND o.fechaFin >= :hoy")
    List<Oferta> findOfertasActivas(LocalDate hoy);
}