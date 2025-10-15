package com.moeda.estudantil.Usuario;

import com.moeda.estudantil.TipoUsuario.TipoUsuario;

public record UsuarioRegisterDTO(String nome, String email, String senha, TipoUsuario tipoUsuario) {

}
