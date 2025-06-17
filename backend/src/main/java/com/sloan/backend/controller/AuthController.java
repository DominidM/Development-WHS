package com.sloan.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.model.RolUsuario;
import com.sloan.backend.model.Usuario;
import com.sloan.backend.repository.RolUsuarioRepository;
import com.sloan.backend.service.AuthService;

/**
 * Controlador REST para autenticación y registro de usuarios.
 * Expone endpoints para login y registro en la ruta /api/admin/auth.
 */
@RestController
@RequestMapping("/api/admin/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    // Servicios y repositorios necesarios para la autenticación
    private final AuthService authService;
    private final RolUsuarioRepository rolUsuarioRepository;

    /**
     * Constructor con inyección de dependencias.
     * @param authService servicio de autenticación
     * @param rolUsuarioRepository repositorio de roles de usuario
     */
    public AuthController(AuthService authService, RolUsuarioRepository rolUsuarioRepository) {
        this.authService = authService;
        this.rolUsuarioRepository = rolUsuarioRepository;
    }

    /**
     * Endpoint para login de usuario.
     * @param loginRequest objeto con correo y contraseña
     * @return Usuario autenticado (puedes devolver DTO o token en vez del objeto completo por seguridad)
     */
    @PostMapping("/login")
    public Usuario login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest.getCorreo(), loginRequest.getPassword());
    }

    /**
     * Endpoint para registro de usuario.
     * Busca el rol "Cliente" y lo asigna al nuevo usuario.
     * @param request objeto con datos de registro
     * @return Usuario registrado
     */
    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody RegisterRequest request) {
        // Busca el rol "Cliente" (puedes ajustar el nombre según tu base)
        RolUsuario rolCliente = rolUsuarioRepository.findByNombreRol("Cliente")
            .orElseThrow(() -> new RuntimeException("Rol CLIENTE no existe"));

        // Crea el nuevo usuario y asigna los datos y el rol
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setCorreoPersona(request.getCorreo());
        nuevoUsuario.setPassword(request.getPassword());
        nuevoUsuario.setNombrePersona(request.getNombre());
        nuevoUsuario.setRolUsuario(rolCliente);

        // Guarda el usuario a través del servicio de autenticación
        Usuario usuarioGuardado = authService.register(nuevoUsuario);
        return ResponseEntity.ok(usuarioGuardado);
    }

    /**
     * DTO para la petición de login.
     */
    public static class LoginRequest {
        private String correo;
        private String password;
        // Getters y setters
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    /**
     * DTO para la petición de registro.
     */
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


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        boolean enviado = authService.sendPasswordResetEmail(request.getCorreo());
        if (enviado) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
    }

    public static class ForgotPasswordRequest {
        private String correo;
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
    }
}