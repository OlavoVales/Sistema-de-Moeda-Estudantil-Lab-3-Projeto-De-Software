package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Vantagem.VantagemPublicaDTO;
import com.moeda.estudantil.Vantagem.Vantagem;
import com.moeda.estudantil.Vantagem.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/vantagens")
public class VantagemController {

    @Autowired
    private VantagemRepository vantagemRepository;

    @GetMapping
    public ResponseEntity<List<VantagemPublicaDTO>> listarTodasVantagens() {
        List<Vantagem> vantagens = vantagemRepository.findAllWithEmpresa(); 
        
        List<VantagemPublicaDTO> dtos = vantagens.stream()
                .map(VantagemPublicaDTO::new)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }

    // Futuramente, o endpoint de resgate virá aqui:
    // @PostMapping("/{vantagemId}/resgatar")
    // public ResponseEntity<?> resgatarVantagem(@PathVariable Long vantagemId, @AuthenticationPrincipal UserDetails userDetails) {
    //    // Lógica para debitar saldo do aluno e registrar transação
    // }
}