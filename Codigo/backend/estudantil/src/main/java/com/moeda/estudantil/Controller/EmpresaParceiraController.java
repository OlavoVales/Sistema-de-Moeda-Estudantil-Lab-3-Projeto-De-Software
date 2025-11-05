package com.moeda.estudantil.Controller;

import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import com.moeda.estudantil.EmpresaParceira.EmpresaRepository;
import com.moeda.estudantil.Service.EmpresaService;
import com.moeda.estudantil.Vantagem.Vantagem;
import com.moeda.estudantil.Vantagem.VantagemRegisterDTO;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaParceiraController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public List<EmpresaParceira> buscarTodasEmpresas() {
        return empresaRepository.findAll();
    }

    @GetMapping("/hello")
    public String helloEmpresa() {
        return "Olá, Empresa!";
    }

    @PostMapping("/vantagens")
    public ResponseEntity<Vantagem> cadastrarVantagem(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody VantagemRegisterDTO dto) {
        
        String email = userDetails.getUsername();
        Vantagem vantagemSalva = empresaService.cadastrarVantagem(email, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(vantagemSalva);
    }

    @GetMapping("/vantagens")
    public ResponseEntity<List<Vantagem>> getMinhasVantagens(
            @AuthenticationPrincipal UserDetails userDetails) {
        
        String email = userDetails.getUsername();
        List<Vantagem> vantagens = empresaService.getMinhasVantagens(email);
        return ResponseEntity.ok(vantagens);
    }
}