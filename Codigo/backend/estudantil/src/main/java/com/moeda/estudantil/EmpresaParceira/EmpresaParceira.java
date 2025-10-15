package com.moeda.estudantil.EmpresaParceira;

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

    public EmpresaParceira(EmpresaParceiraRegisterDTO data) {
        this.cnpj = data.cnpj();
        this.nomeFantasia = data.nomeFantasia();
    }
}
