package com.aye.web.controller;

import com.aye.issuetrackerdto.entityDto.DepartmentDto;
import com.aye.issuetrackerdto.entityDto.EmployeeDto;
import com.aye.issuetrackerdto.entityDto.TeamDto;
import com.aye.issuetrackerdto.entityDto.UserDto;
import com.aye.web.common.JwtUtill;
import com.aye.web.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.Base64;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private JwtUtill jwtUtill;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private TeamService teamService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private UserService userService;

    @GetMapping("/departmentData")
    public List<DepartmentDto> departmentData(HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        List<DepartmentDto> allDepartment = departmentService.getAllDepartment(jwt);
        return allDepartment;
    }

    @GetMapping("/teamData")
    public List<TeamDto> teamData(HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        List<TeamDto> allTeam = teamService.getAllTeam(jwt);
        return allTeam;
    }

    @GetMapping("/userData")
    public List<UserDto> userData(HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        List<UserDto> allUser = userService.getAllUser(jwt);
        return allUser;
    }

    @GetMapping("/employee/department/{id}")
    public List<EmployeeDto> getEmployeesByDepartment(@PathVariable("id") Long id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        try {
            List<EmployeeDto> allEmployees = employeeService.getEmployeesByDept(id, jwt);
            if(allEmployees.size() > 0){
                return allEmployees;
            }
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
        return null;
    }

    @GetMapping("/ticket/downloadImage/{id}")
    public ResponseEntity<String> downloadImage(@PathVariable("id") String id) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getDetails();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        try {
            ResponseEntity<byte[]> response = ticketService.downloadTicketImage(id, jwt);
            String base64Image = Base64.getEncoder().encodeToString(response.getBody());
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(response.getHeaders().getContentType());
            return new ResponseEntity<>(base64Image, httpHeaders, HttpStatus.OK);
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
    }
}
