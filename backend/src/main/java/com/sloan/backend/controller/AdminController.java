package com.sloan.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    // Redirige /admin y /admin/ al dashboard
    @GetMapping({"", "/"})
    public String adminRoot() {
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/login")
    public String login() {
        return "admin/login"; 
    }

    // Dashboard principal
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("formulariosCount", 15); // Ejemplo
        return "admin/dashboard";
    }

    // Vista de productos
    @GetMapping("/productos")
    public String productos() {
        return "admin/productos";
    }

    // Vista de formularios
    @GetMapping("/formularios")
    public String formularios() {
        return "admin/formularios";
    }

    // Vista de pedidos
    @GetMapping("/pedidos")
    public String pedidos() {
        return "admin/pedidos";
    }
}