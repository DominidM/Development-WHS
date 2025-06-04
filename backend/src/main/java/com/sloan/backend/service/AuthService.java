package com.sloan.backend.service;

import com.sloan.backend.model.Usuario;

public interface AuthService {
        // Registro de usuarios (general)
    Usuario register(Usuario usuario);
        // Login de cliente (rol_usuario = 1)
    Usuario login(String correo, String password);
}