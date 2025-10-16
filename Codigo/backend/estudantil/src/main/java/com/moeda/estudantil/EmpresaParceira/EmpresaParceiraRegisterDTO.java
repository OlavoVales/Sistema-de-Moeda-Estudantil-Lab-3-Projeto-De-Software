package com.moeda.estudantil.EmpresaParceira;

public record EmpresaParceiraRegisterDTO(
    String nome,
    String email,
    String senha,
    String cnpj, 
    String nomeFantasia
) {}
