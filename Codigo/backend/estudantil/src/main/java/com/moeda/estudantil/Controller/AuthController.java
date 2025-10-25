package com.moeda.estudantil.Controller;

import com.moeda.estudantil.Login.LoginDTO;
import com.moeda.estudantil.Login.LoginResponseDTO;
import com.moeda.estudantil.Service.TokenService;
import com.moeda.estudantil.Usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(
                loginDTO.email(), 
                loginDTO.senha()
            );

            Authentication auth = this.authenticationManager.authenticate(usernamePassword);
            Usuario usuarioAutenticado = (Usuario) auth.getPrincipal();

            if (usuarioAutenticado.getTipoUsuario() != loginDTO.tipoEsperado()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                     .body("Tipo de usuário incorreto para esta aba de login.");
            }

            String token = tokenService.generateToken(usuarioAutenticado);
            return ResponseEntity.ok(new LoginResponseDTO(token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Email ou senha inválidos.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro interno no servidor durante o login.");
        }
    }
}