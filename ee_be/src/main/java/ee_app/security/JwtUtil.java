package ee_app.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.spec.SecretKeySpec;

import java.security.Key;
import java.util.*;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "YourSuperSecretKeyForJWTMustBeLongEnough12345";
    private static final long EXPIRATION_TIME = 86400000;

    private Key key() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username, Long customerId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("customer_id", customerId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);
            return false;
        } catch (JwtException e) {
            return true;
        }
    }

    public Long extractCustomerId(String token) {
        try {

            Key key = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("customer_id", Long.class);
        } catch (JwtException e) {
            throw new RuntimeException("Invalid JWT token", e);
        } catch (Exception e) {
            throw new RuntimeException("Could not extract customer_id from token", e);
        }
    }
}
