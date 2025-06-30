package com.sloan.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercadopago.resources.preference.Preference;
import com.sloan.backend.model.Pedido;
import com.sloan.backend.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private MercadoPagoService mercadoPagoService;

    public String crearPedidoYObtenerLinkPago(String descripcion, BigDecimal monto, Integer cantidad, Long pkUsuario) throws Exception {
        // 1. Crear registro pedido (sin pago aún)
        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setPkUsuario(pkUsuario);
        pedido.setMontoTotal(monto);
        pedido.setEstadoPago("pendiente"); // o el estado que uses
        pedido = pedidoRepository.save(pedido);

        // 2. Crear preferencia en Mercado Pago
        Preference preference = mercadoPagoService.crearPreferencia(
                descripcion,
                monto,
                cantidad,
                pedido.getIdPedido().toString() // externalReference
        );

        // 3. Guardar los ids de Mercado Pago en el pedido
        pedido.setIdMercadopago(preference.getId());
        pedido.setPreferenceId(preference.getId());
        pedidoRepository.save(pedido);

        // 4. Retornar link de pago (init_point)
        return preference.getInitPoint();
    }
}