package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Aluno.AlunoRegisterDTO;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceiraRegisterDTO;
import com.moeda.estudantil.Service.CadastroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cadastro")
public class CadastroController {

    @Autowired
    private CadastroService cadastroService;

    @PostMapping("/aluno")
    public ResponseEntity<String> cadastrarAluno(@Valid @RequestBody AlunoRegisterDTO alunoDTO) {
        cadastroService.cadastrarAluno(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Aluno cadastrado com sucesso!");
    }

    @PostMapping("/empresa")
    public ResponseEntity<String> cadastrarEmpresa(@Valid @RequestBody EmpresaParceiraRegisterDTO empresaDTO) {
        cadastroService.cadastrarEmpresa(empresaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Empresa cadastrada com sucesso!");
    }
}