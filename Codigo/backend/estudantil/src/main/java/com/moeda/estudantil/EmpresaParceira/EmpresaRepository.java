package com.moeda.estudantil.EmpresaParceira;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaRepository extends JpaRepository<EmpresaParceira, Long> {
    
    Optional<EmpresaParceira> findByCnpj(String cnpj);

}