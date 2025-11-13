package com.moeda.estudantil.Cupom;

import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Transacao.Transacao;
import com.moeda.estudantil.Vantagem.Vantagem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Table(name = "cupons")
@Entity(name = "cupons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cupom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_resgate", unique = true, nullable = false)
    private String codigoResgate;

    @Column(name = "data_resgate", nullable = false)
    private LocalDateTime dataResgate;

    @Column(nullable = false)
    private boolean utilizado = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vantagem_id", nullable = false)
    private Vantagem vantagem;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transacao_id", nullable = false, unique = true)
    private Transacao transacao;
}