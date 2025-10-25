package com.sloan.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

/**
 * DTO que representa una oferta pública de un producto.
 * Incluye validaciones con Bean Validation (Jakarta Validation).
 *
 * Notas:
 * - Las validaciones básicas están aquí para dar feedback rápido desde el controlador (@Valid).
 * - Comprobaciones dependientes del estado en BD (p. ej. si existe el producto, o si ya tiene otra oferta solapada)
 *   deben realizarse en la capa de servicio.
 */
public class OfertaDTO {
    // Identificador de la oferta
    private Long idOferta;

    // Identificador del producto relacionado con la oferta (requerido)
    @NotNull(message = "Producto requerido")
    private Long idProducto;

    // Nombre del producto (opcional en la entrada, útil en vistas)
    @Size(max = 255, message = "Nombre demasiado largo")
    private String nombreProducto;

    // Descripción del producto/oferta
    @Size(max = 500, message = "Descripción demasiado larga")
    private String descripcionProducto;

    // URL o nombre de la imagen del producto
    @Size(max = 2083, message = "URL de imagen demasiado larga")
    private String imagenProducto;

    // Slug único para enlaces amigables del producto
    @Size(max = 255, message = "Slug demasiado largo")
    private String slug;

    // Precio original del producto (debe ser proporcionado por el controlador / servicio)
    @NotNull(message = "Precio del producto requerido")
    @DecimalMin(value = "0.01", inclusive = true, message = "Precio del producto debe ser mayor que 0")
    @Digits(integer = 12, fraction = 2, message = "Formato de precio del producto inválido")
    private BigDecimal precioProducto;

    // Precio especial de la oferta (entrada del formulario)
    @NotNull(message = "Precio de oferta requerido")
    @DecimalMin(value = "0.01", inclusive = true, message = "El precio de oferta debe ser mayor que 0")
    @Digits(integer = 12, fraction = 2, message = "Formato de precio de oferta inválido")
    private BigDecimal precioOferta;

    // Opcional: porcentaje de descuento (si usas porcentaje en lugar de precio directo)
    @Min(value = 1, message = "El descuento mínimo es 1%")
    @Max(value = 99, message = "El descuento máximo es 99%")
    private Integer porcentajeDescuento;

    // Fecha de inicio y fin de la oferta
    @NotNull(message = "Fecha de inicio requerida")
    @FutureOrPresent(message = "La fecha de inicio debe ser hoy o posterior")
    private LocalDateTime fechaInicio;

    @NotNull(message = "Fecha de fin requerida")
    private LocalDateTime fechaFin;

    // Stock disponible del producto (lectura, >= 0)
    @PositiveOrZero(message = "Stock debe ser 0 o mayor")
    private Integer stockProducto;

    // Constructor vacío requerido para frameworks y serialización
    public OfertaDTO() {}

    /**
     * Constructor completo para inicializar todos los campos de la oferta.
     */
    public OfertaDTO(Long idOferta, Long idProducto, String nombreProducto, String descripcionProducto,
                     String imagenProducto, String slug, BigDecimal precioProducto, BigDecimal precioOferta,
                     Integer porcentajeDescuento, LocalDateTime fechaInicio, LocalDateTime fechaFin, Integer stockProducto) {
        this.idOferta = idOferta;
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.descripcionProducto = descripcionProducto;
        this.imagenProducto = imagenProducto;
        this.slug = slug;
        this.precioProducto = precioProducto;
        this.precioOferta = precioOferta;
        this.porcentajeDescuento = porcentajeDescuento;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.stockProducto = stockProducto;
    }

    // Getters y setters

    public Long getIdOferta() { return idOferta; }
    public void setIdOferta(Long idOferta) { this.idOferta = idOferta; }

    public Long getIdProducto() { return idProducto; }
    public void setIdProducto(Long idProducto) { this.idProducto = idProducto; }

    public String getNombreProducto() { return nombreProducto; }
    public void setNombreProducto(String nombreProducto) { this.nombreProducto = nombreProducto; }

    public String getDescripcionProducto() { return descripcionProducto; }
    public void setDescripcionProducto(String descripcionProducto) { this.descripcionProducto = descripcionProducto; }

    public String getImagenProducto() { return imagenProducto; }
    public void setImagenProducto(String imagenProducto) { this.imagenProducto = imagenProducto; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public BigDecimal getPrecioProducto() { return precioProducto; }
    public void setPrecioProducto(BigDecimal precioProducto) { this.precioProducto = precioProducto; }

    public BigDecimal getPrecioOferta() { return precioOferta; }
    public void setPrecioOferta(BigDecimal precioOferta) { this.precioOferta = precioOferta; }

    public Integer getPorcentajeDescuento() { return porcentajeDescuento; }
    public void setPorcentajeDescuento(Integer porcentajeDescuento) { this.porcentajeDescuento = porcentajeDescuento; }

    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDateTime getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDateTime fechaFin) { this.fechaFin = fechaFin; }

    public Integer getStockProducto() { return stockProducto; }
    public void setStockProducto(Integer stockProducto) { this.stockProducto = stockProducto; }

    /**
     * Validación cruzada: precioOferta debe ser menor que precioProducto.
     * Permitimos que @NotNull capture valores nulos; aquí devolvemos true si falta alguno
     * para que el mensaje específico `@NotNull` se muestre en lugar de este.
     */
    @AssertTrue(message = "El precio de oferta debe ser menor que el precio original del producto")
    public boolean isPrecioOfertaMenorQuePrecioProducto() {
        if (precioOferta == null || precioProducto == null) return true;
        return precioOferta.compareTo(precioProducto) < 0;
    }

    /**
     * Validación cruzada: fechaFin debe ser posterior a fechaInicio.
     * Si alguna fecha es nula, dejamos que @NotNull la gestione.
     */
    @AssertTrue(message = "La fecha de fin debe ser posterior a la fecha de inicio")
    public boolean isFechaFinPosteriorAFechaInicio() {
        if (fechaInicio == null || fechaFin == null) return true;
        return fechaFin.isAfter(fechaInicio);
    }
}