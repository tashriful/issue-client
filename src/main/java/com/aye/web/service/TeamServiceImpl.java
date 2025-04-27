package com.aye.web.service;

import com.aye.issuetrackerdto.entityDto.DepartmentDto;
import com.aye.issuetrackerdto.entityDto.TeamDto;
import com.aye.web.exception.CustomException;
import com.aye.web.exception.NotDeletableException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@Service

public class TeamServiceImpl implements TeamService{

    @Value("${myapp.base-url}")
    private String baseUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<TeamDto> getAllTeam(String jwt) throws Exception {

        String url = baseUrl + "/teams/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<DepartmentDto>> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<TeamDto>> response = restTemplate.exchange
                    (url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<TeamDto>>() {});

            if(response.getStatusCode() == HttpStatus.OK){
                return response.getBody();
            }
            else {
                return null;
            }


        }
        catch (HttpClientErrorException e1) {
            System.out.println(e1);
            if(e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new CustomException(e1.getMessage());
            }
            else {
                throw new Exception(e1.getMessage());
            }
        }
        catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }


    }

    @Override
    public String saveTeam(TeamDto teamDto, String jwt) throws IOException {
        String url = baseUrl + "/teams/submit";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TeamDto> httpEntity = new HttpEntity<>(teamDto, httpHeaders);

        try{
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
            System.out.println("test");
            if (response.getStatusCode() == HttpStatus.OK) {
                return "Team Successfully Created!";
            }
        }
        catch (HttpClientErrorException ex) {
            if (ex.getStatusCode() == HttpStatus.BAD_REQUEST) {
                String responseBody = ex.getResponseBodyAsString();
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(responseBody);
                String message = root.get("message").asText();
                return message;

            }
            if (ex.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                String responseBody = ex.getResponseBodyAsString();
                return responseBody;
            }
            if (ex.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) {
                String responseBody = ex.getResponseBodyAsString();
                return responseBody;
            }
        }
        catch (Exception e){
            return e.getMessage();
        }

        return null;
    }

    @Override
    public TeamDto getTeamById(Long id, String jwt) throws Exception {
        String url = baseUrl + "/teams/"+id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TeamDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<TeamDto> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, TeamDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println(e1);
                throw new CustomException(e1.getMessage());
            }
            else {
                throw new Exception(e1);
            }
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }

    @Override
    public String updateTeam(TeamDto teamDto, String jwt) throws Exception {
        String url = baseUrl + "/teams/"+teamDto.getId();

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TeamDto> httpEntity = new HttpEntity<>(teamDto, httpHeaders);

        ResponseEntity<TeamDto> response;
        try {
            response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, TeamDto.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return "Successfully updated!";
            } else {
                return null;
            }
        } catch (HttpClientErrorException ex) {
            if (ex.getStatusCode() == HttpStatus.BAD_REQUEST) {
                String responseBody = ex.getResponseBodyAsString();
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode root = objectMapper.readTree(responseBody);
                String message = root.get("message").asText();
                return message;

            }
            if(ex.getStatusCode() == HttpStatus.FORBIDDEN){
                System.out.println(ex);
                throw new CustomException(ex.getMessage());
            }
            else {
                System.out.println(ex);
                throw new Exception(ex.getMessage());
            }
        }catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }

    @Override
    public List<TeamDto> deleteTeam(Long id, String jwt) throws Exception {
        String url = baseUrl + "/teams/"+id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<DepartmentDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return this.getAllTeam(jwt);
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            if(e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println(e1);
                throw new CustomException(e1.getMessage());

            }
            else if(e1.getStatusCode() == HttpStatus.CONFLICT){
                throw new NotDeletableException("Cannot delete Team with associated entity");
            }
            else {
                throw new Exception(e1.getMessage());
            }
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }
}
