package com.moeda.estudantil.Service;

import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Aluno.AlunoRepository;
import com.moeda.estudantil.Cupom.Cupom;
import com.moeda.estudantil.Cupom.CupomRepository;
import com.moeda.estudantil.Cupom.ResgateResponseDTO;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import com.moeda.estudantil.Transacao.TipoTransacao;
import com.moeda.estudantil.Transacao.Transacao;
import com.moeda.estudantil.Transacao.TransacaoRepository;
import com.moeda.estudantil.Usuario.Usuario;
import com.moeda.estudantil.Usuario.UsuarioRepository;
import com.moeda.estudantil.Vantagem.Vantagem;
import com.moeda.estudantil.Vantagem.VantagemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VantagemService {

    @Autowired private AlunoRepository alunoRepository;
    @Autowired private VantagemRepository vantagemRepository;
    @Autowired private TransacaoRepository transacaoRepository;
    @Autowired private CupomRepository cupomRepository;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private EmailService emailService;

    @Transactional
    public ResgateResponseDTO resgatarVantagem(Long vantagemId, String emailAluno) {
        
        Usuario usuarioAluno = usuarioRepository.findByEmail(emailAluno)
                .orElseThrow(() -> new EntityNotFoundException("Usuário do aluno não encontrado."));
        
        Aluno aluno = alunoRepository.findByUsuarioId(usuarioAluno.getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil do aluno não encontrado."));
        
        Vantagem vantagem = vantagemRepository.findById(vantagemId)
                .orElseThrow(() -> new EntityNotFoundException("Vantagem não encontrada."));

        if (aluno.getSaldo() < vantagem.getCustoMoedas()) {
            throw new IllegalStateException("Saldo insuficiente para resgatar esta vantagem.");
        }
        
        if (vantagem.getQuantidadeDisponivel() != null && vantagem.getQuantidadeDisponivel() <= 0) {
            throw new IllegalStateException("Vantagem esgotada.");
        }

        aluno.setSaldo(aluno.getSaldo() - vantagem.getCustoMoedas());
        alunoRepository.save(aluno);

        if (vantagem.getQuantidadeDisponivel() != null) {
            vantagem.setQuantidadeDisponivel(vantagem.getQuantidadeDisponivel() - 1);
            vantagemRepository.save(vantagem);
        }

        Transacao transacao = new Transacao();
        transacao.setAluno(aluno);
        transacao.setProfessor(null);
        transacao.setTipo(TipoTransacao.RESGATE_VANTAGEM);
        transacao.setQuantidade(-vantagem.getCustoMoedas().intValue());
        transacao.setMotivo(vantagem.getNome());
        transacao.setDataHora(LocalDateTime.now());
        Transacao transacaoSalva = transacaoRepository.save(transacao);

        String codigo = gerarCodigoUnico();
        Cupom cupom = new Cupom();
        cupom.setAluno(aluno);
        cupom.setVantagem(vantagem);
        cupom.setTransacao(transacaoSalva);
        cupom.setCodigoResgate(codigo);
        cupom.setDataResgate(LocalDateTime.now());
        cupomRepository.save(cupom);

        EmpresaParceira empresa = vantagem.getEmpresaParceira();
        emailService.enviarEmailResgateAluno(usuarioAluno, cupom);
        emailService.notificarEmpresaSobreResgate(empresa, cupom);

        return new ResgateResponseDTO(
            vantagem.getNome(),
            empresa.getNomeFantasia(),
            cupom.getCodigoResgate(),
            vantagem.getCustoMoedas()
        );
    }

    private String gerarCodigoUnico() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}