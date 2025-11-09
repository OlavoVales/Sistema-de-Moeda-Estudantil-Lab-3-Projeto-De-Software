package com.moeda.estudantil.Vantagem;

import com.moeda.estudantil.Vantagem.Vantagem;
import java.time.LocalDateTime;

public record VantagemPublicaDTO(
    Long id,
    String nome,
    String descricao,
    Double custoMoedas,
    Integer quantidadeDisponivel,
    String nomeEmpresa,
    String imagemUrl
) {
    public VantagemPublicaDTO(Vantagem vantagem) {
        this(
            vantagem.getId(),
            vantagem.getNome(),
            vantagem.getDescricao(),
            vantagem.getCustoMoedas(),
            vantagem.getQuantidadeDisponivel(),
            vantagem.getEmpresaParceira().getNomeFantasia(),
            vantagem.getImagemUrl()
        );
    }
}