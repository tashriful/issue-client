package com.aye.web.common;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtUtill {

    @Value("${myapp.jwt.secret}")
    private String secret;

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            Date expirationDate = claims.getExpiration();
            Date currentDate = new Date();
            return expirationDate.before(currentDate);
        }
            catch(ExpiredJwtException e) {
                System.out.println(e);
                return true;
            }
        }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }
    }
