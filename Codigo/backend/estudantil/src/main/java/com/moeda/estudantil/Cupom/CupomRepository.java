package com.moeda.estudantil.Cupom;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {
    List<Cupom> findByAlunoIdOrderByDataResgateDesc(Long alunoId);
}