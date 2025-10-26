package com.moeda.estudantil.Moedas;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DistribuirMoedasDTO(
    @NotBlank(message = "O email do aluno é obrigatório") 
    String alunoEmail, 

    @NotNull(message = "A quantidade de moedas é obrigatória") 
    @Min(value = 1, message = "A quantidade deve ser pelo menos 1")
    Integer quantidade, 

    @NotBlank(message = "O motivo é obrigatório")
    String motivo
) {}