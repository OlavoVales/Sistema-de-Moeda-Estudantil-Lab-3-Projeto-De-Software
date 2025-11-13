package com.moeda.estudantil.Cupom;

import com.moeda.estudantil.Cupom.Cupom;
import java.time.LocalDateTime;

public record CupomDTO(
    Long id,
    String codigoResgate,
    LocalDateTime dataResgate,
    boolean utilizado,
    String nomeVantagem,
    String imagemUrl,
    String nomeEmpresa
) {
    public CupomDTO(Cupom cupom) {
        this(
            cupom.getId(),
            cupom.getCodigoResgate(),
            cupom.getDataResgate(),
            cupom.isUtilizado(),
            cupom.getVantagem().getNome(),
            cupom.getVantagem().getImagemUrl(),
            cupom.getVantagem().getEmpresaParceira().getNomeFantasia()
        );
    }
}