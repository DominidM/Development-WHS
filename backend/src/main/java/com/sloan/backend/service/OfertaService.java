package com.sloan.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sloan.backend.dto.OfertaAdminDTO;
import com.sloan.backend.dto.OfertaDTO;
import com.sloan.backend.dto.OfertaFormDTO;
import com.sloan.backend.model.Oferta;
import com.sloan.backend.model.Producto;
import com.sloan.backend.repository.OfertaRepository;

@Service
public class OfertaService {

    private final OfertaRepository ofertaRepository;

    public OfertaService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    // Para mostrar ofertas activas al público
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

    // Para el formulario admin: buscar oferta por producto (puede estar vencida o no existir)
    public Optional<OfertaFormDTO> getOfertaByProductoId(Long idProducto) {
        return ofertaRepository.findByProducto_IdProducto(idProducto)
            .map(oferta -> {
                OfertaFormDTO dto = new OfertaFormDTO();
                dto.setIdOferta(oferta.getIdOferta());
                dto.setIdProducto(oferta.getProducto().getIdProducto());
                dto.setPrecioOferta(oferta.getPrecioOferta());
                dto.setFechaInicio(oferta.getFechaInicio() != null ? oferta.getFechaInicio().atStartOfDay() : null);
                dto.setFechaFin(oferta.getFechaFin() != null ? oferta.getFechaFin().atStartOfDay() : null);
                return dto;
            });
    }
    
    // Guardar o actualizar una oferta desde el admin
    @Transactional
    public void saveOfertaForm(OfertaFormDTO form, Producto producto) {
        Oferta oferta;
        if (form.getIdOferta() != null) {
            // Editar oferta existente
            oferta = ofertaRepository.findById(form.getIdOferta()).orElse(new Oferta());
        } else {
            // Crear nueva oferta
            oferta = new Oferta();
        }
        oferta.setProducto(producto);
        oferta.setPrecioOferta(form.getPrecioOferta());
        // Convierte LocalDateTime a LocalDate
        oferta.setFechaInicio(form.getFechaInicio() != null ? form.getFechaInicio().toLocalDate() : null);
        oferta.setFechaFin(form.getFechaFin() != null ? form.getFechaFin().toLocalDate() : null);
        ofertaRepository.save(oferta);
    }

    // Eliminar una oferta por ID
    @Transactional
    public void eliminar(Long idOferta) {
        ofertaRepository.deleteById(idOferta);
    }

    public List<OfertaAdminDTO> getOfertasParaAdmin() {
    List<Oferta> ofertas = ofertaRepository.findAll(); // o como recuperes las ofertas
    List<OfertaAdminDTO> dtos = new ArrayList<>();
    for (Oferta o : ofertas) {
        Producto p = o.getProducto();
        LocalDateTime fechaInicio = o.getFechaInicio() != null ? o.getFechaInicio().atStartOfDay() : null;
        LocalDateTime fechaFin = o.getFechaFin() != null ? o.getFechaFin().atStartOfDay() : null;

        OfertaAdminDTO dto = new OfertaAdminDTO(
            p.getDescripcionProducto(),
            fechaFin,
            fechaInicio,
            o.getIdOferta(),
            p.getIdProducto(),
            p.getNombreProducto(),
            o.getPrecioOferta(),
            p.getPrecioProducto(),
            p.getSlug(),
            p.getStockProducto()
        );
        dtos.add(dto);
    }
    return dtos;
}
}