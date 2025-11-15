package com.sloan.backend.product;

import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.model.Producto;
import com.sloan.backend.service.ProductoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductoService productoService;

    private ProductoDTO productoDTO;
    private List<ProductoDTO> listaProductos;

    @BeforeEach
    void setUp() {
        // Crear producto de prueba
        productoDTO = new ProductoDTO();
        productoDTO.setIdProducto(1L);
        productoDTO.setNombreProducto("Taladro Profesional");
        productoDTO.setPrecioProducto(new BigDecimal("349.99"));
        productoDTO.setDescripcionProducto("Taladro de alta potencia");
        productoDTO.setSlug("taladro-profesional");
        productoDTO.setStockProducto(10);
        productoDTO.setImagenProducto("https://example.com/taladro.jpg");

        // Crear lista de productos
        ProductoDTO producto2 = new ProductoDTO();
        producto2.setIdProducto(2L);
        producto2.setNombreProducto("Sierra Circular");
        producto2.setPrecioProducto(new BigDecimal("199.99"));
        producto2.setSlug("sierra-circular");
        producto2.setStockProducto(5);

        listaProductos = Arrays.asList(productoDTO, producto2);
    }

    @Test
    void getAllProductos_returnsProductList() throws Exception {
        when(productoService.findAllAsDTO()).thenReturn(listaProductos);

        mockMvc.perform(get("/api/public/productos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nombreProducto").value("Taladro Profesional"))
                .andExpect(jsonPath("$[1].nombreProducto").value("Sierra Circular"));
    }

    @Test
    void getAllProductos_emptyList_returnsEmptyArray() throws Exception {
        when(productoService.findAllAsDTO()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/public/productos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void getProductoBySlug_existingProduct_returnsProduct() throws Exception {
        when(productoService.findBySlugAsDTO("taladro-profesional"))
                .thenReturn(Optional.of(productoDTO));

        mockMvc.perform(get("/api/public/productos/taladro-profesional"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.nombreProducto").value("Taladro Profesional"))
                .andExpect(jsonPath("$.precioProducto").value(349.99))
                .andExpect(jsonPath("$.slug").value("taladro-profesional"))
                .andExpect(jsonPath("$.stockProducto").value(10));
    }

    @Test
    void getProductoBySlug_nonExistingProduct_returnsNotFound() throws Exception {
        when(productoService.findBySlugAsDTO("producto-inexistente"))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/public/productos/producto-inexistente"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getProductoBySlug_verifyAllFields() throws Exception {
        when(productoService.findBySlugAsDTO("taladro-profesional"))
                .thenReturn(Optional.of(productoDTO));

        mockMvc.perform(get("/api/public/productos/taladro-profesional"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.idProducto").value(1))
                .andExpect(jsonPath("$.nombreProducto").value("Taladro Profesional"))
                .andExpect(jsonPath("$.precioProducto").value(349.99))
                .andExpect(jsonPath("$.descripcionProducto").value("Taladro de alta potencia"))
                .andExpect(jsonPath("$.slug").value("taladro-profesional"))
                .andExpect(jsonPath("$.stockProducto").value(10))
                .andExpect(jsonPath("$.imagenProducto").value("https://example.com/taladro.jpg"));
    }

    @Test
    void getProductos_checkJsonStructure() throws Exception {
        when(productoService.findAllAsDTO()).thenReturn(listaProductos);

        mockMvc.perform(get("/api/public/productos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].idProducto").exists())
                .andExpect(jsonPath("$[0].nombreProducto").exists())
                .andExpect(jsonPath("$[0].precioProducto").exists())
                .andExpect(jsonPath("$[0].slug").exists());
    }

    @Test
    void getProductoBySlug_withSpecialCharacters() throws Exception {
        ProductoDTO productoEspecial = new ProductoDTO();
        productoEspecial.setNombreProducto("Producto & Especial");
        productoEspecial.setSlug("producto-especial");
        productoEspecial.setPrecioProducto(new BigDecimal("99.99"));

        when(productoService.findBySlugAsDTO("producto-especial"))
                .thenReturn(Optional.of(productoEspecial));

        mockMvc.perform(get("/api/public/productos/producto-especial"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombreProducto").value("Producto & Especial"));
    }

    @Test
    void getProductos_verifyPriceFormat() throws Exception {
        when(productoService.findAllAsDTO()).thenReturn(listaProductos);

        mockMvc.perform(get("/api/public/productos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].precioProducto").value(349.99))
                .andExpect(jsonPath("$[1].precioProducto").value(199.99));
    }

    @Test
    void getProductos_withStockZero() throws Exception {
        ProductoDTO productoSinStock = new ProductoDTO();
        productoSinStock.setIdProducto(3L);
        productoSinStock.setNombreProducto("Producto Sin Stock");
        productoSinStock.setPrecioProducto(new BigDecimal("50.0"));
        productoSinStock.setSlug("producto-sin-stock");
        productoSinStock.setStockProducto(0);

        when(productoService.findAllAsDTO()).thenReturn(Arrays.asList(productoSinStock));

        mockMvc.perform(get("/api/public/productos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].stockProducto").value(0));
    }

    @Test
    void getProductoBySlug_withoutImage() throws Exception {
        ProductoDTO productoSinImagen = new ProductoDTO();
        productoSinImagen.setNombreProducto("Producto Sin Imagen");
        productoSinImagen.setSlug("producto-sin-imagen");
        productoSinImagen.setPrecioProducto(new BigDecimal("25.0"));
        productoSinImagen.setImagenProducto(null);

        when(productoService.findBySlugAsDTO("producto-sin-imagen"))
                .thenReturn(Optional.of(productoSinImagen));

        mockMvc.perform(get("/api/public/productos/producto-sin-imagen"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.imagenProducto").doesNotExist());
    }
}