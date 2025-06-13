package com.sloan.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.dto.FormularioRequest;
import com.sloan.backend.model.EstadoForm;
import com.sloan.backend.model.Formulario;
import com.sloan.backend.model.TipoForm;
import com.sloan.backend.repository.EstadoFormRepository;
import com.sloan.backend.repository.TipoFormRepository;
import com.sloan.backend.service.FormularioService;

@RestController
@RequestMapping("/api/public/formularios")
public class FormularioController {

    
    private final FormularioService formularioService;
    private final TipoFormRepository tipoFormRepository;
    private final EstadoFormRepository estadoFormRepository;

    public FormularioController(
        FormularioService formularioService,
        TipoFormRepository tipoFormRepository,
        EstadoFormRepository estadoFormRepository
    ) {
        this.formularioService = formularioService;
        this.tipoFormRepository = tipoFormRepository;
        this.estadoFormRepository = estadoFormRepository;
    }

    // Listar todos los formularios públicos (si lo deseas, puedes retirar este método)
    @GetMapping
    public List<Formulario> listar() {
        return formularioService.listarTodos();
    }

    
    // Permite que cualquier usuario (público) cree un formulario de reclamo
    @PostMapping
    public ResponseEntity<Formulario> crear(@RequestBody FormularioRequest request) {
        Formulario formulario = new Formulario();
        formulario.setNombreFormulario(request.getNombreFormulario());
        formulario.setDniFormulario(request.getDniFormulario());
        formulario.setCorreoFormulario(request.getCorreoFormulario());
        formulario.setTelefonoFormulario(request.getTelefonoFormulario());
        formulario.setTextEstado(request.getTextEstado());

        // Asignar tipo de formulario (obligatorio)
        TipoForm tipo = tipoFormRepository.findById(request.getPkTipoFormulario())
            .orElseThrow(() -> new IllegalArgumentException("Tipo de formulario no encontrado"));
        formulario.setTipoFormulario(tipo);

        // Asignar estado inicial (por defecto SIN_ATENDER)
        EstadoForm estado = estadoFormRepository.findById(request.getPkEstadoFormulario())
            .orElseThrow(() -> new IllegalArgumentException("Estado de formulario no encontrado"));
        formulario.setEstadoFormulario(estado);

        // No se asigna usuario de atención aquí, solo admin puede hacerlo

        Formulario guardado = formularioService.guardar(formulario);
        return ResponseEntity.ok(guardado);
    }
}