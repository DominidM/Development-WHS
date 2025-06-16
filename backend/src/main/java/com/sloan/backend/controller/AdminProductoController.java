package com.sloan.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sloan.backend.service.ProductoService;

/**
 * Controlador encargado de la gestión de productos desde el área de administración.
 * Permite eliminar productos mediante una petición POST.
 */
@Controller
public class AdminProductoController {

    @Autowired
    private ProductoService productoService;

    /**
     * Elimina un producto por su ID.
     * 
     * @param id ID del producto a eliminar.
     * @param redirectAttributes Permite enviar mensajes flash a la vista tras la redirección.
     * @return Redirección al listado de productos.
     */
    @PostMapping("/admin/productos/eliminar/{id}")
    public String eliminarProducto(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            // Llama al servicio para eliminar el producto por su ID
            productoService.eliminarPorId(id);
            // Mensaje de éxito para mostrar en la vista tras la redirección
            redirectAttributes.addFlashAttribute("mensajeExito", "Producto eliminado correctamente.");
        } catch (Exception e) {
            // Mensaje de error en caso de que la eliminación falle
            redirectAttributes.addFlashAttribute("mensajeError", "Error al eliminar el producto.");
        }
        // Redirige al listado de productos
        return "redirect:/admin/productos";
    }
}