package com.sloan.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedido")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "pk_extra", nullable = false)
    private Long pkExtra;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pk_usuario", referencedColumnName = "id_usuario", insertable = false, updatable = false)
    private Usuario usuario;

    @Column(name = "pk_usuario", nullable = false)
    private Long pkUsuario;

    @Column(name = "pk_metodopago", nullable = false)
    private Long pkMetodoPago;

    @Column(name = "id_mercadopago", length = 100)
    private String idMercadopago;

    @Column(name = "estado_pago", length = 20, nullable = false)
    private String estadoPago;

    @Column(name = "monto_total", precision = 12, scale = 2, nullable = false)
    private BigDecimal montoTotal;

    @Column(name = "preference_id", length = 100)
    private String preferenceId;

    public Pedido() {}

    public Pedido(String estadoPago, LocalDateTime fecha, String idMercadopago, BigDecimal montoTotal,
                  Long pkExtra, Long pkMetodoPago, Long pkUsuario, String preferenceId) {
        this.estadoPago = estadoPago;
        this.fecha = fecha;
        this.idMercadopago = idMercadopago;
        this.montoTotal = montoTotal;
        this.pkExtra = pkExtra;
        this.pkMetodoPago = pkMetodoPago;
        this.pkUsuario = pkUsuario;
        this.preferenceId = preferenceId;
    }

    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
    public Long getPkExtra() { return pkExtra; }
    public void setPkExtra(Long pkExtra) { this.pkExtra = pkExtra; }
    public Long getPkUsuario() { return pkUsuario; }
    public void setPkUsuario(Long pkUsuario) { this.pkUsuario = pkUsuario; }
    public Long getPkMetodoPago() { return pkMetodoPago; }
    public void setPkMetodoPago(Long pkMetodoPago) { this.pkMetodoPago = pkMetodoPago; }
    public String getIdMercadopago() { return idMercadopago; }
    public void setIdMercadopago(String idMercadopago) { this.idMercadopago = idMercadopago; }
    public String getEstadoPago() { return estadoPago; }
    public void setEstadoPago(String estadoPago) { this.estadoPago = estadoPago; }
    public BigDecimal getMontoTotal() { return montoTotal; }
    public void setMontoTotal(BigDecimal montoTotal) { this.montoTotal = montoTotal; }
    public String getPreferenceId() { return preferenceId; }
    public void setPreferenceId(String preferenceId) { this.preferenceId = preferenceId; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
        if (usuario != null) {
            this.pkUsuario = usuario.getIdUsuario();
        }
    }
    // Alias para compatibilidad con el controlador
    public Long getId() { return getIdPedido(); }
    public BigDecimal getMonto() { return getMontoTotal(); }
}