package com.sloan.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.PedidoEstadoPagoDto;
import com.sloan.backend.dto.PedidoResponse;
import com.sloan.backend.model.Pedido;
import com.sloan.backend.model.PedidoEstadoPago;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.PedidoEstadoPagoRepository;
import com.sloan.backend.repository.PedidoRepository;
import com.sloan.backend.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/user/pedidos")
public class UsuarioPedidoController {
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PedidoEstadoPagoRepository pedidoEstadoPagoRepository;
    @GetMapping("/mis-pedidos")
    public List<PedidoResponse> getMisPedidos(Authentication authentication) {
        String correo = authentication.getName();
        Usuario usuario = usuarioRepository.findByCorreoPersona(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Pedido> pedidos = pedidoRepository.findByPkUsuario(usuario.getId());

        return pedidos.stream().map(pedido -> {
            PedidoResponse resp = new PedidoResponse();
            resp.idPedido = pedido.getId();
            resp.fecha = pedido.getFecha();
            resp.montoTotal = pedido.getMonto();
            resp.estadoPago = pedido.getEstadoPago();

           if (pedido.getDetalles() != null) {
                resp.items = pedido.getDetalles().stream().map(det -> {
                    PedidoResponse.Detalle d = new PedidoResponse.Detalle();
                    d.productoId = det.getProducto().getIdProducto();
                    d.nombreProducto = det.getProducto().getNombreProducto();
                    d.cantidad = det.getCantidadPedido();
                    d.precioUnitario = det.getProducto().getPrecioProducto();
                    return d;
                }).collect(Collectors.toList());
            }

            List<PedidoEstadoPago> historial = pedidoEstadoPagoRepository.findByPkPedidoOrderByFechaEstadoAsc(pedido.getId());
            resp.setHistorialEstados(historial.stream().map(e -> new PedidoEstadoPagoDto(
                    e.getComentario(),
                    e.getEstado(),
                    e.getFechaEstado()
            )).collect(Collectors.toList()));

            return resp;
        }).collect(Collectors.toList());
    }
}
