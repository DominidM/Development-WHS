package com.sloan.backend.service;

import java.util.List;

import com.sloan.backend.model.Usuario;

public interface AuthService {
    Usuario login(String correo, String password);
    Usuario register(Usuario usuario);
    List<Usuario> listarTodos();
    Usuario buscarPorId(Long id);
    void eliminarPorId(Long id);
    Usuario findByUsername(String username);
    boolean sendPasswordResetEmail(String correo);
    boolean resetPasswordWithToken(String token, String newPassword); // <-- método nuevo
}