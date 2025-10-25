package com.moeda.estudantil.Login;

import com.moeda.estudantil.TipoUsuario.TipoUsuario;

public record LoginDTO(String email, String senha, TipoUsuario tipoEsperado) { 
    
}