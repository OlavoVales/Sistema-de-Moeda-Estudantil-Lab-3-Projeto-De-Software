package com.moeda.estudantil.Aluno;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Table(name = "alunos")
@Entity(name = "alunos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private String rg;
    private String endereco;
    private String instituicao;
    private String curso;
    private String saldo;

    public Aluno(AlunoRegisterDTO data) {
        this.cpf = data.cpf();
        this.rg = data.rg();
        this.endereco = data.endereco();
        this.instituicao = data.instituicao();
        this.curso = data.curso();
        this.saldo = "0";
    }

}
