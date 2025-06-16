package com.sloan.backend.controller;

import java.security.Principal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.sloan.backend.model.TipoForm;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.CategoriaProductoRepository;
import com.sloan.backend.repository.EstadoProductoRepository;
import com.sloan.backend.repository.MarcaProductoRepository;
import com.sloan.backend.repository.TipoFormRepository;
import com.sloan.backend.service.AuthService;
import com.sloan.backend.service.EstadoFormService;
import com.sloan.backend.service.FormularioService;
import com.sloan.backend.service.ProductoService;

/**
 * Controlador para gestionar las vistas y operaciones del área de administración.
 * Incluye operaciones CRUD para productos, usuarios y formularios.
 */
@Controller
@RequestMapping("/admin")
public class AdminController {

    // Servicios para lógica de negocio
    @Autowired 
    private ProductoService productoService;
    @Autowired
    private AuthService usuarioService;
    @Autowired
    private FormularioService formularioService;

    // Repositorios para entidades relacionadas con productos
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

    /**
     * Redirección raíz del área admin al dashboard.
     */
    @GetMapping({"", "/"})
    public String adminRoot() {
        return "redirect:/admin/dashboard";
    }

    /**
     * Muestra la página de login de administración.
     */
    @GetMapping("/login")
    public String login() {
        return "admin/login";
    }

    /**
     * Muestra el dashboard con conteo de formularios.
     */
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("formulariosCount", formularioService.listarTodos().size());
        return "admin/dashboard";
    }

    // --------------------- PRODUCTOS ---------------------

    /**
     * Muestra la lista de productos.
     */
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
        return "admin/productos";
    }

    /**
     * Muestra el formulario para crear un nuevo producto.
     */
    @GetMapping("/productos/nuevo")
    public String nuevoProducto(Model model) {
        model.addAttribute("producto", new ProductoDTO());
        model.addAttribute("categorias", categoriaRepo.findAll());
        model.addAttribute("marcas", marcaRepo.findAll());
        model.addAttribute("estados", estadoRepo.findAll());
        return "admin/producto-nuevo";
    }

    /**
     * Guarda un nuevo producto.
     */
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
            return "admin/producto-nuevo";
        }
    }

    /**
     * Muestra detalle de un producto por su slug.
     */
    @GetMapping("/productos/{slug}")
    public String detalleProductoPorSlug(@PathVariable String slug, Model model) {
        Optional<ProductoDTO> productoOpt = productoService.findBySlugAsDTO(slug);
        if (productoOpt.isEmpty()) {
            return "redirect:/admin/productos?notfound";
        }
        model.addAttribute("producto", productoOpt.get());
        return "admin/producto-detalle"; // Nombre de la plantilla de detalle
    }

    /**
     * Muestra el formulario de edición de producto por slug.
     */
    @GetMapping("/productos/editar/{slug}")
    public String editarProductoPorSlug(@PathVariable String slug, Model model) {
        Optional<ProductoDTO> productoOpt = productoService.findBySlugAsDTO(slug);
        if (productoOpt.isEmpty()) {
            // Si no existe, redirige al listado con error
            return "redirect:/admin/productos?notfound";
        }
        ProductoDTO producto = productoOpt.get();
        model.addAttribute("producto", producto);
        model.addAttribute("categorias", categoriaRepo.findAll());
        model.addAttribute("marcas", marcaRepo.findAll());
        model.addAttribute("estados", estadoRepo.findAll());
        return "admin/producto-editar"; // Nombre de la plantilla para editar producto
    }

    // --------------------- FORMULARIOS ---------------------

    /**
     * Lista los formularios existentes y permite filtrar por tipo.
     * @param tipo Lista opcional de nombres de tipos de formulario para filtrar
     */
    @GetMapping("/formularios")
    public String listarFormularios(@RequestParam(required = false) List<String> tipo, Model model) {
        List<Formulario> formularios = formularioService.listarTodos();
        List<TipoForm> tiposFormulario = tipoFormRepository.findAll();

        // Filtra si hay tipos seleccionados
        if (tipo != null && !tipo.isEmpty()) {
            formularios = formularios.stream()
                .filter(f -> tipo.contains(f.getTipoFormulario().getNombreTipo()))
                .toList();
        }

        model.addAttribute("formularios", formularios);
        model.addAttribute("tiposFormulario", tiposFormulario);
        model.addAttribute("dateFormatter", DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
        return "admin/formularios";
    }

    /**
     * Muestra el formulario para atender (responder) un formulario específico.
     * @param id ID del formulario a atender
     */
    @GetMapping("/formularios/atender/{id}")
    public String mostrarAtenderFormulario(@PathVariable Long id, Model model) {
        Formulario formulario = formularioService.buscarPorId(id);
        model.addAttribute("formulario", formulario);
        return "admin/formulario-atender";
    }
        
    /**
     * Procesa la atención de un formulario, actualiza estado y usuario que atendió.
     * @param id ID del formulario atendido
     * @param textEstado Texto de respuesta del formulario
     * @param principal Usuario autenticado que atiende el formulario
     */
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
        form.setTextEstado(textEstado); // Guarda la respuesta

        formularioService.guardar(form);

        return "redirect:/admin/formularios";
    }

    // --------------------- USUARIOS ---------------------

    /**
     * Muestra la lista de usuarios.
     */
    @GetMapping("/usuarios")
    public String usuarios(Model model) {
        List<Usuario> listaUsuarios = usuarioService.listarTodos();
        model.addAttribute("usuarios", listaUsuarios);
        return "admin/usuario"; // el archivo debe llamarse usuario.html
    }

    /**
     * Muestra el detalle de un usuario por ID.
     */
    @GetMapping("/usuarios/{id}")
    public String verUsuario(@PathVariable Long id, Model model) {
        Usuario usuario = usuarioService.buscarPorId(id);
        model.addAttribute("usuario", usuario);
        return "admin/usuario-detalle";
    }

    /**
     * Muestra el formulario para editar un usuario por ID.
     */
    @GetMapping("/usuarios/editar/{id}")
    public String editarUsuario(@PathVariable Long id, Model model) {
        Usuario usuario = usuarioService.buscarPorId(id);
        model.addAttribute("usuario", usuario);
        return "admin/usuario-editar";
    }

    // /**
    //  * (Ejemplo) Muestra los movimientos de un usuario.
    //  */
    // @GetMapping("/usuarios/{id}/movimientos")
    // public String movimientosUsuario(@PathVariable Long id, Model model) {
    //     Usuario usuario = usuarioService.buscarPorId(id);
    //     // List<Pedido> movimientos = pedidoService.buscarPorUsuarioId(id);
    //     // model.addAttribute("usuario", usuario);
    //     // model.addAttribute("movimientos", movimientos);
    //     // return "admin/usuario-movimientos";
    // }

    /**
     * Muestra el formulario para crear un nuevo usuario.
     */
    @GetMapping("/usuarios/nuevo")
    public String nuevoUsuario(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "admin/usuario-nuevo";
    }

    /**
     * Elimina un usuario por ID.
     */
    @PostMapping("/usuarios/eliminar/{id}")
    public String eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarPorId(id);
        return "redirect:/admin/usuarios";
    }

    // --------------------- PEDIDOS ---------------------

    /**
     * Vista de pedidos (por implementar).
     */
    @GetMapping("/pedidos")
    public String pedidos() {
        return "admin/pedidos";
    }
}