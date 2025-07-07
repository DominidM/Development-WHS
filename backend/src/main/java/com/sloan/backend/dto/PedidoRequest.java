package com.sloan.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class PedidoRequest {
    public String descripcion;
    public BigDecimal monto;
    public Integer cantidad;
    public Long pkUsuario;
    public Long pkExtra;       
    public Long pkMetodoPago;   
    public List<PedidoDetalleRequest> items;

    // Clase interna para cada producto del carrito
    public static class PedidoDetalleRequest {
        public Long pkProductoPedido;    // ID del producto
        public Integer cantidadPedido;   // Cantidad de ese producto
    }
}