package com.aye.web.issueclient.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Created by toufiq on 6/6/2023.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] IGNORED_RESOURCE_LIST = new String[]{
            "/webjars/**", "/css/**", "/js/**", "/images/**"
    };


    private static final String[] PERMITALL_RESOURCE_LIST = new String[]{
//            "/", "/registration", "/get_any_image/**", "/help", "/about",
            "/login", "/logout","/ws/event-emitter"};





    @Bean
    public JwtAuthenticationProvider authProvider() {
        JwtAuthenticationProvider authenticationProvider = new JwtAuthenticationProvider();
        return authenticationProvider;
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider()).eraseCredentials(false);

    }


    @Override
    public void configure(WebSecurity web) {
        web
                //Spring Security ignores request to static resources such as CSS or JS files.
                .ignoring()
                .antMatchers(IGNORED_RESOURCE_LIST);
    }

        @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers("/login").permitAll()//.antMatchers(PERMITALL_RESOURCE_LIST).permitAll()
//                .antMatchers("/registration", "/ws/**").permitAll().
                .antMatchers("/favicon.ico","/*.js","/*.js.map").permitAll()
                .anyRequest()
                .authenticated()
                .and().formLogin().loginPage("/login").successHandler(successHandler())//defaultSuccessUrl("/main", true) //
                .failureUrl("/login?error=true")
                .usernameParameter("username").passwordParameter("password").and().logout().clearAuthentication(true)
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout=true")
                .deleteCookies("JSESSIONID").invalidateHttpSession(true).and()
                .exceptionHandling().accessDeniedPage("/access-denied");
    }
    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new RefferAuthenticationSuccessHandler();
    }
}
