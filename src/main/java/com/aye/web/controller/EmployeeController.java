package com.aye.web.controller;


import com.aye.issuetrackerdto.entityDto.EmployeeDto;
import com.aye.web.common.JwtUtill;
import com.aye.web.exception.CustomException;
import com.aye.web.exception.NotDeletableException;
import com.aye.web.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private JwtUtill jwtUtill;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    public String addEmployee(HttpSession session, Model model, RedirectAttributes redirectAttributes) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        Long userId = (Long) session.getAttribute("userId");

        try {
            EmployeeDto employeeDto = new EmployeeDto();
            model.addAttribute("employee", employeeDto);
            List<EmployeeDto> employeeDtos = employeeService.getAllEmployee(jwt);
            model.addAttribute("employees", employeeDtos);
        }
        catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        model.addAttribute("userID", userId);
        return "Employee/addEmployee";
    }

    @PostMapping("/submit")
    public String postEmployee(@ModelAttribute EmployeeDto employeeDto, Model model, HttpSession session, RedirectAttributes redirectAttributes){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        try{
            String response = employeeService.saveEmployee(employeeDto, jwt);
            model.addAttribute("message", response);
            List<EmployeeDto> employeeDtos = employeeService.getAllEmployee(jwt);
            model.addAttribute("employees", employeeDtos);
            EmployeeDto employeeDto1 = new EmployeeDto();
            model.addAttribute("employee", employeeDto1);
        }
        catch (Exception e){
            System.out.println(e);
        }
        return "Employee/addEmployee";

    }

    @GetMapping("/edit/{id}")
    public String editEmployee(@PathVariable("id") Long id, Model model, HttpSession session, RedirectAttributes redirectAttributes){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        try {
            EmployeeDto employeeDto = employeeService.getEmployeeById(id, jwt);
            model.addAttribute("employee", employeeDto);
            List<EmployeeDto> employeeDtos = employeeService.getAllEmployee(jwt);
            model.addAttribute("employees", employeeDtos);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        return "Employee/editEmployee";
    }

    @PostMapping("/update")
    public String updateEmployee(@ModelAttribute EmployeeDto employeeDto, HttpSession session, RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        String response = null;


        try {
            response = employeeService.updateEmployee(employeeDto, jwt);
            model.addAttribute("message", response);
            List<EmployeeDto> allEmployee = employeeService.getAllEmployee(jwt);
            model.addAttribute("employees", allEmployee);
            EmployeeDto employeeDto1 = new EmployeeDto();
            model.addAttribute("employee", employeeDto1);

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Employee/addEmployee";


    }

    @GetMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable("id") Long id, Model model, RedirectAttributes redirectAttributes, HttpSession session) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        String response = null;
        List<EmployeeDto> employeeDtos = null;
        EmployeeDto employeeDto = null;
        try {
            employeeDtos = employeeService.deleteEmployee(id, jwt);
            employeeDto = new EmployeeDto();

            if (employeeDtos != null) {
                model.addAttribute("message", "Delete Successfull!");
            } else {
                model.addAttribute("message", "Delete Not Successfull!");
            }
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        }
        catch (NotDeletableException e3) {
            System.out.println(e3.getMessage());
            model.addAttribute("message", e3.getMessage());
            model.addAttribute("employees", employeeService.getAllEmployee(jwt));
            model.addAttribute("employee", new EmployeeDto());
            return "Employee/addEmployee";

        }
        catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        model.addAttribute("employees", employeeDtos);
        model.addAttribute("employee", employeeDto);
        return "Employee/addEmployee";
    }
}
