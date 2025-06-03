package com.sloan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sloan.backend.model.Queja;

public interface QuejaRepository extends JpaRepository<Queja, Long> {
}

