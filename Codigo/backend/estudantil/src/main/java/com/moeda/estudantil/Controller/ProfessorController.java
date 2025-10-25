package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Professor.Professor;
import com.moeda.estudantil.Professor.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Professor> buscarTodosProfessores() {
        return professorRepository.findAll();
    }
}