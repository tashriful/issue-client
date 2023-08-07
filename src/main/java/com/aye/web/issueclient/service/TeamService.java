package com.aye.web.issueclient.service;

import com.aye.issuetrackerdto.entityDto.TeamDto;

import java.io.IOException;
import java.util.List;

public interface TeamService {
    List<TeamDto> getAllTeam(String jwt) throws Exception;

    String saveTeam(TeamDto teamDto, String jwt) throws IOException;

    TeamDto getTeamById(Long id, String jwt) throws Exception;

    String updateTeam(TeamDto teamDto, String jwt) throws Exception;

    List<TeamDto> deleteTeam(Long id, String jwt) throws Exception;
}
