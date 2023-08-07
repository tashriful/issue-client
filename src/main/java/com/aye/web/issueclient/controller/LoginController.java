package com.aye.web.issueclient.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
//@RequestMapping("/login")
public class LoginController {



    @GetMapping({"", "/", "/index"})
    public String index(Map<String, Object> model) {
        model.put("message", "Welcome to AYE World.");
        return "index";
    }

    @GetMapping(value = "/login")
    public String getLoginPage(HttpServletRequest request, Model model, String error, String logout) {

        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");
//            String referrer = request.getHeader("Referer");
//            request.getSession().setAttribute("url_prior_login", referrer);
        return "login";

//        if (message != null) {
//            model.addAttribute("message", message);
//        }
//        return "login";
    }

    @GetMapping("/main")
    public String getMainPage(HttpSession session, HttpServletRequest request,final Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        System.out.println("l");
        System.out.println("l");
        return "main";
    }



}
