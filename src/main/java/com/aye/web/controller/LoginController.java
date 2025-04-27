package com.aye.web.controller;


import com.aye.issuetrackerdto.entityDto.TicketDto;
import com.aye.issuetrackerdto.entityDto.UserDto;
import com.aye.web.exception.CustomException;
import com.aye.web.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
//@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

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
    public String getMainPage(HttpSession session, HttpServletRequest request, final Model model, RedirectAttributes redirectAttributes) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        try {
            String response = loginService.hookMain(jwt);
            System.out.println(response);
        }
        catch (CustomException e2){
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        }
        catch (Exception e3){
            System.out.println(e3.getMessage());
        }

        System.out.println("*****************************");
        System.out.println("logged in :"+SecurityContextHolder.getContext().getAuthentication().getName());
        System.out.println("*****************************");
        return "main";
    }



}
