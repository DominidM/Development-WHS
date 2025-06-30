package com.sloan.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "log_mercadopago")
public class LogMercadoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_log")
    private Long idLog;

    @Column(name = "pk_pedido")
    private Long pkPedido;

    @Column(name = "payload", columnDefinition = "jsonb")
    private String payload; // Puedes usar String para guardar el JSON

    @Column(name = "fecha_log")
    private LocalDateTime fechaLog;

    public LogMercadoPago(LocalDateTime fechaLog, Long idLog, String payload, Long pkPedido) {
        this.fechaLog = fechaLog;
        this.idLog = idLog;
        this.payload = payload;
        this.pkPedido = pkPedido;
    }

    // Getters y Setters
    // ...

    public Long getIdLog() {
        return idLog;
    }

    public void setIdLog(Long idLog) {
        this.idLog = idLog;
    }

    public Long getPkPedido() {
        return pkPedido;
    }

    public void setPkPedido(Long pkPedido) {
        this.pkPedido = pkPedido;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public LocalDateTime getFechaLog() {
        return fechaLog;
    }

    public void setFechaLog(LocalDateTime fechaLog) {
        this.fechaLog = fechaLog;
    }
}