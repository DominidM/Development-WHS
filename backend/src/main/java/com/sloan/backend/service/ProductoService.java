package com.sloan.backend.service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.model.Producto;
import com.sloan.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public ProductoDTO toDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setIdProducto(producto.getIdProducto());
        dto.setNombreProducto(producto.getNombreProducto());
        dto.setPrecioProducto(producto.getPrecioProducto());
        dto.setDescripcionProducto(producto.getDescripcionProducto());
        dto.setImagenProducto(producto.getImagenProducto());
        dto.setStockProducto(producto.getStockProducto());
        dto.setSlug(producto.getSlug());
        dto.setCategoria(producto.getCategoria() != null ? producto.getCategoria().getNombreCategoriaProducto() : null);
        dto.setMarca(producto.getMarca() != null ? producto.getMarca().getNombreMarcaProducto() : null);
        dto.setEstado(producto.getEstado() != null ? producto.getEstado().getNombreEstadoProducto() : null);
        return dto;
    }

    public Producto toEntity(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setIdProducto(dto.getIdProducto());
        producto.setNombreProducto(dto.getNombreProducto());
        producto.setPrecioProducto(dto.getPrecioProducto());
        producto.setDescripcionProducto(dto.getDescripcionProducto());
        producto.setImagenProducto(dto.getImagenProducto());
        producto.setStockProducto(dto.getStockProducto());
        producto.setSlug(dto.getSlug());
        // TODO: Asignar categoria, marca, estado si tu modelo lo requiere
        return producto;
    }

    // Guardar un producto
    public ProductoDTO save(ProductoDTO productoDTO) {
        Producto producto = toEntity(productoDTO);
        // Si el slug no viene, lo generamos
        if (producto.getSlug() == null || producto.getSlug().isBlank()) {
            producto.setSlug(toSlug(producto.getNombreProducto()));
        }
        Producto saved = productoRepository.save(producto);
        return toDTO(saved);
    }

    // Generar slug a partir del nombre de producto (evita tildes y caracteres raros)
    public String toSlug(String nombre) {
        String normalized = Normalizer.normalize(nombre, Normalizer.Form.NFD);
        String slug = Pattern.compile("\\p{InCombiningDiacriticalMarks}+").matcher(normalized).replaceAll("");
        slug = slug.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        // Si el slug ya existe, agrega un número
        String originalSlug = slug;
        int contador = 2;
        while (productoRepository.existsBySlug(slug)) {
            slug = originalSlug + "-" + contador;
            contador++;
        }
        return slug;
    }

    // Buscar producto por slug y devolverlo como DTO (case-insensitive)
    public Optional<ProductoDTO> findBySlugAsDTO(String slug) {
        return productoRepository.findBySlugIgnoreCase(slug).map(this::toDTO);
    }

    // Listar todos los productos como DTOs
    public List<ProductoDTO> findAllAsDTO() {
        try {
            List<Producto> productos = productoRepository.findAll();
            return productos.stream()
                    .map(this::toDTO)
                    .filter(dto -> dto != null)
                    .toList();
        } catch (Exception e) {
            System.err.println("Error en findAllAsDTO: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}