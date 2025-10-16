package com.moeda.estudantil.EmpresaParceira;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moeda.estudantil.Usuario.Usuario;
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

@Table(name = "empresas_parceiras")
@Entity(name = "empresas_parceiras")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EmpresaParceira {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cnpj;
    private String nomeFantasia;
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public EmpresaParceira(EmpresaParceiraRegisterDTO data) {
        this.cnpj = data.cnpj();
        this.nomeFantasia = data.nomeFantasia();
    }
}