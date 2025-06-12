package com.sloan.backend.service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.model.CategoriaProducto;
import com.sloan.backend.model.EstadoProducto;
import com.sloan.backend.model.MarcaProducto;
import com.sloan.backend.model.Producto;
import com.sloan.backend.repository.CategoriaProductoRepository;
import com.sloan.backend.repository.EstadoProductoRepository;
import com.sloan.backend.repository.MarcaProductoRepository;
import com.sloan.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaProductoRepository categoriaProductoRepository;
    @Autowired
    private MarcaProductoRepository marcaProductoRepository;
    @Autowired
    private EstadoProductoRepository estadoProductoRepository;

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
        dto.setPkCategoriaProducto(producto.getCategoria() != null ? producto.getCategoria().getIdCategoriaProducto() : null);
        dto.setPkMarcaProducto(producto.getMarca() != null ? producto.getMarca().getIdMarcaProducto() : null);
        dto.setPkEstadoProducto(producto.getEstado() != null ? producto.getEstado().getIdEstadoProducto() : null);
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

        if (dto.getPkCategoriaProducto() != null) {
            CategoriaProducto cat = categoriaProductoRepository.findById(dto.getPkCategoriaProducto()).orElse(null);
            producto.setCategoria(cat);
        }
        if (dto.getPkMarcaProducto() != null) {
            MarcaProducto mar = marcaProductoRepository.findById(dto.getPkMarcaProducto()).orElse(null);
            producto.setMarca(mar);
        }
        if (dto.getPkEstadoProducto() != null) {
            EstadoProducto est = estadoProductoRepository.findById(dto.getPkEstadoProducto()).orElse(null);
            producto.setEstado(est);
        }
        return producto;
    }

    // Guardar un producto
    public ProductoDTO save(ProductoDTO productoDTO) {
        Producto producto = toEntity(productoDTO);
        if (producto.getSlug() == null || producto.getSlug().isBlank()) {
            producto.setSlug(toSlug(producto.getNombreProducto()));
        }
        Producto saved = productoRepository.save(producto);
        return toDTO(saved);
    }

    public String toSlug(String nombre) {
        String normalized = Normalizer.normalize(nombre, Normalizer.Form.NFD);
        String slug = Pattern.compile("\\p{InCombiningDiacriticalMarks}+").matcher(normalized).replaceAll("");
        slug = slug.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        String originalSlug = slug;
        int contador = 2;
        while (productoRepository.existsBySlug(slug)) {
            slug = originalSlug + "-" + contador;
            contador++;
        }
        return slug;
    }

    public Optional<ProductoDTO> findBySlugAsDTO(String slug) {
        return productoRepository.findBySlugIgnoreCase(slug).map(this::toDTO);
    }

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

    // MÉTODO NUEVO: Actualizar producto
    public boolean actualizarProducto(ProductoDTO dto) {
        if (dto.getIdProducto() == null) return false;
        Optional<Producto> opt = productoRepository.findById(dto.getIdProducto());
        if (opt.isEmpty()) return false;
        Producto producto = opt.get();

        producto.setNombreProducto(dto.getNombreProducto());
        producto.setPrecioProducto(dto.getPrecioProducto());
        producto.setDescripcionProducto(dto.getDescripcionProducto());
        producto.setImagenProducto(dto.getImagenProducto());
        producto.setStockProducto(dto.getStockProducto());
        producto.setSlug(dto.getSlug());

        if (dto.getPkCategoriaProducto() != null) {
            CategoriaProducto cat = categoriaProductoRepository.findById(dto.getPkCategoriaProducto()).orElse(null);
            producto.setCategoria(cat);
        }
        if (dto.getPkMarcaProducto() != null) {
            MarcaProducto mar = marcaProductoRepository.findById(dto.getPkMarcaProducto()).orElse(null);
            producto.setMarca(mar);
        }
        if (dto.getPkEstadoProducto() != null) {
            EstadoProducto est = estadoProductoRepository.findById(dto.getPkEstadoProducto()).orElse(null);
            producto.setEstado(est);
        }

        productoRepository.save(producto);
        return true;
    }

    // MÉTODO NUEVO: Eliminar producto por ID
    public void eliminarPorId(Long id) {
    productoRepository.deleteById(id);
}
}