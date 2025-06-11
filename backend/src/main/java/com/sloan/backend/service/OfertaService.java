package com.sloan.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sloan.backend.dto.OfertaDTO;
import com.sloan.backend.model.Oferta;
import com.sloan.backend.model.Producto;
import com.sloan.backend.repository.OfertaRepository;

@Service
public class OfertaService {

    private final OfertaRepository ofertaRepository;

    public OfertaService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    public List<OfertaDTO> getOfertasActivasDTO() {
        List<Oferta> ofertas = ofertaRepository.findOfertasActivas(LocalDate.now());
        return ofertas.stream().map(oferta -> {
            Producto prod = oferta.getProducto();
            return new OfertaDTO(
                oferta.getIdOferta(),
                prod.getIdProducto(),
                prod.getNombreProducto(),
                prod.getDescripcionProducto(),
                prod.getImagenProducto(),
                prod.getSlug(),
                prod.getPrecioProducto(),
                oferta.getPrecioOferta(),
                prod.getStockProducto() 
            );
        }).collect(Collectors.toList());
    }

}