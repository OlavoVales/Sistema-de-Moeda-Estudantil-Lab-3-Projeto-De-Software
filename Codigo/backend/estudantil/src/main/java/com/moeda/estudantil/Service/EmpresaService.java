package com.moeda.estudantil.Service;

import com.moeda.estudantil.Vantagem.VantagemRegisterDTO;
import com.moeda.estudantil.EmpresaParceira.EmpresaParceira;
import com.moeda.estudantil.EmpresaParceira.EmpresaRepository;
import com.moeda.estudantil.Usuario.Usuario;
import com.moeda.estudantil.Usuario.UsuarioRepository;
import com.moeda.estudantil.Vantagem.Vantagem;
import com.moeda.estudantil.Vantagem.VantagemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private StorageService storageService;

    private EmpresaParceira getEmpresaPorEmail(String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));
        
        return empresaRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de empresa não encontrado para este usuário."));
    }

    @Transactional
    public Vantagem cadastrarVantagem(String emailUsuario, VantagemRegisterDTO dto, MultipartFile imagem) throws IOException {
        EmpresaParceira empresaLogada = getEmpresaPorEmail(emailUsuario);

        String imageUrl = storageService.uploadFile(imagem);

        Vantagem novaVantagem = new Vantagem();
        novaVantagem.setNome(dto.nome());
        novaVantagem.setDescricao(dto.descricao());
        novaVantagem.setCustoMoedas(dto.custoMoedas());
        novaVantagem.setQuantidadeDisponivel(dto.quantidadeDisponivel());
        novaVantagem.setEmpresaParceira(empresaLogada);
        novaVantagem.setImagemUrl(imageUrl);

        return vantagemRepository.save(novaVantagem);
    }

    public List<Vantagem> getMinhasVantagens(String emailUsuario) {
        EmpresaParceira empresaLogada = getEmpresaPorEmail(emailUsuario);
        return vantagemRepository.findByEmpresaParceiraId(empresaLogada.getId());
    }
}