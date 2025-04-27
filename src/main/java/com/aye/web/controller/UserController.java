package com.aye.web.controller;


import com.aye.issuetrackerdto.entityDto.UserDto;
import com.aye.web.common.JwtUtill;
import com.aye.web.exception.CustomException;
import com.aye.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtill jwtUtill;

    @Autowired
    private RestTemplate restTemplate;

    private String msg = null;

    @GetMapping
    public String addUserPage(Model model, RedirectAttributes redirectAttributes){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }


        try {
            List<UserDto> userDtos = userService.getAllUser(jwt);
            model.addAttribute("users", userDtos);
            model.addAttribute("user", new UserDto());
            if (msg != null){
                model.addAttribute("message", msg);
            }
            msg = null;
        }
        catch (CustomException e2){
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        }
        catch (Exception e3){
            System.out.println(e3.getMessage());
        }

        return "User/addUser";

    }

    @GetMapping("/getAll")
    public String getAllUsers(Model model){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        List<UserDto> userDtos = null;
        try {
            userDtos = userService.getAllUser(jwt);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        model.addAttribute("users", userDtos);
        return "User/addUser";
    }

    @PostMapping("/submit")
    public String submitUser(UserDto userDto, RedirectAttributes redirectAttributes,
                             BindingResult result, Model model) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        if (result.hasErrors()) {
            return "redirect:/user";
        }

        List<UserDto> userDtos = null;
        try {
            String response = userService.saveUser(userDto, jwt);
            model.addAttribute("message", response);
            userDtos = userService.getAllUser(jwt);
            model.addAttribute("users", userDtos);
            model.addAttribute("user", new UserDto());

        } catch (Exception e) {
            System.out.println(e);
        }

        return "User/addUser";

    }

    @GetMapping("/edit/{id}")
    public String editPage(Model model, HttpSession session,RedirectAttributes redirectAttributes,
                           @PathVariable("id") Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        UserDto user = null;
        List<UserDto> userDtos = null;
        try {
            user = userService.getUserById(id, jwt);
            userDtos = userService.getAllUser(jwt);

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        model.addAttribute("user", user);
        model.addAttribute("users", userDtos);

        return "User/editUser";

    }

    @PostMapping("/update")
    public String updateUser(UserDto userDto,HttpSession session,RedirectAttributes redirectAttributes, Model model){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        String response = null;
        try {
            response = userService.updateUser(userDto, jwt);
            msg = response;
            model.addAttribute("message", response);
            List<UserDto> userDtos = userService.getAllUser(jwt);
            model.addAttribute("users", userDtos);
            model.addAttribute("user", new UserDto());

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!"+e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "redirect:/user";

    }

    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id,RedirectAttributes redirectAttributes, Model model, HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        List<UserDto> userDtos = null;
        try {
            userDtos = userService.deleteUser(id, jwt);

            if (userDtos != null) {
                model.addAttribute("message", "Delete Successfull!");
                msg = "Delete Successfull!";
            } else {
                model.addAttribute("message", "Delete Not Successfull!");
                msg = "Delete Not Successfull!";
            }
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        model.addAttribute("users", userDtos);
        return "redirect:/user";

    }


}
