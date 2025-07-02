package com.sloan.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.PedidoRequest;
import com.sloan.backend.model.Pedido;
import com.sloan.backend.service.EmailService;
import com.sloan.backend.service.PedidoService; // Debes tener esto implementado

@RestController
@RequestMapping("/api/public/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private EmailService emailService; // Servicio para enviar correos

    @PostMapping("/pagar")
    public Map<String, Object> pagar(@RequestBody PedidoRequest request) throws Exception {
        System.out.println(">>> /api/public/pedidos/pagar called <<<");

        Map<String, Object> result = new HashMap<>();

        // Crear el pedido (implementa este método para que devuelva el pedido creado)
        Pedido pedido = pedidoService.crearPedido(
            request.descripcion,
            request.monto,
            request.cantidad,
            request.pkUsuario,
            request.items,
            request.pkExtra,
            request.pkMetodoPago
        );

        // Obtén el correo del usuario (ajusta según tu modelo)
        String emailUsuario = pedido.getUsuario().getCorreoPersona();

        if (request.pkMetodoPago == 1) { // MercadoPago
            String link = pedidoService.crearLinkMercadoPago(pedido);
            result.put("tipo", "mercadopago");
            result.put("link", link);
        } else if (request.pkMetodoPago == 2) { // Efectivo
            // (Opcional) Genera un voucher PDF y obtén la URL
            // String voucherUrl = voucherService.generarVoucherPDF(pedido);
            String voucherUrl = null; // Si tienes esa lógica, si no, deja null

            // Envía el correo al cliente
            emailService.enviarCorreo(
                emailUsuario,
                "Pedido registrado - Pago en efectivo",
                "Hola, tu pedido #" + pedido.getId() +
                " ha sido registrado por un total de S/" + pedido.getMonto() + ".\n" +
                "Presenta este número al pagar en tienda o al repartidor.\n" +
                (voucherUrl != null ? "Voucher: " + voucherUrl : "")
            );

            result.put("tipo", "efectivo");
            result.put("numeroPedido", pedido.getId());
            result.put("mensaje", "Presenta este número al momento de pagar en tienda o al repartidor.");
            result.put("voucherUrl", voucherUrl);
        } else if (request.pkMetodoPago == 3) { // Transferencia
            // Datos bancarios de ejemplo, puedes obtenerlos de la BD/config
            Map<String, String> datosBancarios = Map.of(
                "banco", "BCP",
                "cuenta", "123-456-7890",
                "titular", "WHC REPRESENTACIONES"
            );

            // Envía el correo al cliente
            emailService.enviarCorreo(
                emailUsuario,
                "Pedido registrado - Pago por transferencia",
                "Hola, tu pedido #" + pedido.getId() +
                " ha sido registrado por un total de S/" + pedido.getMonto() + ".\n" +
                "Transfiere el monto y envía el comprobante a pagos@tusitio.com.\n" +
                "Banco: " + datosBancarios.get("banco") + "\n" +
                "Cuenta: " + datosBancarios.get("cuenta") + "\n" +
                "Titular: " + datosBancarios.get("titular")
            );

            result.put("tipo", "transferencia");
            result.put("numeroPedido", pedido.getId());
            result.put("mensaje", "Transfiere el monto a la cuenta indicada y envía el comprobante.");
            result.put("datosBancarios", datosBancarios);
        } else {
            result.put("mensaje", "Método de pago no soportado.");
        }

        return result;
    }
}