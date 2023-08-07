package com.aye.web.issueclient.controller;

import com.aye.issuetrackerdto.entityDto.EmployeeDto;
import com.aye.issuetrackerdto.entityDto.TicketDto;
import com.aye.issuetrackerdto.entityDto.TicketHistoryDto;
import com.aye.web.issueclient.common.JwtUtill;
import com.aye.web.issueclient.exception.CustomException;
import com.aye.web.issueclient.service.EmployeeService;
import com.aye.web.issueclient.service.TicketService;
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
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private JwtUtill jwtUtill;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public String addTicket(Model model, HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        TicketDto ticketDto = new TicketDto();
        model.addAttribute("ticket", ticketDto);

        List<TicketDto> ticketDtoList = ticketService.getTicketsByCreatedBy(jwt);


        model.addAttribute("tickets", ticketDtoList);

        return "Ticket/addTicket";
    }



    @PostMapping("/submit")
    public String saveTicket(@ModelAttribute TicketDto ticketDto, HttpSession session, RedirectAttributes redirectAttributes, Model model) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        try {
            String response = ticketService.saveTicket(ticketDto, jwt);
            model.addAttribute("message", response);
//            List<TeamDto> teamDtoList = ticketService.getAllTicket(jwt);
//            model.addAttribute("teams", teamDtoList);
        } catch (Exception e) {
            System.out.println(e);
        }
        TicketDto emptyTicketDto = new TicketDto();
        model.addAttribute("ticket", emptyTicketDto);
        List<TicketDto> ticketDtoList = ticketService.getTicketsByCreatedBy(jwt);
        model.addAttribute("tickets", ticketDtoList);
        return "Ticket/addTicket";
    }

    @GetMapping("/view/{id}")
    public String viewTicket(@PathVariable("id") Long id,  RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
//        System.out.println(jwt);

        try {
            TicketDto ticketDto = ticketService.getTicketById(id, jwt);
            model.addAttribute("ticket", ticketDto);
            List<TicketDto> ticketDtoList = ticketService.getAllTicket(jwt);
            model.addAttribute("tickets", ticketDtoList);
            List<TicketHistoryDto> ticketHistoryDtos = ticketService.getTicketHistoryByTicket(id, jwt);
            model.addAttribute("ticketHistory", ticketHistoryDtos);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/viewTicket";
    }

    @GetMapping("/assignedTickets")
    public String getAssignedToTickets(RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        try {
            List<TicketDto> ticketDtoList = ticketService.getTicketsByAssignedTo(jwt);
            model.addAttribute("tickets", ticketDtoList);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/assignedTickets";
    }

    @GetMapping("/assigned/edit/{id}")
    public String editAssignedTickets(@PathVariable("id") Long id,  RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String username = authentication.getName();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
//        System.out.println(jwt);

        try {
            TicketDto ticketDto = ticketService.getTicketById(id, jwt);
            model.addAttribute("ticket", ticketDto);
            EmployeeDto employeeDto = employeeService.getEmployeeByUserName(username, jwt);
            if(employeeDto.getDeptHead()) {
                model.addAttribute("deptHead", true);
            }
            List<TicketDto> ticketDtoList = ticketService.getTicketsByAssignedTo(jwt);
            model.addAttribute("tickets", ticketDtoList);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/assignedUpdateTicket";
    }

    @GetMapping("/departmentTicket/edit/{id}")
    public String editDepartmentTickets(@PathVariable("id") Long id,  RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String username = authentication.getName();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
//        System.out.println(jwt);

        try {
            TicketDto ticketDto = ticketService.getTicketById(id, jwt);
            model.addAttribute("ticket", ticketDto);
            EmployeeDto employeeDto = employeeService.getEmployeeByUserName(username, jwt);
            if(employeeDto.getDeptHead()) {
                model.addAttribute("deptHead", true);
            }
            List<TicketDto> ticketDtoList = ticketService.getAllTicketsByDepartment(jwt);
            model.addAttribute("tickets", ticketDtoList);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/updateDepartmentTicket";
    }

    @PostMapping("/assignedTicket/update")
    public String updateAssignedTicket(@ModelAttribute TicketDto ticketDto, HttpSession session, RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        String response = null;

        try {
            response = ticketService.updateAssignedTicket(ticketDto, jwt);
            model.addAttribute("message", response);
            List<TicketDto> ticketDtoList = ticketService.getTicketsByAssignedTo(jwt);
            model.addAttribute("tickets", ticketDtoList);

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/assignedTickets";


    }

    @PostMapping("/departmentTicket/update")
    public String updateDepartmentTicket(@ModelAttribute TicketDto ticketDto, HttpSession session, RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String username = authentication.getName();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        String response = null;

        try {
            response = ticketService.updateDepartmentTicket(ticketDto, jwt);
            model.addAttribute("message", response);
            EmployeeDto employeeDto = employeeService.getEmployeeByUserName(username, jwt);
            if(employeeDto.getDeptHead()) {
                model.addAttribute("deptHead", true);
            }
            List<TicketDto> ticketDtoList = ticketService.getAllTicketsByDepartment(jwt);
            model.addAttribute("tickets", ticketDtoList);

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/departmentTickets";


    }

    @GetMapping("/allTickets/department")
    public String getAllTicketsByDepartment(RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String username = authentication.getName();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }

        try {
            List<TicketDto> ticketDtoList = ticketService.getAllTicketsByDepartment(jwt);
            model.addAttribute("tickets", ticketDtoList);
            EmployeeDto employeeDto = employeeService.getEmployeeByUserName(username, jwt);
            if(employeeDto.getDeptHead()) {
                model.addAttribute("deptHead", true);
            }
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Ticket/departmentTickets";
    }




}
