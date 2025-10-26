package com.moeda.estudantil.Transacao;

import com.moeda.estudantil.Transacao.TipoTransacao;
import com.moeda.estudantil.Transacao.Transacao;
import java.time.LocalDateTime;

public record TransacaoAlunoDTO(
    Long id,
    TipoTransacao tipo,
    Integer quantidade,
    String motivo,
    String origemDestino,
    LocalDateTime dataHora
) {
    public TransacaoAlunoDTO(Transacao transacao) {
        this(
            transacao.getId(),
            transacao.getTipo(),
            transacao.getQuantidade(),
            TipoTransacao.DISTRIBUICAO.equals(transacao.getTipo()) ? transacao.getMotivo() : "Resgate de Vantagem", // Exemplo
            TipoTransacao.DISTRIBUICAO.equals(transacao.getTipo()) ? transacao.getProfessor().getUsuario().getNome() : "Nome da Vantagem/Empresa", // Placeholder
            transacao.getDataHora()
        );
    }
}