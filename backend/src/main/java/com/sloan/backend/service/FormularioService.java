package com.sloan.backend.service;

import java.util.List;

import com.sloan.backend.model.Formulario;

public interface FormularioService {
    List<Formulario> listarTodos();
    Formulario guardar(Formulario formulario);
    Formulario buscarPorId(Long id);
    void eliminar(Long id);
}