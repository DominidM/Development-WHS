package com.sloan.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sloan.backend.model.Formulario;
import com.sloan.backend.repository.FormularioRepository;

@Service
public class FormularioServiceImpl implements FormularioService {
    private final FormularioRepository formularioRepository;

    @Autowired
    public FormularioServiceImpl(FormularioRepository formularioRepository) {
        this.formularioRepository = formularioRepository;
    }

    @Override
    public List<Formulario> listarTodos() {
        return formularioRepository.findAll();
    }

    @Override
    public Formulario guardar(Formulario formulario) {
        return formularioRepository.save(formulario);
    }

    @Override
    public Formulario buscarPorId(Long id) {
        return formularioRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        formularioRepository.deleteById(id);
    }
}