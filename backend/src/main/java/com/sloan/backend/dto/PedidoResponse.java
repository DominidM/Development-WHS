package com.sloan.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoResponse {
    public Long idPedido;
    public LocalDateTime fecha;
    public BigDecimal montoTotal;
    public String estadoPago;
    public List<Detalle> items;

    // Agrega este campo:
    public List<PedidoEstadoPagoDto> historialEstados;

    public static class Detalle {
        public Long productoId;
        public String nombreProducto;
        public Integer cantidad;
        public BigDecimal precioUnitario;
    }

    // Getters y setters para historialEstados
    public List<PedidoEstadoPagoDto> getHistorialEstados() {
        return historialEstados;
    }

    public void setHistorialEstados(List<PedidoEstadoPagoDto> historialEstados) {
        this.historialEstados = historialEstados;
    }
}