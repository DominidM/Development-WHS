package com.sloan.backend.service;

import com.sloan.backend.model.Usuario;

public interface AuthService {
    Usuario login(String correo, String password);
    Usuario register(Usuario usuario);
}