package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Aluno.AlunoRepository;
import com.moeda.estudantil.Usuario.Usuario;
import com.moeda.estudantil.Usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Aluno> buscarTodosAlunos() {
        return alunoRepository.findAll();
    }

    @GetMapping("/by-email/{email}")
    public ResponseEntity<?> buscarAlunoPorEmailUsuario(@PathVariable String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElse(null);

        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado com o email: " + email);
        }

        Aluno aluno = alunoRepository.findByUsuarioId(usuario.getId())
             .orElse(null);

        if (aluno == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Perfil de aluno não encontrado para o email: " + email);
        }

        return ResponseEntity.ok(aluno);
    }
}