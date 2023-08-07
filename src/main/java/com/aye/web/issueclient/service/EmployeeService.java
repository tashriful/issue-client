package com.aye.web.issueclient.service;

import com.aye.issuetrackerdto.entityDto.EmployeeDto;

import java.io.IOException;
import java.util.List;

public interface EmployeeService {
    List<EmployeeDto> getAllEmployee(String jwt) throws Exception;

    String saveEmployee(EmployeeDto employeeDto, String jwt) throws IOException;

    EmployeeDto getEmployeeById(Long id, String jwt) throws Exception;

    String updateEmployee(EmployeeDto employeeDto, String jwt) throws Exception;

    List<EmployeeDto> deleteEmployee(Long id, String jwt) throws Exception;

    List<EmployeeDto> getEmployeesByDept(Long id, String jwt) throws Exception;

    EmployeeDto getEmployeeByUserName(String username, String jwt) throws Exception;
}
