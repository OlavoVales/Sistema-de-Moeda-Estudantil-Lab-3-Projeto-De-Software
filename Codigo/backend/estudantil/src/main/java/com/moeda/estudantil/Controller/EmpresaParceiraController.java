package com.moeda.estudantil.Controller;

import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import com.moeda.estudantil.EmpresaParceira.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaParceiraController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public List<EmpresaParceira> buscarTodasEmpresas() {
        return empresaRepository.findAll();
    }
}