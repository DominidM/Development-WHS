package com.sloan.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedidodetalles")
public class PedidoDetalles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido_detalle")
    private Long idPedidoDetalle;

    @Column(name = "cantidad_pedido")
    private Integer cantidadPedido;

    @Column(name = "pk_producto_pedido")
    private Long pkProductoPedido;

    @Column(name = "pk_pedido")
    private Long pkPedido;

    public PedidoDetalles(Integer cantidadPedido, Long idPedidoDetalle, Long pkPedido, Long pkProductoPedido) {
        this.cantidadPedido = cantidadPedido;
        this.idPedidoDetalle = idPedidoDetalle;
        this.pkPedido = pkPedido;
        this.pkProductoPedido = pkProductoPedido;
    }


    public Long getIdPedidoDetalle() {
        return idPedidoDetalle;
    }

    public void setIdPedidoDetalle(Long idPedidoDetalle) {
        this.idPedidoDetalle = idPedidoDetalle;
    }

    public Integer getCantidadPedido() {
        return cantidadPedido;
    }

    public void setCantidadPedido(Integer cantidadPedido) {
        this.cantidadPedido = cantidadPedido;
    }

    public Long getPkProductoPedido() {
        return pkProductoPedido;
    }

    public void setPkProductoPedido(Long pkProductoPedido) {
        this.pkProductoPedido = pkProductoPedido;
    }

    public Long getPkPedido() {
        return pkPedido;
    }

    public void setPkPedido(Long pkPedido) {
        this.pkPedido = pkPedido;
    }
}