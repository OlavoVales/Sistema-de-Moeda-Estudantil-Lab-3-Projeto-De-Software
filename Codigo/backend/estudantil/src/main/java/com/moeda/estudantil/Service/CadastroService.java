package com.moeda.estudantil.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moeda.estudantil.Aluno.Aluno;
import com.moeda.estudantil.Aluno.AlunoRegisterDTO;
import com.moeda.estudantil.Aluno.AlunoRepository;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceiraRegisterDTO;
import com.moeda.estudantil.EmpresaParceira.EmpresaRepository;
import com.moeda.estudantil.TipoUsuario.TipoUsuario;
import com.moeda.estudantil.Usuario.Usuario;
import com.moeda.estudantil.Usuario.UsuarioRepository;

@Service
public class CadastroService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AlunoRepository alunoRepository;
    
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void cadastrarAluno(AlunoRegisterDTO dto) {
        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Email já cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setSenha(passwordEncoder.encode(dto.senha()));
        novoUsuario.setTipoUsuario(TipoUsuario.ALUNO); 

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        Aluno novoAluno = new Aluno(dto); 
        novoAluno.setUsuario(usuarioSalvo); 
        alunoRepository.save(novoAluno);
}

    @Transactional
    public void cadastrarEmpresa(EmpresaParceiraRegisterDTO dto) {
        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Email já cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dto.nome());
        novoUsuario.setEmail(dto.email());
        novoUsuario.setSenha(passwordEncoder.encode(dto.senha()));
        novoUsuario.setTipoUsuario(TipoUsuario.EMPRESAPARCEIRA);
    
        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        EmpresaParceira novaEmpresa = new EmpresaParceira();
        novaEmpresa.setCnpj(dto.cnpj());
        novaEmpresa.setNomeFantasia(dto.nomeFantasia());
        novaEmpresa.setUsuario(usuarioSalvo);
    
        empresaRepository.save(novaEmpresa);
    }
}