package com.moeda.estudantil.Professor;

public record ProfessorRegisterDTO(
    String nome,
    String email,
    String senha,
    String cpf,
    String departamento,
    Integer instituicaoEnsinoId
) {}