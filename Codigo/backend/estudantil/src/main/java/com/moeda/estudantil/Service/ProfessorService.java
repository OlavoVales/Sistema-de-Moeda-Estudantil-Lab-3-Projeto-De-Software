package com.moeda.estudantil.Service;

import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Aluno.AlunoRepository;
import com.moeda.estudantil.Moedas.DistribuirMoedasDTO;
import com.moeda.estudantil.Professor.Professor;
import com.moeda.estudantil.Professor.ProfessorRepository;
import com.moeda.estudantil.Transacao.Transacao;
import com.moeda.estudantil.Transacao.TransacaoRepository;
import com.moeda.estudantil.Transacao.TipoTransacao;
import com.moeda.estudantil.Usuario.Usuario;
import com.moeda.estudantil.Usuario.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Transactional
    public void distribuirMoedas(Long professorId, DistribuirMoedasDTO dto) {

        Professor professor = professorRepository.findById(professorId)
                .orElseThrow(() -> new EntityNotFoundException("Professor não encontrado com ID: " + professorId));

        Usuario usuarioAluno = usuarioRepository.findByEmail(dto.alunoEmail())
                .orElseThrow(() -> new EntityNotFoundException("Nenhum usuário encontrado com o email: " + dto.alunoEmail()));

        Aluno aluno = alunoRepository.findByUsuarioId(usuarioAluno.getId())
                 .orElseThrow(() -> new EntityNotFoundException("Perfil de Aluno não encontrado para o usuário: " + dto.alunoEmail()));


        aluno.setSaldo(aluno.getSaldo() + dto.quantidade());
        alunoRepository.save(aluno);

        Transacao transacao = new Transacao();
        transacao.setProfessor(professor);
        transacao.setAluno(aluno);
        transacao.setQuantidade(dto.quantidade());
        transacao.setMotivo(dto.motivo());
        transacao.setDataHora(LocalDateTime.now());
        transacao.setTipo(TipoTransacao.DISTRIBUICAO);
        transacaoRepository.save(transacao);

        System.out.println("Moedas distribuídas e transação registrada com sucesso: " + dto.quantidade() +
                           " para " + aluno.getUsuario().getNome() +
                           " por " + professor.getUsuario().getNome() +
                           " Motivo: " + dto.motivo());
    }
}