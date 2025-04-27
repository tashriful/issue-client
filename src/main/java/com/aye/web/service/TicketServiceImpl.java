package com.aye.web.service;

import com.aye.issuetrackerdto.entityDto.TicketDto;
import com.aye.issuetrackerdto.entityDto.TicketHistoryDto;
import com.aye.web.exception.CustomException;
import com.aye.web.exception.ResourceNotFoundException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Value("${myapp.base-url}")
    private String baseUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public List<TicketDto> getAllTicket(String jwt) throws Exception {
        String url = baseUrl + "/tickets/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<TicketDto>> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<TicketDto>> response = restTemplate.exchange
                    (url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<TicketDto>>() {
                    });

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1.getMessage());
            }
        } catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }
    }

    @Override
    public List<TicketHistoryDto> getTicketHistoryByTicket(Long id, String jwt) throws Exception {
        String url = baseUrl + "/ticketHistory/ticket/"+id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<TicketHistoryDto>> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<TicketHistoryDto>> response = restTemplate.exchange
                    (url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<TicketHistoryDto>>() {
                    });

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1.getMessage());
            }
        } catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }
    }

    @Override
    public List<TicketDto> getTicketsByCreatedBy(String jwt) throws Exception {
        String url = baseUrl + "/tickets/createdBy";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<TicketDto>> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<TicketDto>> response = restTemplate.exchange
                    (url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<TicketDto>>() {
                    });

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1.getMessage());
            }
        }
        catch (ResourceNotFoundException e){
            return new ArrayList<>();
        }
        catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }
    }

    @Override
    public List<TicketDto> getTicketsByAssignedTo(String jwt) throws Exception {
        String url = baseUrl + "/tickets/assignedTo";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<TicketDto>> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<TicketDto>> response = restTemplate.exchange
                    (url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<TicketDto>>() {
                    });

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1.getMessage());
            }
        } catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }
    }

    @Override
    public String saveTicket(TicketDto ticketDto, String jwt) throws IOException {
        try {
            validateInput(ticketDto);
        } catch (Exception e) {
            System.out.println(e);
        }

        String url = baseUrl + "/tickets/submit";

        System.out.println(ticketDto.getTargetResolutionDate());

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> formData = new LinkedMultiValueMap<>();

        formData.add("summary", ticketDto.getSummary());
        formData.add("description", ticketDto.getDescription());
        formData.add("departmentId", ticketDto.getDepartmentId());
        formData.add("assignedToUser", ticketDto.getAssignedToUser());
        if (ticketDto.getTeamId() != null) {
            formData.add("teamId", ticketDto.getTeamId());
        }
        formData.add("ticketType", ticketDto.getTicketType());
        formData.add("priority", ticketDto.getPriority());
        formData.add("status", ticketDto.getStatus());
        formData.add("targetResolutionDate", ticketDto.getTargetResolutionDate().toString());

        if (ticketDto.getFile() != null && !ticketDto.getFile().isEmpty()) {
            Resource fileResource = ticketDto.getFile().getResource();
            formData.add("file", fileResource);
        }




        HttpEntity<MultiValueMap<String, Object>> httpEntity = new HttpEntity<>(formData, httpHeaders);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return "Ticket Successfully Created!";
            } else {
                System.out.println(response.getBody());
                return response.getBody();
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
        } catch (Exception e) {
            System.out.println(e);
            return e.getMessage();
        }

        return null;
    }

    private void validateInput(TicketDto ticketDto) {


    }

    @Override
    public TicketDto getTicketById(Long id, String jwt) throws Exception {
        String url = baseUrl + "/tickets/" + id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TicketDto> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<TicketDto> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, TicketDto.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println(e1);
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1);
            }
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }

    @Override
    public ResponseEntity<byte[]> downloadTicketImage(String id, String jwt) throws Exception {
        String url = baseUrl + "/tickets/download/" + id;

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<byte[]> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, byte[].class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return response;
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                System.out.println(e1);
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1);
            }
        } catch (Exception e2) {
            System.out.println(e2);
            return null;
        }
    }

    @Override
    public String updateTicket(TicketDto ticketDto, String jwt) {
        return null;
    }

    @Override
    public String updateAssignedTicket(TicketDto ticketDto, String jwt) throws Exception {
        String url = baseUrl + "/tickets/updateTicket/"+ticketDto.getId();

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TicketDto> httpEntity = new HttpEntity<>(ticketDto, httpHeaders);

        ResponseEntity<TicketDto> response;
        try {
            response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, TicketDto.class);
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
    public String updateDepartmentTicket(TicketDto ticketDto, String jwt) throws Exception {
        String url = baseUrl + "/tickets/updateTicket/"+ticketDto.getId();

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<TicketDto> httpEntity = new HttpEntity<>(ticketDto, httpHeaders);

        ResponseEntity<TicketDto> response;
        try {
            response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, TicketDto.class);
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
    public List<TicketDto> getAllTicketsByDepartment(String jwt) throws Exception {


        String url = baseUrl + "/tickets/department/";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Authorization", "Bearer " + jwt);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<TicketDto>> httpEntity = new HttpEntity<>(httpHeaders);

        try {
            ResponseEntity<List<TicketDto>> response = restTemplate.exchange
                    (url, HttpMethod.GET, httpEntity, new ParameterizedTypeReference<List<TicketDto>>() {
                    });

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException e1) {
            System.out.println(e1);
            if (e1.getStatusCode() == HttpStatus.FORBIDDEN) {
                throw new CustomException(e1.getMessage());
            } else {
                throw new Exception(e1.getMessage());
            }
        } catch (Exception e2) {
            System.out.println(e2);
            throw new Exception(e2.getMessage());
        }
    }
}
