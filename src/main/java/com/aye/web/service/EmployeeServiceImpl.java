package com.aye.web.service;

import com.aye.issuetrackerdto.entityDto.DepartmentDto;
import com.aye.issuetrackerdto.entityDto.EmployeeDto;
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
public class EmployeeServiceImpl implements EmployeeService{

    @Value("${myapp.base-url}")
    private String baseUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<EmployeeDto> getAllEmployee(String jwt) throws Exception {
        String url = baseUrl + "/employees/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<EmployeeDto>> httpEntity = new HttpEntity<>(httpHeaders);
        try{
            ResponseEntity<List<EmployeeDto>> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<EmployeeDto>>() {});
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
    public String saveEmployee(EmployeeDto employeeDto, String jwt) throws IOException {
        String url = baseUrl + "/employees/submit";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmployeeDto> httpEntity = new HttpEntity<>(employeeDto, httpHeaders);

        try{
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
            System.out.println("test");
            if (response.getStatusCode() == HttpStatus.OK) {
                return "Employee has Successfully Created!";
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
    public EmployeeDto getEmployeeById(Long id, String jwt) throws Exception {
        String url = baseUrl + "/employees/"+id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmployeeDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<EmployeeDto> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, EmployeeDto.class);

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
    public String updateEmployee(EmployeeDto employeeDto, String jwt) throws Exception {
        String url = baseUrl + "/employees/"+employeeDto.getId();

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmployeeDto> httpEntity = new HttpEntity<>(employeeDto, httpHeaders);

        ResponseEntity<EmployeeDto> response;
        try {
            response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, EmployeeDto.class);
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
    public List<EmployeeDto> deleteEmployee(Long id, String jwt) throws Exception {
        String url = baseUrl + "/employees/"+id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<DepartmentDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return this.getAllEmployee(jwt);
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            if(e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println(e1);
                throw new CustomException(e1.getMessage());
            }
            else if (e1.getStatusCode() == HttpStatus.CONFLICT) {
                System.out.println(e1.getMessage());
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

    @Override
    public List<EmployeeDto> getEmployeesByDept(Long id, String jwt) throws Exception {
        String url = baseUrl + "/employees/department/"+id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmployeeDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<EmployeeDto>> response =
                    restTemplate.exchange(url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<EmployeeDto>>() {});

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
    public EmployeeDto getEmployeeByUserName(String username, String jwt) throws Exception {
        String url = baseUrl + "/employees/username/"+username;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmployeeDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<EmployeeDto> response =
                    restTemplate.exchange(url, HttpMethod.GET, httpEntity, EmployeeDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println(e1);
                throw new CustomException(e1.getMessage());
            } else if (e1.getStatusCode() == HttpStatus.CONFLICT) {
                System.out.println(e1.getMessage());
                throw new NotDeletableException("Cannot delete Team with associated entity");
            } else {
                throw new Exception(e1);
            }
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }
}
