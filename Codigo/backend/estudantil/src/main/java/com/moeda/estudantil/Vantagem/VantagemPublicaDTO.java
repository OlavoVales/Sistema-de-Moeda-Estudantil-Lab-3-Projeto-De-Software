package com.moeda.estudantil.Vantagem;

import com.moeda.estudantil.Vantagem.Vantagem;

public record VantagemPublicaDTO(
    Long id,
    String nome,
    String descricao,
    Double custoMoedas,
    Integer quantidadeDisponivel,
    String nomeEmpresa
) {
    public VantagemPublicaDTO(Vantagem vantagem) {
        this(
            vantagem.getId(),
            vantagem.getNome(),
            vantagem.getDescricao(),
            vantagem.getCustoMoedas(),
            vantagem.getQuantidadeDisponivel(),
            vantagem.getEmpresaParceira().getNomeFantasia()
        );
    }
}