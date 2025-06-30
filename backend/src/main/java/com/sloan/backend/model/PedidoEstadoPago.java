package com.sloan.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedido_estado_pago")
public class PedidoEstadoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Long idHistorial;

    @Column(name = "pk_pedido")
    private Long pkPedido;

    @Column(name = "estado", length = 30)
    private String estado;

    @Column(name = "fecha_estado")
    private LocalDateTime fechaEstado;

    @Column(name = "comentario")
    private String comentario;

    public PedidoEstadoPago(String comentario, String estado, LocalDateTime fechaEstado, Long idHistorial, Long pkPedido) {
        this.comentario = comentario;
        this.estado = estado;
        this.fechaEstado = fechaEstado;
        this.idHistorial = idHistorial;
        this.pkPedido = pkPedido;
    }

    public Long getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(Long idHistorial) {
        this.idHistorial = idHistorial;
    }

    public Long getPkPedido() {
        return pkPedido;
    }

    public void setPkPedido(Long pkPedido) {
        this.pkPedido = pkPedido;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaEstado() {
        return fechaEstado;
    }

    public void setFechaEstado(LocalDateTime fechaEstado) {
        this.fechaEstado = fechaEstado;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }


}