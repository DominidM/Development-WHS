package com.sloan.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.PedidoEstadoPagoDto;
import com.sloan.backend.dto.PedidoRequest;
import com.sloan.backend.dto.PedidoResponse;
import com.sloan.backend.model.Pedido;
import com.sloan.backend.model.PedidoEstadoPago;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.PedidoEstadoPagoRepository;
import com.sloan.backend.repository.PedidoRepository;
import com.sloan.backend.repository.UsuarioRepository;
import com.sloan.backend.service.EmailService;
import com.sloan.backend.service.PedidoService;

@RestController
@RequestMapping("/api/public/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PedidoEstadoPagoRepository pedidoEstadoPagoRepository;

    @PostMapping(value = "/pagar", produces = "application/json")
    public ResponseEntity<?> pagar(@RequestBody PedidoRequest request) {
        System.out.println(">>> /api/public/pedidos/pagar called <<<");

        Map<String, Object> result = new HashMap<>();

        try {

            // Crear pedido
            Pedido pedido = pedidoService.crearPedido(
                    request.descripcion,
                    request.monto,
                    request.cantidad,
                    request.pkUsuario,
                    request.items,
                    request.pkExtra,
                    request.pkMetodoPago
            );

            String emailUsuario = pedido.getUsuario().getCorreoPersona();
            result.put("pedidoId", pedido.getId());
            result.put("monto", pedido.getMonto());

            try {
                switch (request.pkMetodoPago.intValue()) {

                    case 1: // MercadoPago
                        String link = pedidoService.crearLinkMercadoPago(pedido);
                        result.put("tipo", "mercadopago");
                        result.put("link", link);

                        emailService.enviarCorreo(
                            emailUsuario,
                            "Pago vía MercadoPago",
                            "Tu pedido #" + pedido.getId() + " está listo para el pago."
                        );
                        break;

                    case 2: // Efectivo
                        emailService.enviarCorreo(
                            emailUsuario,
                            "Pedido registrado - Pago en efectivo",
                            "Tu pedido #" + pedido.getId() + " fue registrado. Presenta este número al pagar."
                        );

                        result.put("tipo", "efectivo");
                        break;

                    case 3: // Transferencia
                        Map<String, String> datosBancarios = Map.of(
                                "banco", "BCP",
                                "cuenta", "123-456-7890",
                                "titular", "WHC REPRESENTACIONES"
                        );

                        emailService.enviarCorreo(
                                emailUsuario,
                                "Pedido registrado - Transferencia",
                                "Tu pedido #" + pedido.getId() + " está registrado.\n" +
                                        "Datos bancarios:\n" +
                                        "Banco: " + datosBancarios.get("banco") + "\n" +
                                        "Cuenta: " + datosBancarios.get("cuenta") + "\n" +
                                        "Titular: " + datosBancarios.get("titular")
                        );

                        result.put("tipo", "transferencia");
                        result.put("datosBancarios", datosBancarios);
                        break;
                }

            } catch (Exception emailError) {
                System.err.println("⚠ No se pudo enviar correo pero el pedido sigue válido: " + emailError.getMessage());
                result.put("warning", "El pedido fue registrado pero no se pudo enviar correo.");
            }

            result.put("status", "success");
            return ResponseEntity.ok(result);

        } catch (Exception e) {

            e.printStackTrace(); // log para debugging

            return ResponseEntity.status(500).body(Map.of(
                    "status", "error",
                    "mensaje", "Error al procesar el pedido",
                    "detalle", e.getMessage()
            ));
        }
    }
}