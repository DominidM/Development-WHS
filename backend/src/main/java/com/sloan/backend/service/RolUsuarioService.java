package com.sloan.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sloan.backend.model.RolUsuario;
import com.sloan.backend.repository.RolUsuarioRepository;

@Service
public class RolUsuarioService {

    @Autowired
    private RolUsuarioRepository rolUsuarioRepository;

    public List<RolUsuario> listarTodos() {
        return rolUsuarioRepository.findAll();
    }

     public RolUsuario buscarPorId(Long id) {
        return rolUsuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Rol no encontrado con id: " + id));
    }
}