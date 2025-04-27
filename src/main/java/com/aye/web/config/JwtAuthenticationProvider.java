package com.aye.web.config;


import com.aye.issuetrackerdto.entityDto.AuthRequestDto;
import com.aye.web.common.JwtUtill;
import com.aye.web.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {


    private final LoginService loginService;

    private final JwtUtill jwtUtill;

    public JwtAuthenticationProvider(LoginService loginService, JwtUtill jwtUtill) {
        this.loginService = loginService;
        this.jwtUtill = jwtUtill;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            AuthRequestDto authRequestDto = new AuthRequestDto(authentication.getPrincipal().toString(), authentication.getCredentials().toString());
            String jwtToken = loginSubmitService(authRequestDto);

            if (jwtToken == null) {
                throw new BadCredentialsException("JWT token is null. Invalid username or password.");
            }

            String username = jwtUtill.getUsernameFromToken(jwtToken);
            UserDetails user = User.withUsername(username)
                    .password(jwtToken)
                    .authorities(new ArrayList<>())
                    .build();

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getAuthorities());
            usernamePasswordAuthenticationToken.setDetails(jwtToken);

            return usernamePasswordAuthenticationToken;
        }
        catch (Exception e){
            System.out.println(e);
            throw new AuthenticationServiceException("Authentication failed: " + e.getMessage(), e);

        }
    }

    @Override
    public boolean supports(Class<?> authenticationType) {
        return UsernamePasswordAuthenticationToken.class.equals(authenticationType);
    }


    public String loginSubmitService(AuthRequestDto authRequestDto) {

        String jwt;
        HashMap<String, String> response;
        try {
            response = loginService.generateJwt(authRequestDto.getUsername(), authRequestDto.getPassword());

            if(response.containsKey("jwt")){
                jwt = response.get("jwt");
            }
            else {
                return null;
            }

        } catch (Exception ex) {
            System.out.println("Error while generating JWT: " + ex.getMessage());
            jwt =null;
        }

        return jwt;
    }
}
