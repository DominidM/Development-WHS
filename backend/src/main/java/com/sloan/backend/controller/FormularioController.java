package com.sloan.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sloan.backend.model.Formulario;
import com.sloan.backend.model.TipoForm;
import com.sloan.backend.model.EstadoForm;
import com.sloan.backend.dto.FormularioRequest;
import com.sloan.backend.service.FormularioService;
import com.sloan.backend.repository.TipoFormRepository;
import com.sloan.backend.repository.EstadoFormRepository;

@RestController
@RequestMapping("/api/formularios")
@CrossOrigin(origins = "http://localhost:5173")
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

    @GetMapping
    public List<Formulario> listar() {
        return formularioService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<Formulario> crear(@RequestBody FormularioRequest request) {
        Formulario formulario = new Formulario();
        formulario.setNombreFormulario(request.getNombreFormulario()); // <-- ¡Agregado!
        formulario.setDniFormulario(request.getDniFormulario());
        formulario.setCorreoFormulario(request.getCorreoFormulario());
        formulario.setTelefonoFormulario(request.getTelefonoFormulario());
        formulario.setTextEstado(request.getTextEstado());

        // Buscar y asignar las entidades relacionadas
        TipoForm tipo = tipoFormRepository.findById(request.getPkTipoFormulario())
            .orElseThrow(() -> new IllegalArgumentException("Tipo de formulario no encontrado"));
        formulario.setTipoFormulario(tipo);

        EstadoForm estado = estadoFormRepository.findById(request.getPkEstadoFormulario())
            .orElseThrow(() -> new IllegalArgumentException("Estado de formulario no encontrado"));
        formulario.setEstadoFormulario(estado);

        // UsuarioAtencion es opcional y para admin
        // formulario.setUsuarioAtencion(...);

        Formulario guardado = formularioService.guardar(formulario);
        return ResponseEntity.ok(guardado);
    }
}