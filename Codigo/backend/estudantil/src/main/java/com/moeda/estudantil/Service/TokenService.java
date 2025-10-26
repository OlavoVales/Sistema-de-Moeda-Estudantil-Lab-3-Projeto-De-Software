package com.moeda.estudantil.Service;

import com.moeda.estudantil.Usuario.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder()
                .subject(usuario.getEmail()) 
                .claim("nome", usuario.getNome())
                .claim("role", usuario.getTipoUsuario().name())
                .issuer("MeritCoin API")
                .issuedAt(new Date())
                .expiration(genExpirationDate())
                .signWith(key)
                .compact();
    }

    public String validateTokenAndGetSubject(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
            JwtParser parser = Jwts.parser().verifyWith(key).build();
            
            Claims claims = parser.parseSignedClaims(token).getPayload();
            
            return claims.getSubject(); 
        } catch (Exception e) {
            System.err.println("Token JWT inválido ou expirado: " + e.getMessage());
            return null;
        }
    }

    private Date genExpirationDate() {
        return Date.from(LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00")));
    }
}