package com.sloan.backend.controller;

import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.model.EstadoForm;
import com.sloan.backend.model.Formulario;
import com.sloan.backend.model.Pedido;
import com.sloan.backend.model.RolUsuario;
import com.sloan.backend.model.TipoForm;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.CategoriaProductoRepository;
import com.sloan.backend.repository.EstadoProductoRepository;
import com.sloan.backend.repository.MarcaProductoRepository;
import com.sloan.backend.repository.TipoFormRepository;
import com.sloan.backend.service.AuthService;
import com.sloan.backend.service.EstadoFormService;
import com.sloan.backend.service.FormularioService;
import com.sloan.backend.service.PedidoService;
import com.sloan.backend.service.ProductoService;
import com.sloan.backend.service.RolUsuarioService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired 
    private ProductoService productoService;
    @Autowired
    private AuthService usuarioService;
    @Autowired
    private FormularioService formularioService;
    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private CategoriaProductoRepository categoriaRepo;
    @Autowired
    private MarcaProductoRepository marcaRepo;
    @Autowired
    private EstadoProductoRepository estadoRepo;
    @Autowired
    private EstadoFormService estadoFormService;
    @Autowired
    private TipoFormRepository tipoFormRepository;
    @Autowired
    private RolUsuarioService rolUsuarioService;

    // ---- NOMBRE DE USUARIO EN MODELO PARA TODAS LAS VISTAS ----
    @ModelAttribute
    public void addNombrePersonaToModel(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            String correo = auth.getName();
            Usuario usuario = usuarioService.findByUsername(correo);
            if (usuario != null) {
                model.addAttribute("nombre_persona", usuario.getNombrePersona());
                return;
            }
        }
        model.addAttribute("nombre_persona", "Administrador");
    }

    @GetMapping({"", "/"})
    public String adminRoot() {
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/login")
    public String login() {
        return "admin/login";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("formulariosCount", formularioService.listarTodos().size());
        model.addAttribute("productosCount", productoService.findAllAsDTO().size());
        model.addAttribute("usuariosCount", usuarioService.listarTodos().size());
        model.addAttribute("pedidosCount", pedidoService.listarTodos().size());
        model.addAttribute("currentPage", "dashboard");
        return "admin/dashboard";
    }

    // --------------------- PRODUCTOS ---------------------

    @GetMapping("/productos")
    public String productos(Model model) {
        try {
            System.out.println("Entrando a /admin/productos");
            List<ProductoDTO> productos = productoService.findAllAsDTO();
            model.addAttribute("productos", productos);
        } catch (Exception e) {
            System.err.println("Error al cargar productos: " + e.getMessage());
            model.addAttribute("errorProductos", "Error: " + e.getMessage());
        }
        model.addAttribute("currentPage", "productos");
        return "admin/productos";
    }

    @GetMapping("/productos/nuevo")
    public String nuevoProducto(Model model) {
        model.addAttribute("producto", new ProductoDTO());
        model.addAttribute("categorias", categoriaRepo.findAll());
        model.addAttribute("marcas", marcaRepo.findAll());
        model.addAttribute("estados", estadoRepo.findAll());
        // No se marca como productos para no activar menú lateral aquí
        model.addAttribute("currentPage", "productos");
        return "admin/producto-nuevo";
    }

    @PostMapping("/productos/guardar")
    public String guardarProducto(@ModelAttribute("producto") ProductoDTO productoDTO, Model model) {
        try {
            productoService.save(productoDTO);
            return "redirect:/admin/productos";
        } catch (Exception e) {
            model.addAttribute("producto", productoDTO);
            model.addAttribute("categorias", categoriaRepo.findAll());
            model.addAttribute("marcas", marcaRepo.findAll());
            model.addAttribute("estados", estadoRepo.findAll());
            model.addAttribute("errorGuardar", "No se pudo guardar el producto: " + e.getMessage());
            model.addAttribute("currentPage", "productos");
            return "admin/producto-nuevo";
        }
    }

    @GetMapping("/productos/{slug}")
    public String detalleProductoPorSlug(@PathVariable String slug, Model model) {
        Optional<ProductoDTO> productoOpt = productoService.findBySlugAsDTO(slug);
        if (productoOpt.isEmpty()) {
            return "redirect:/admin/productos?notfound";
        }
        model.addAttribute("producto", productoOpt.get());
        model.addAttribute("currentPage", "productos");
        return "admin/producto-detalle";
    }

    @GetMapping("/productos/editar/{slug}")
    public String editarProductoPorSlug(@PathVariable String slug, Model model) {
        Optional<ProductoDTO> productoOpt = productoService.findBySlugAsDTO(slug);
        if (productoOpt.isEmpty()) {
            return "redirect:/admin/productos?notfound";
        }
        ProductoDTO producto = productoOpt.get();
        model.addAttribute("producto", producto);
        model.addAttribute("categorias", categoriaRepo.findAll());
        model.addAttribute("marcas", marcaRepo.findAll());
        model.addAttribute("estados", estadoRepo.findAll());
        model.addAttribute("currentPage", "productos");
        return "admin/producto-editar";
    }

    // --------------------- FORMULARIOS ---------------------

    @GetMapping("/formularios")
    public String listarFormularios(@RequestParam(required = false) List<String> tipo, Model model) {
        List<Formulario> formularios = formularioService.listarTodos();
        List<TipoForm> tiposFormulario = tipoFormRepository.findAll();

        if (tipo != null && !tipo.isEmpty()) {
            formularios = formularios.stream()
                .filter(f -> tipo.contains(f.getTipoFormulario().getNombreTipo()))
                .toList();
        }

        model.addAttribute("formularios", formularios);
        model.addAttribute("tiposFormulario", tiposFormulario);
        model.addAttribute("dateFormatter", DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
        model.addAttribute("currentPage", "formularios");
        return "admin/formularios";
    }

    @GetMapping("/formularios/atender/{id}")
    public String mostrarAtenderFormulario(@PathVariable Long id, Model model) {
        Formulario formulario = formularioService.buscarPorId(id);
        model.addAttribute("formulario", formulario);
        model.addAttribute("currentPage", "formularios");
        return "admin/formulario-atender";
    }

    @PostMapping("/formularios/atender/{id}")
    public String atenderFormulario(
            @PathVariable Long id,
            @RequestParam(value = "textEstado", required = false) String textEstado,
            Principal principal) {

        Formulario form = formularioService.buscarPorId(id);
        Usuario usuarioLogueado = usuarioService.findByUsername(principal.getName());
        EstadoForm estadoAtendido = estadoFormService.buscarPorNombre("ATENDIDO");

        form.setUsuarioAtencion(usuarioLogueado);
        form.setEstadoFormulario(estadoAtendido);
        form.setTextEstado(textEstado);
        formularioService.guardar(form);

        // No hace falta currentPage porque es redirect
        return "redirect:/admin/formularios";
    }

    // --------------------- USUARIOS ---------------------

    @GetMapping("/usuarios")
    public String usuarios(Model model) {
        List<Usuario> listaUsuarios = usuarioService.listarTodos();
        model.addAttribute("usuarios", listaUsuarios);
        model.addAttribute("currentPage", "usuarios");
        return "admin/usuario";
    }

    @GetMapping("/usuarios/{id}")
    public String verUsuario(@PathVariable Long id, Model model) {
        Usuario usuario = usuarioService.buscarPorId(id);
        model.addAttribute("usuario", usuario);
        model.addAttribute("currentPage", "usuarios");
        return "admin/usuario-detalle";
    }

   // ...tu método ya funcionará:
    @GetMapping("/usuarios/editar/{id}")
    public String editarUsuario(@PathVariable Long id, Model model) {
        Usuario usuario = usuarioService.buscarPorId(id);
        List<RolUsuario> roles = rolUsuarioService.listarTodos();
        model.addAttribute("usuario", usuario);
        model.addAttribute("roles", roles);
        model.addAttribute("currentPage", "usuarios");
        return "admin/usuario-editar";
    }

    @PostMapping("/usuarios/editar/{id}")
    public String actualizarUsuario(
            @PathVariable Long id,
            @ModelAttribute("usuario") Usuario usuario,
            @RequestParam("pkRolUsuario") Long pkRolUsuario,
            Model model) {

        RolUsuario rol = rolUsuarioService.buscarPorId(pkRolUsuario);
        usuario.setRolUsuario(rol);
        usuarioService.actualizar(usuario); // Asegúrate de tener este método en tu servicio

        return "redirect:/admin/usuarios";
    }


    @GetMapping("/usuarios/nuevo")
    public String nuevoUsuario(Model model) {
        model.addAttribute("usuario", new Usuario());
        model.addAttribute("currentPage", "usuarios");
        return "admin/usuario-nuevo";
    }

    @PostMapping("/usuarios/eliminar/{id}")
    public String eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarPorId(id);
        return "redirect:/admin/usuarios";
    }

    @GetMapping("/usuarios/movimientos/{id}")
    public String movimientosUsuario(@PathVariable Long id, Model model) {
        Usuario usuario = usuarioService.buscarPorId(id);
        // Por ejemplo: lista de pedidos o transacciones de ese usuario
        List<Pedido> movimientos = pedidoService.listarPorUsuario(id);
        model.addAttribute("usuario", usuario);
        model.addAttribute("movimientos", movimientos);
        model.addAttribute("currentPage", "usuarios");
        return "admin/usuario-movimientos"; // crea esta vista
    }

    // --------------------- PEDIDOS ---------------------
    @GetMapping("/pedidos")
    public String pedidos(Model model) {
        List<Pedido> pedidos = pedidoService.listarTodos(); // Todos
        long pendientes = pedidos.stream().filter(p -> "pendiente".equalsIgnoreCase(p.getEstadoPago())).count();
        long atendidos  = pedidos.stream().filter(p -> "atendido".equalsIgnoreCase(p.getEstadoPago())).count();
        long rechazados = pedidos.stream().filter(p -> "rechazado".equalsIgnoreCase(p.getEstadoPago())).count();

        model.addAttribute("pedidos", pedidos);
        model.addAttribute("pendientesCount", pendientes);
        model.addAttribute("atendidosCount", atendidos);
        model.addAttribute("rechazadosCount", rechazados);
        model.addAttribute("currentPage", "pedidos");
        return "admin/pedidos";
    }

    @GetMapping("/pedidos/{id}")
    public String detallePedido(@PathVariable("id") Long id, Model model) {
        Pedido pedido = pedidoService.obtenerPorId(id); // tu método de servicio
        model.addAttribute("pedido", pedido);
        return "admin/pedidos-detalle";
    }
    @PostMapping("/pedidos/rechazar/{id}")
    public String rechazarPedido(@PathVariable("id") Long id) {
        pedidoService.rechazarPedido(id); // Implementa este método en tu servicio
        return "redirect:/admin/pedidos"; // O a donde debas redirigir tras rechazar
    }

    @PostMapping("/pedidos/atender/{id}")
    public String atenderPedido(@PathVariable("id") Long id) {
        pedidoService.atenderPedido(id);
        return "redirect:/admin/pedidos";
    }
}