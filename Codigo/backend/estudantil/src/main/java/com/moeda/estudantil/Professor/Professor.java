package com.moeda.estudantil.Professor;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moeda.estudantil.Usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "professores")
@Entity(name = "professores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String cpf;

    private String departamento;

    @Column(name = "instituicao_ensino_id")
    private Integer instituicaoEnsinoId; 

    @Column(name = "saldo_moedas")
    private Double saldoMoedas;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Professor(ProfessorRegisterDTO data) {
        this.cpf = data.cpf();
        this.departamento = data.departamento();
        this.instituicaoEnsinoId = data.instituicaoEnsinoId();
        this.saldoMoedas = 0.0;
    }
}