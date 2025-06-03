package com.sloan.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sloan.backend.model.Queja;
import com.sloan.backend.repository.QuejaRepository;

@Service
public class QuejaService {

    private final QuejaRepository quejaRepository;

    @Autowired
    public QuejaService(QuejaRepository quejaRepository) {
        this.quejaRepository = quejaRepository;
    }

    @Transactional
    public Queja guardarQueja(Queja queja) {
        try {
            return quejaRepository.save(queja);
        } catch (Exception e) {
            System.err.println("Error al guardar la queja en la base de datos: " + e.getMessage());
            throw new RuntimeException("Error al guardar la queja", e);
        }
    }

    @Transactional(readOnly = true)
    public List<Queja> obtenerTodasQuejas() {
        return quejaRepository.findAll();
    }
}
