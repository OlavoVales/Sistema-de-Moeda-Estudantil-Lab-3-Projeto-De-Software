package com.moeda.estudantil.Aluno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.moeda.estudantil.Usuario.Usuario;

import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    Optional<Aluno> findByCpf(String cpf);

    Optional<Aluno> findByUsuarioId(Long usuarioId);

}