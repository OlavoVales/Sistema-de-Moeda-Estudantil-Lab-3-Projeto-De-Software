package com.moeda.estudantil.Cupom;

public record ResgateResponseDTO(
    String nomeVantagem,
    String nomeEmpresa,
    String codigoResgate,
    Double custo
) {}