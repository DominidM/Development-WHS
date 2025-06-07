package com.sloan.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.service.ProductoService;

@RestController
@RequestMapping("/producto")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Listar todos los productos
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        return ResponseEntity.ok(productoService.findAllAsDTO());
    }

    // Buscar producto por slug
    @GetMapping("/{slug}")
    public ResponseEntity<ProductoDTO> getProductoBySlug(@PathVariable String slug) {
        System.out.println("Slug recibido: " + slug);
        return productoService.findBySlugAsDTO(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    
}