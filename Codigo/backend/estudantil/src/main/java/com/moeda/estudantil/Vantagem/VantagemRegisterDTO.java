package com.moeda.estudantil.Vantagem;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VantagemRegisterDTO(
    @NotBlank String nome,
    String descricao,
    @NotNull @Min(0) Double custoMoedas,
    @Min(0) Integer quantidadeDisponivel
) {}