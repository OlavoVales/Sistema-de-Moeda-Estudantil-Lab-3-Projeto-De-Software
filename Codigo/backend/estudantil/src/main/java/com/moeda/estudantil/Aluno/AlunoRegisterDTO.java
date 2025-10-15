package com.moeda.estudantil.Aluno;

public record AlunoRegisterDTO(
    String nome,
    String email,
    String senha,
    String cpf,
    String rg,
    String endereco,
    String instituicao,
    String curso) {
}
