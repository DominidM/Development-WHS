package com.sloan.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mercadopago.resources.preference.Preference;
import com.sloan.backend.dto.PedidoRequest.PedidoDetalleRequest;
import com.sloan.backend.model.Pedido;
import com.sloan.backend.model.PedidoDetalles;
import com.sloan.backend.repository.PedidoDetalleRepository;
import com.sloan.backend.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    private MercadoPagoService mercadoPagoService;

    public String crearPedidoYObtenerLinkPago(
            String descripcion,
            BigDecimal monto,
            Integer cantidad,
            Long pkUsuario,
            List<PedidoDetalleRequest> items,
            Long pkExtra,
            Long pkMetodoPago
    ) throws Exception {
        // 1. Crear registro pedido (sin pago aún)
        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setPkUsuario(pkUsuario);
        pedido.setMontoTotal(monto);
        pedido.setEstadoPago("pendiente");
        pedido.setPkExtra(pkExtra);
        pedido.setPkMetodoPago(pkMetodoPago);
        pedido = pedidoRepository.save(pedido);

        // 2. Crear registros de detalle de pedido
        if (items != null) {
            for (PedidoDetalleRequest item : items) {
                PedidoDetalles detalle = new PedidoDetalles();
                detalle.setPkPedido(pedido.getIdPedido());
                detalle.setPkProductoPedido(item.pkProductoPedido);
                detalle.setCantidadPedido(item.cantidadPedido);
                pedidoDetalleRepository.save(detalle);
            }
        }

        // 3. Crear preferencia en Mercado Pago
        Preference preference = mercadoPagoService.crearPreferencia(
                descripcion,
                monto,
                cantidad,
                pedido.getIdPedido().toString() // externalReference
        );

        // 4. Guardar los ids de Mercado Pago en el pedido
        pedido.setIdMercadopago(preference.getId());
        pedido.setPreferenceId(preference.getId());
        pedidoRepository.save(pedido);

        // 5. Retornar link de pago (init_point)
        return preference.getInitPoint();
    }
}