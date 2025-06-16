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

/**
 * Controlador REST para la gestión de productos públicos.
 * Permite la consulta y actualización de productos a través de la API.
 */
@RestController
@RequestMapping("/api/public/productos")
public class ProductoController {

    // Inyección del servicio que maneja la lógica de productos
    @Autowired
    private ProductoService productoService;

    /**
     * Obtiene la lista de todos los productos en formato DTO.
     * @return ResponseEntity con la lista de productos.
     */
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> getAllProductos() {
        return ResponseEntity.ok(productoService.findAllAsDTO());
    }

    /**
     * Obtiene un producto específico usando el slug como identificador.
     * @param slug Slug del producto a buscar.
     * @return ResponseEntity con el producto encontrado o 404 si no existe.
     */
    @GetMapping("/{slug}")
    public ResponseEntity<ProductoDTO> getProductoBySlug(@PathVariable String slug) {
        return productoService.findBySlugAsDTO(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Actualiza un producto existente.
     * Valida que el id en la URL coincida con el id en el cuerpo del DTO.
     * @param id identificador del producto (vía URL)
     * @param productoDTO datos a actualizar (vía body)
     * @return ResponseEntity indicando el resultado de la operación.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(
            @PathVariable Long id,
            @RequestBody ProductoDTO productoDTO) {
        // Validación: el id de la URL debe coincidir con el del body
        if (!id.equals(productoDTO.getIdProducto())) {
            return ResponseEntity.badRequest().body("El id del path y el del body no coinciden.");
        }
        // Llama al servicio para actualizar el producto
        boolean actualizado = productoService.actualizarProducto(productoDTO);
        if (actualizado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}