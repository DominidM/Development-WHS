package com.sloan.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.OfertaDTO;
import com.sloan.backend.service.OfertaService;

/**
 * Controlador REST para la gestión pública de ofertas.
 * Expone endpoints para consultar ofertas activas.
 */
@RestController
@RequestMapping("/api/public/ofertas")
public class OfertaController {

    // Servicio encargado de la lógica de negocio relacionada con ofertas
    private final OfertaService ofertaService;

    /**
     * Constructor para inyección de dependencias.
     * @param ofertaService Servicio de ofertas
     */
    public OfertaController(OfertaService ofertaService) {
        this.ofertaService = ofertaService;
    }

    /**
     * Endpoint para obtener la lista de ofertas activas.
     * @return Lista de ofertas activas como DTO
     */
    @GetMapping("/activas")
    public List<OfertaDTO> getOfertasActivas() {
        return ofertaService.getOfertasActivasDTO();
    }

}