package com.sloan.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.PedidoRequest;
import com.sloan.backend.service.PedidoService;

@RestController
@RequestMapping("/api/public/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/pagar")
    public Map<String, String> pagar(@RequestBody PedidoRequest request) throws Exception {
        System.out.println(">>> /api/public/pedidos/pagar called <<<");

        // Aquí llamamos el service con todos los datos: descripción, monto, cantidad, usuario, pkExtra, pkMetodoPago, items
        String link = pedidoService.crearPedidoYObtenerLinkPago(
            request.descripcion,
            request.monto,
            request.cantidad,
            request.pkUsuario,
            request.items,      // detalle de productos
            request.pkExtra,    // ID servicio extra
            request.pkMetodoPago // ID método de pago
        );

        return Map.of("link", link);
    }
}