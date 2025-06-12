package com.sloan.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.service.ProductoService;

@RestController
@RequestMapping("/api/public/productos")
public class ProductoController {
    @Autowired
    private ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        return ResponseEntity.ok(productoService.findAllAsDTO());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProductoDTO> getProductoBySlug(@PathVariable String slug) {
        return productoService.findBySlugAsDTO(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // MÉTODO DE ACTUALIZACIÓN (UPDATE)
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(
            @PathVariable Long id,
            @RequestBody ProductoDTO productoDTO) {
        // Asegúrate de que el id del path y del body coincidan
        if (!id.equals(productoDTO.getIdProducto())) {
            return ResponseEntity.badRequest().body("El id del path y el del body no coinciden.");
        }
        // Llama a tu servicio para actualizar (debes implementarlo)
        boolean actualizado = productoService.actualizarProducto(productoDTO);
        if (actualizado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}