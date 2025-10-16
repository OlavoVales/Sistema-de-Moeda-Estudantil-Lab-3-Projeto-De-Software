package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Aluno.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> buscarTodosAlunos() {
        return alunoRepository.findAll();
    }
}