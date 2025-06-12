package com.sloan.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sloan.backend.model.EstadoForm;
import com.sloan.backend.repository.EstadoFormRepository;

@Service
public class EstadoFormServiceImpl implements EstadoFormService {

    @Autowired
    private EstadoFormRepository estadoFormRepository;

    @Override
    public EstadoForm buscarPorNombre(String nombreEstado) {
        return estadoFormRepository.findByNombreEstado(nombreEstado)
                .orElse(null);
    }
}