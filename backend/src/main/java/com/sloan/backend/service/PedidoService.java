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
import com.sloan.backend.model.PedidoEstadoPago;
import com.sloan.backend.model.Producto;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.PedidoDetalleRepository;
import com.sloan.backend.repository.PedidoEstadoPagoRepository;
import com.sloan.backend.repository.PedidoRepository;
import com.sloan.backend.repository.ProductoRepository;
import com.sloan.backend.repository.UsuarioRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoEstadoPagoRepository pedidoEstadoPagoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MercadoPagoService mercadoPagoService;

    @Autowired
    private ProductoRepository productoRepository;
    /**
     * Crea un pedido y registra los detalles, pero NO genera link de pago.
     * Devuelve el Pedido creado.
     */
    public Pedido crearPedido(
            String descripcion,
            BigDecimal monto,
            Integer cantidad,
            Long pkUsuario,
            List<PedidoDetalleRequest> items,
            Long pkExtra,
            Long pkMetodoPago
    ) {
        // Buscar el usuario y setearlo como relación (opcional)
        Usuario usuario = usuarioRepository.findById(pkUsuario)
                .orElse(null);

        Pedido pedido = new Pedido();
        pedido.setFecha(LocalDateTime.now());
        pedido.setPkUsuario(pkUsuario);
        pedido.setUsuario(usuario); // Relación JPA, si tu modelo lo soporta
        pedido.setMontoTotal(monto);
        pedido.setEstadoPago("pendiente");
        pedido.setPkExtra(pkExtra);
        pedido.setPkMetodoPago(pkMetodoPago);
        // Si tu modelo soporta descripción y cantidad, agrégalos aquí

        pedido = pedidoRepository.save(pedido);

        // Guardar detalles del pedido
        if (items != null) {
            for (PedidoDetalleRequest item : items) {
                PedidoDetalles detalle = new PedidoDetalles();
                detalle.setPkPedido(pedido.getIdPedido());
                detalle.setPkProductoPedido(item.pkProductoPedido);
                detalle.setCantidadPedido(item.cantidadPedido);
                pedidoDetalleRepository.save(detalle);
            }
        }
        return pedido;
    }

    public List<Pedido> listarPorUsuario(Long pkUsuario) {
        return pedidoRepository.findByPkUsuario(pkUsuario);
    }
        
    /**
     * Genera y retorna un link de pago de MercadoPago para el pedido dado.
     * Actualiza el pedido con los IDs de MercadoPago.
     */
    public String crearLinkMercadoPago(Pedido pedido) throws Exception {
        Preference preference = mercadoPagoService.crearPreferencia(
            "Pedido #" + pedido.getIdPedido(),
            pedido.getMontoTotal(),
            1,
            pedido.getIdPedido().toString()
        );
        pedido.setIdMercadopago(preference.getId());
        pedido.setPreferenceId(preference.getId());
        pedidoRepository.save(pedido);
        return preference.getInitPoint();
    }

    /**
     * (Opcional) Método original: crea pedido y retorna link de pago en una sola llamada.
     * Úsalo solo si realmente necesitas esta funcionalidad.
     */
    public String crearPedidoYObtenerLinkPago(
            String descripcion,
            BigDecimal monto,
            Integer cantidad,
            Long pkUsuario,
            List<PedidoDetalleRequest> items,
            Long pkExtra,
            Long pkMetodoPago
    ) throws Exception {
        Pedido pedido = crearPedido(
            descripcion, monto, cantidad, pkUsuario, items, pkExtra, pkMetodoPago
        );
        return crearLinkMercadoPago(pedido);
    }

    /**
     * Lista todos los pedidos registrados en la base de datos.
     */
    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }


      /**
     * Obtiene un pedido por su ID, incluyendo detalles y usuario.
     */
    public Pedido obtenerPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado con id: " + id));
        // Cargar detalles del pedido si no están ya cargados (por ejemplo, si es LAZY loading)
        List<PedidoDetalles> detalles = pedidoDetalleRepository.findByPkPedido(pedido.getIdPedido());
        pedido.setDetalles(detalles);
        // (Opcional) Si usuario es LAZY, puedes forzar carga: pedido.getUsuario().getNombrePersona();
        return pedido;
    }


    /**
     * Rechaza un pedido cambiando su estado.
     */
    public void rechazarPedido(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado con id: " + id));
        pedido.setEstadoPago("rechazado"); // O usa tu campo de estado adecuado
        pedidoRepository.save(pedido);
    }

        /**
     * Acepta o atiende un pedido cambiando su estado.
     */
    public void atenderPedido(Long id) {
    Pedido pedido = pedidoRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado con id: " + id));
    
    // Solo restar stock si aún NO estaba atendido antes
    if (!"atendido".equalsIgnoreCase(pedido.getEstadoPago())) {
        List<PedidoDetalles> detalles = pedidoDetalleRepository.findByPkPedido(pedido.getIdPedido());
            for (PedidoDetalles detalle : detalles) {
                Producto producto = productoRepository.findById(detalle.getPkProductoPedido())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con id: " + detalle.getPkProductoPedido()));
                int stockActual = producto.getStockProducto();
                int cantidadPedido = detalle.getCantidadPedido();
                if (stockActual < cantidadPedido) {
                    throw new IllegalStateException("No hay stock suficiente para el producto: " + producto.getNombreProducto());
                }
                producto.setStockProducto(stockActual - cantidadPedido);
                productoRepository.save(producto);
            }
            pedido.setEstadoPago("atendido");
            pedidoRepository.save(pedido);
        }
         // ---- Guarda el historial ----
        PedidoEstadoPago historial = new PedidoEstadoPago();
        historial.setPkPedido(pedido.getIdPedido());
        historial.setEstado("atendido");
        historial.setFechaEstado(LocalDateTime.now());
        historial.setComentario("Pedido atendido correctamente.");
        pedidoEstadoPagoRepository.save(historial);
    }
}