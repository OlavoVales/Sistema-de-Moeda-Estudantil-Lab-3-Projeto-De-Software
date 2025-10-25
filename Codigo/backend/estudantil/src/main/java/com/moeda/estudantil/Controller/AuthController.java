package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Login.LoginDTO;
import com.moeda.estudantil.Login.LoginResponseDTO;
import com.moeda.estudantil.Service.TokenService;
import com.moeda.estudantil.Usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        
        var usernamePassword = new UsernamePasswordAuthenticationToken(
            loginDTO.email(), 
            loginDTO.senha()
        );

        Authentication auth = this.authenticationManager.authenticate(usernamePassword);

        Usuario usuarioAutenticado = (Usuario) auth.getPrincipal();

        String token = tokenService.generateToken(usuarioAutenticado);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}