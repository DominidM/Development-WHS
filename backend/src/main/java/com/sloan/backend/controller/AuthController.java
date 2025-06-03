package com.sloan.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.sloan.backend.model.Usuario;
import com.sloan.backend.model.RolUsuario;
import com.sloan.backend.service.AuthService;
import com.sloan.backend.repository.RolUsuarioRepository; // Asegúrate de tener este repositorio

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final AuthService authService;
    private final RolUsuarioRepository rolUsuarioRepository;

    public AuthController(AuthService authService, RolUsuarioRepository rolUsuarioRepository) {
        this.authService = authService;
        this.rolUsuarioRepository = rolUsuarioRepository;
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest.getCorreo(), loginRequest.getPassword());
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody RegisterRequest request) {
        // Busca el rol "CLIENTE" por nombre (ajusta si usas otro nombre o ID)
        RolUsuario rolCliente = rolUsuarioRepository.findByNombreRol("Cliente")
            .orElseThrow(() -> new RuntimeException("Rol CLIENTE no existe"));

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setCorreoPersona(request.getCorreo());
        nuevoUsuario.setPassword(request.getPassword());
        nuevoUsuario.setNombrePersona(request.getNombre());
        nuevoUsuario.setRolUsuario(rolCliente); // Relación, o usa setPkRolUsuario(rolCliente.getId()) según tu modelo

        Usuario usuarioGuardado = authService.register(nuevoUsuario);
        return ResponseEntity.ok(usuarioGuardado);
    }

    // DTOs internos
    public static class LoginRequest {
        private String correo;
        private String password;
        // Getters y setters
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String nombre;
        private String correo;
        private String password;
        // Getters y setters
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}