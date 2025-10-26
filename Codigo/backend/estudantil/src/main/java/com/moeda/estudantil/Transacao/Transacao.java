package com.moeda.estudantil.Transacao;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Professor.Professor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Table(name = "transacoes")
@Entity(name = "transacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = false)
    @JsonIgnore
    private Professor professor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    @JsonIgnore
    private Aluno aluno;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private String motivo;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false)
    private TipoTransacao tipo;
}