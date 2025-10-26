package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Moedas.DistribuirMoedasDTO;
import com.moeda.estudantil.Transacao.TransacaoDetalhesDTO;
import com.moeda.estudantil.Professor.Professor;
import com.moeda.estudantil.Professor.ProfessorRepository;
import com.moeda.estudantil.Service.ProfessorService;
import com.moeda.estudantil.Transacao.Transacao;
import com.moeda.estudantil.Transacao.TransacaoRepository;
import com.moeda.estudantil.Usuario.Usuario;
import com.moeda.estudantil.Usuario.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @GetMapping
    public List<Professor> buscarTodosProfessores() {
        return professorRepository.findAll();
    }

    @PostMapping("/{professorId}/distribuir-moedas")
    public ResponseEntity<String> distribuirMoedas(
            @PathVariable Long professorId,
            @Valid @RequestBody DistribuirMoedasDTO dto) {
        try {
            professorService.distribuirMoedas(professorId, dto);
            return ResponseEntity.ok("Moedas distribuídas com sucesso!");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        } catch (Exception e) {
            System.err.println("Erro ao distribuir moedas: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro interno ao processar a distribuição.");
        }
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<?> buscarProfessorPorEmailUsuario(@PathVariable String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado com o email: " + email);
        }

        Professor professor = professorRepository.findByUsuarioId(usuario.getId())
             .orElse(null);

        if (professor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Perfil de professor não encontrado para o email: " + email);
        }

        return ResponseEntity.ok(professor);
    }

    @GetMapping("/{professorId}/transacoes")
    public ResponseEntity<List<TransacaoDetalhesDTO>> buscarHistoricoProfessor(@PathVariable Long professorId) {
        if (!professorRepository.existsById(professorId)) {
            return ResponseEntity.notFound().build();
        }

        List<Transacao> transacoes = transacaoRepository.findByProfessorIdOrderByDataHoraDesc(professorId);

        List<TransacaoDetalhesDTO> dtos = transacoes.stream()
                                                    .map(TransacaoDetalhesDTO::new)
                                                    .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
}