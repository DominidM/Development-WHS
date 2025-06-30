package com.sloan.backend.controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.service.PedidoService;

@RestController
@RequestMapping("/api/public/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    public static class PedidoRequest {
        public String descripcion;
        public BigDecimal monto;
        public Integer cantidad;
        public Long pkUsuario;
    }

    @PostMapping("/pagar")
    public Map<String, String> pagar(@RequestBody PedidoRequest request) throws Exception {
        System.out.println(">>> /api/public/pagar called <<<");
        String link = pedidoService.crearPedidoYObtenerLinkPago(
            request.descripcion,
            request.monto,
            request.cantidad,
            request.pkUsuario
        );
        return Map.of("link", link);
    }
}