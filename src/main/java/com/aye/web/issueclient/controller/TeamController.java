package com.aye.web.issueclient.controller;

import com.aye.issuetrackerdto.entityDto.DepartmentDto;
import com.aye.issuetrackerdto.entityDto.TeamDto;
import com.aye.web.issueclient.common.JwtUtill;
import com.aye.web.issueclient.exception.CustomException;
import com.aye.web.issueclient.exception.NotDeletableException;
import com.aye.web.issueclient.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/team")
public class TeamController {

    @Autowired
    private JwtUtill jwtUtill;

    @Autowired
    private TeamService teamService;

    @GetMapping
    public String addTeam(HttpSession session, RedirectAttributes redirectAttributes, Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        try {
            List<TeamDto> teamDtoList = teamService.getAllTeam(jwt);
            model.addAttribute("teams", teamDtoList);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        return "Team/addTeam";
    }

    @PostMapping("/submit")
    public String saveTeam(TeamDto teamDto, HttpSession session, RedirectAttributes redirectAttributes, Model model) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        try {
            String response = teamService.saveTeam(teamDto, jwt);
            model.addAttribute("message", response);
            List<TeamDto> teamDtoList = teamService.getAllTeam(jwt);
            model.addAttribute("teams", teamDtoList);
        } catch (Exception e) {
            System.out.println(e);
        }
        return "Team/addTeam";
    }

    @GetMapping("/edit/{id}")
    public String editPage(@PathVariable("id") Long id, HttpSession session, RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        try {
            TeamDto teamDto = teamService.getTeamById(id, jwt);
            model.addAttribute("team", teamDto);
            List<TeamDto> teamDtoList = teamService.getAllTeam(jwt);
            model.addAttribute("teams", teamDtoList);
        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!");
            return "redirect:/login";
        } catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Team/editTeam";
    }

    @PostMapping("/update")
    public String updateTeam(TeamDto teamDto, HttpSession session, RedirectAttributes redirectAttributes, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        String response = null;


        try {
            response = teamService.updateTeam(teamDto, jwt);
            model.addAttribute("message", response);
            List<TeamDto> allTeam = teamService.getAllTeam(jwt);
            model.addAttribute("teams", allTeam);

        } catch (CustomException e2) {
            System.out.println(e2.getMessage());
            redirectAttributes.addAttribute("message", "Session/JWT Expired!" + e2.getMessage());
            return "redirect:/login";
        }

        catch (Exception e1) {
            System.out.println(e1.getMessage());
        }
        return "Team/addTeam";


    }

    @GetMapping("/delete/{id}")
    public String deleteTeam(@PathVariable("id") Long id, Model model, RedirectAttributes redirectAttributes, HttpSession session) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getCredentials();
        String jwt = null;
        if (principal instanceof String) {
            jwt = (String) principal;
        }
        System.out.println(jwt);

        String response = null;
        List<TeamDto> teamDtos = null;
        try {
            teamDtos = teamService.deleteTeam(id, jwt);

            if (teamDtos != null) {
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
            model.addAttribute("teams", teamService.getAllTeam(jwt));
            model.addAttribute("team", new TeamDto());
            return "Team/addTeam";

        }
        catch (Exception e1) {
            System.out.println(e1.getMessage());
        }

        model.addAttribute("teams", teamDtos);
        return "Team/addTeam";
    }
}
