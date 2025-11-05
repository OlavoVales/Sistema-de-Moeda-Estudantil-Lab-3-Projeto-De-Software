package com.moeda.estudantil.Vantagem;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "vantagens")
@Entity(name = "vantagens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;

    @Column(name = "custo_moedas")
    private Double custoMoedas;

    @Column(name = "quantidade_disponivel")
    private Integer quantidadeDisponivel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empresa_id", nullable = false)
    @JsonIgnore
    private EmpresaParceira empresaParceira;
}