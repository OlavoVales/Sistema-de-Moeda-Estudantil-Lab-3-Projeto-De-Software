package com.moeda.estudantil.Vantagem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {

    List<Vantagem> findByEmpresaParceiraId(Long empresaId);

    @Query("SELECT v FROM vantagens v JOIN FETCH v.empresaParceira")
    List<Vantagem> findAllWithEmpresa();
}