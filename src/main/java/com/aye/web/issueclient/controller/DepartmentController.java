package com.aye.web.issueclient.controller;

import com.aye.issuetrackerdto.entityDto.DepartmentDto;
import com.aye.web.issueclient.common.JwtUtill;
import com.aye.web.issueclient.exception.CustomException;
import com.aye.web.issueclient.exception.NotDeletableException;
import com.aye.web.issueclient.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/department")
public class DepartmentController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private JwtUtill jwtUtill;

    @Autowired
    private DepartmentService departmentService;


//    @GetMapping("/departmentData")
//    public List<DepartmentDto> departmentData(HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
//        Object httpSession = session.getAttribute("token");
//        if (httpSession == null || jwtUtill.isTokenExpired((String) httpSession)) {
//            // Redirect the user to the login page if the token is not in the session
//            redirectAttributes.addFlashAttribute("message", "Session Expired! Please Login Again..");
////            return "redirect:/login";
//        }
//        String jwt = (String) httpSession;
//        List<DepartmentDto> allDepartment = departmentService.getAllDepartment(jwt);
//        return allDepartment;
//    }

    @GetMapping("")
    public String getAllDepartments(Model model , RedirectAttributes redirectAttributes) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object credentials = authentication.getCredentials();
        String jwt = null;
        if (credentials instanceof String) {
            jwt = (String) credentials;
        }
        System.out.println(jwt);

        try {
            DepartmentDto departmentModel = new DepartmentDto();
            model.addAttribute("department", departmentModel);
            List<DepartmentDto> allDepartment = departmentService.getAllDepartment(jwt);
            model.addAttribute("departments", allDepartment);
        }
        catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!"+e2.getMessage());
            return "redirect:/login";
        }
        catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        return "Department/addDepartment";

    }

    @PostMapping("/submit")
    public String postDepartment(@ModelAttribute DepartmentDto departmentDto, Model model, HttpSession session, RedirectAttributes redirectAttributes){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        try{
            DepartmentDto departmentModel = new DepartmentDto();
            model.addAttribute("department", departmentModel);
            String response = departmentService.saveDepartment(departmentDto, jwt);
            model.addAttribute("message", response);
            List<DepartmentDto> departmentDtoList = departmentService.getAllDepartment(jwt);
            model.addAttribute("departments", departmentDtoList);
        }
        catch (Exception e){
            System.out.println(e);
        }
        return "Department/addDepartment";

    }

    @GetMapping("/edit/{id}")
    public String editPage(Model model, HttpSession session, RedirectAttributes redirectAttributes, @PathVariable("id") Long id){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        try{
            DepartmentDto departmentDto = departmentService.getDepartmentById(id, jwt);
            model.addAttribute("department", departmentDto);
            List<DepartmentDto> departmentDtoList = departmentService.getAllDepartment(jwt);
            model.addAttribute("departments", departmentDtoList);
        }
    catch (CustomException e2) {
        System.out.println(e2.getMessage());
        redirectAttributes.addAttribute("message", "Session/JWT Expired!");
        return "redirect:/login";
    } catch (Exception e1) {
        System.out.println(e1.getMessage());
    }
        return "Department/editDepartment";

    }

    @PostMapping("/update")
    public String updateDepartment(DepartmentDto departmentDto, Model model, HttpSession session, RedirectAttributes redirectAttributes){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);
        String response = null;

        try {
            response = departmentService.updateDepartment(departmentDto, jwt);
            model.addAttribute("message", response);
            List<DepartmentDto> allDepartment = departmentService.getAllDepartment(jwt);
            model.addAttribute("departments", allDepartment);
            model.addAttribute("department", new DepartmentDto());

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!"+e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Department/addDepartment";

    }

    @GetMapping("/delete/{id}")
    public String deleteDepartment(@PathVariable("id") Long id, Model model, HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        String response = null;
        List<DepartmentDto> departmentDtos = null;
        try {
            departmentDtos = departmentService.deleteDepartment(id, jwt);

            if (departmentDtos != null) {
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
            model.addAttribute("departments", departmentService.getAllDepartment(jwt));
            model.addAttribute("department", new DepartmentDto());
            return "Department/addDepartment";

        }
        catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        model.addAttribute("departments", departmentDtos);
        model.addAttribute("department", new DepartmentDto());
        return "Department/addDepartment";
    }


}
