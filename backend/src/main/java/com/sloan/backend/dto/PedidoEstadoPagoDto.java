package com.sloan.backend.dto;

import java.time.LocalDateTime;

public class PedidoEstadoPagoDto {
    private String estado;
    private LocalDateTime fechaEstado;
    private String comentario;


    public PedidoEstadoPagoDto() {
        // Constructor por defecto
    }
    
    public PedidoEstadoPagoDto(String comentario, String estado, LocalDateTime fechaEstado) {
        this.comentario = comentario;
        this.estado = estado;
        this.fechaEstado = fechaEstado;
    }

    // Getters y setters

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