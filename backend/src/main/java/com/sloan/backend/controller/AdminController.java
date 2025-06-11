package com.sloan.backend.controller;
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

import com.sloan.backend.dto.FormularioRequest;
import com.sloan.backend.dto.ProductoDTO;
import com.sloan.backend.model.Formulario;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.CategoriaProductoRepository;
import com.sloan.backend.repository.EstadoFormRepository;
import com.sloan.backend.repository.EstadoProductoRepository;
import com.sloan.backend.repository.MarcaProductoRepository;
import com.sloan.backend.repository.TipoFormRepository;
import com.sloan.backend.service.AuthService;
import com.sloan.backend.service.FormularioService;
import com.sloan.backend.service.ProductoService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    // Servicios para productos, autenticación y formularios
    @Autowired 
    private ProductoService productoService;
    @Autowired
    private AuthService usuarioService;
    @Autowired
    private FormularioService formularioService;

    // Repositorios para categorías, marcas y estados de productos
    @Autowired
    private CategoriaProductoRepository categoriaRepo;
    @Autowired
    private MarcaProductoRepository marcaRepo;
    @Autowired
    private EstadoProductoRepository estadoRepo;

    // Repositorios para tipos y estados de formularios
    @Autowired
    private TipoFormRepository tipoFormRepository;
    @Autowired
    private EstadoFormRepository estadoFormRepository;

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
        return "admin/dashboard";
    }

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

    // Mostrar formulario de creación de producto
    @GetMapping("/productos/nuevo")
    public String nuevoProducto(Model model) {
        model.addAttribute("producto", new ProductoDTO());
        model.addAttribute("categorias", categoriaRepo.findAll());
        model.addAttribute("marcas", marcaRepo.findAll());
        model.addAttribute("estados", estadoRepo.findAll());
        return "admin/producto-nuevo";
    }

    // Guardar producto
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

    @GetMapping("/productos/{slug}")
    public String detalleProductoPorSlug(@PathVariable String slug, Model model) {
        Optional<ProductoDTO> productoOpt = productoService.findBySlugAsDTO(slug);
        if (productoOpt.isEmpty()) {
            return "redirect:/admin/productos?notfound";
        }
        model.addAttribute("producto", productoOpt.get());
        return "admin/producto-detalle"; // Este nombre debe coincidir con tu archivo
    }


    @GetMapping("/productos/editar/{slug}")
    public String editarProductoPorSlug(@PathVariable String slug, Model model) {
    Optional<ProductoDTO> productoOpt = productoService.findBySlugAsDTO(slug);
    if (productoOpt.isEmpty()) {
        // Si no existe, puedes redirigir al listado con un error
        return "redirect:/admin/productos?notfound";
    }
    ProductoDTO producto = productoOpt.get();
    model.addAttribute("producto", producto);
    model.addAttribute("categorias", categoriaRepo.findAll());
    model.addAttribute("marcas", marcaRepo.findAll());
    model.addAttribute("estados", estadoRepo.findAll());
    return "admin/producto-editar"; // nombre de la plantilla para editar producto
    }


    
    @GetMapping("/formularios")
    public String formularios(Model model) {
        List<Usuario> listaUsuarios = usuarioService.listarTodos();
        List<Formulario> listaFormularios = formularioService.listarTodos();
        model.addAttribute("usuarios", listaUsuarios);
        model.addAttribute("formularios", listaFormularios);
        return "admin/formularios";
    }

    @GetMapping("/formularios/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("formulario", new FormularioRequest());
        model.addAttribute("tipos", tipoFormRepository.findAll());
        model.addAttribute("estados", estadoFormRepository.findAll());
        return "admin/formulario-nuevo";
    }

    // Guardar formulario (opcional, puedes implementar este método si lo necesitas)
    /*
    @PostMapping("/formularios/guardar")
    public String guardarFormulario(@ModelAttribute("formulario") FormularioRequest formularioRequest, Model model) {
        // Implementa el guardado según tu lógica de servicio y redirecciona
        // formularioService.save(formularioRequest);
        // return "redirect:/admin/formularios";
    }
    */

    @GetMapping("/pedidos")
    public String pedidos() {
        return "admin/pedidos";
    }
}