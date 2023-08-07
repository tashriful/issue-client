package com.aye.web.issueclient.service;

import com.aye.issuetrackerdto.entityDto.TicketDto;
import com.aye.issuetrackerdto.entityDto.TicketHistoryDto;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface TicketService {
    List<TicketDto> getAllTicket(String jwt) throws Exception;

    String saveTicket(TicketDto ticketDto, String jwt) throws IOException;

    TicketDto getTicketById(Long id, String jwt) throws Exception;

    ResponseEntity<byte[]> downloadTicketImage(String id, String jwt) throws Exception;

    List<TicketDto> getTicketsByCreatedBy(String jwt) throws Exception;

    List<TicketDto> getTicketsByAssignedTo(String jwt) throws Exception;

    String updateTicket(TicketDto ticketDto, String jwt);

    String updateAssignedTicket(TicketDto ticketDto, String jwt) throws Exception;

    List<TicketDto> getAllTicketsByDepartment(String jwt) throws Exception;

    String updateDepartmentTicket(TicketDto ticketDto, String jwt) throws Exception;

    List<TicketHistoryDto> getTicketHistoryByTicket(Long id, String jwt) throws Exception;
}
