package com.aye.web.issueclient.config;


import com.aye.issuetrackerdto.entityDto.AuthRequestDto;
import com.aye.web.issueclient.common.JwtUtill;
import com.aye.web.issueclient.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {


    @Autowired
    private LoginService loginService;
    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;
    @Autowired
    private JwtUtill jwtUtill;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            AuthRequestDto authRequestDto = new AuthRequestDto(authentication.getPrincipal().toString(), authentication.getCredentials().toString());
            String token = loginSubmitService(authRequestDto);
            String username = null;
            if (token != null) {
                username = jwtUtill.getUsernameFromToken(token);
            }
            UserDetails user = User.withUsername(username).password(token).authorities(new ArrayList<>()).build();
            return new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getAuthorities());
        }
        catch (Exception e){
            System.out.println(e);
        }
        return null;
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
            System.out.println(ex);
            jwt =null;
        }

        return jwt;
    }
}
