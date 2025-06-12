package com.sloan.backend.service;

import com.sloan.backend.model.EstadoForm;

public interface EstadoFormService {
    EstadoForm buscarPorNombre(String nombreEstado);
}