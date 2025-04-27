package com.aye.web.service;

import com.aye.issuetrackerdto.entityDto.UserDto;

import java.io.IOException;
import java.util.List;

public interface UserService {
    String saveUser(UserDto userDto, String jwt) throws IOException;

    List<UserDto> getAllUser(String jwt) throws Exception;

    UserDto getUserById(Long id, String jwt);

    String updateUser(UserDto userDto, String jwt) throws Exception;

    List<UserDto> deleteUser(Long id, String jwt);
}
