package com.aye.web.issueclient.service;

import com.aye.issuetrackerdto.entityDto.UserDto;
import com.aye.web.issueclient.exception.CustomException;
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
public class UserServiceImpl implements UserService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${myapp.base-url}")
    private String baseUrl;

    @Override
    public List<UserDto> getAllUser(String jwt) throws Exception {
        String url = baseUrl + "/users/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<UserDto>> httpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<List<UserDto>> response = null;
        try {
            response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    httpEntity,
                    new ParameterizedTypeReference<List<UserDto>>() {
                    });

            List<UserDto> userList = null;


            if (response.getStatusCode() == HttpStatus.OK) {
                userList = response.getBody();
                return userList;
            } else {
                return null;
            }
        }
        catch (HttpClientErrorException e1) {
            System.out.println(e1);
            throw new CustomException(e1.getMessage());
        }
        catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }

    }


    @Override
    public String saveUser(UserDto userDto, String jwt) throws IOException {
        String url = baseUrl + "/users/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserDto> httpEntity = new HttpEntity<>(userDto, httpHeaders);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);
            System.out.println("test");
            if (response.getStatusCode() == HttpStatus.OK) {
                return "User Successfully Created!";
            }
        } catch (HttpClientErrorException ex) {
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
    public UserDto getUserById(Long id, String jwt) {
        String url = baseUrl + "/users/" + id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);


        HttpEntity<UserDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<UserDto> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, UserDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            throw new CustomException(e1.getMessage());
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }

    }

    @Override
    public String updateUser(UserDto userDto, String jwt) throws Exception {
        String url = baseUrl + "/users/update/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<UserDto> httpEntity = new HttpEntity<>(userDto, httpHeaders);

        ResponseEntity<UserDto> response;
        try {
            response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, UserDto.class);
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
            else {
                System.out.println(ex);
                throw new CustomException(ex.getMessage());
            }
        }catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }

    @Override
    public List<UserDto> deleteUser(Long id, String jwt) {

        String url = baseUrl + "/users/delete/" + id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<UserDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<?> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return this.getAllUser(jwt);
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            throw new CustomException(e1.getMessage());
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }

    }
}
