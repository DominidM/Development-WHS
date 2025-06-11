package com.sloan.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.OfertaDTO;
import com.sloan.backend.service.OfertaService;

@RestController
@RequestMapping("/api/public/ofertas")
public class OfertaController {

    private final OfertaService ofertaService;

    public OfertaController(OfertaService ofertaService) {
        this.ofertaService = ofertaService;
    }

    @GetMapping("/activas")
    public List<OfertaDTO> getOfertasActivas() {
        return ofertaService.getOfertasActivasDTO();
    }

    // El resto igual
}