package com.moeda.estudantil.Transacao;

import com.moeda.estudantil.Transacao.TipoTransacao;
import com.moeda.estudantil.Transacao.Transacao;
import java.time.LocalDateTime;

public record TransacaoDetalhesDTO(
    Long id,
    String nomeAluno,
    String motivo,
    Integer quantidade,
    LocalDateTime dataHora,
    TipoTransacao tipo
) {
    public TransacaoDetalhesDTO(Transacao transacao) {
        this(
            transacao.getId(),
            transacao.getAluno().getUsuario().getNome(),
            transacao.getMotivo(),
            transacao.getQuantidade(),
            transacao.getDataHora(),
            transacao.getTipo()
        );
    }
}