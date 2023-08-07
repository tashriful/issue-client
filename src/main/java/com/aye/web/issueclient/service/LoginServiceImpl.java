package com.aye.web.issueclient.service;

import com.aye.issuetrackerdto.entityDto.AuthRequestDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.ConnectException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

@Service
public class LoginServiceImpl implements LoginService{

    @Value("${myapp.base-url}")
    private String baseUrl;

    @Value("${myapp.jwt.secret}")
    private String secret;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public HashMap<String, String> generateJwt(String username, String password) throws IOException {

        AuthRequestDto authRequestDto = new AuthRequestDto(username, password);

        String url = baseUrl+"/users/authenticate";
        System.out.println(url);
        String auth = username + ":" + password;
        byte[] encodedAuth = Base64.encodeBase64(
                auth.getBytes(StandardCharsets.US_ASCII) );

        String authHeader = "Basic " + new String(encodedAuth);

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", authHeader);

        HashMap<String, String> responses = new HashMap<>();

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(httpHeaders), String.class);
            if(response.getStatusCode() == HttpStatus.OK){
                responses.put("jwt", response.getBody());
                String validateUsername = this.getUsernameFromToken(response.getBody());
                Long validateUserId = this.getUserIdFromToken(response.getBody());
                responses.put("username", validateUsername);
                responses.put("userId", validateUserId.toString());


            }
        else {
                System.out.println("Failed to authenticate. Response status: " + response.getStatusCodeValue() + ". Response body: " + response.getBody());
                responses.put("message", "Wrong Username password!");
            }
         }
        catch (HttpClientErrorException.Unauthorized e1){
            System.out.println("Unauthorized User!!"+e1);
            responses.put("message", "Wrong Username password!");
        }
        catch (ResourceAccessException e2) {
            if (e2.getCause() instanceof ConnectException) {
                System.out.println("Connection Error: " + e2.getCause().getMessage());
                responses.put("message", "Server Down!");
            } else {
                // Handle other types of ResourceAccessException
                System.out.println("Resource Access Error: " + e2.getMessage());
                responses.put("message", "Resource Access Error!");
            }
        }
        catch (Exception e3){
            System.out.println(e3);
            responses.put("message", "Internal server Error!");
        }
        return responses;

    }

    private Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        // Retrieve the user ID from the claims
        Object userId = claims.get("userId");
        Long validUserId = Long.parseLong(userId.toString());
        System.out.println("kk");
        return validUserId;
    }

    public String getUsernameFromToken(String token) {
        String username = Jwts.parser().
                setSigningKey(secret).
                parseClaimsJws(token).
                getBody().
                getSubject();
        return username;
    }
}
