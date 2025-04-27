package com.aye.web.service;

import com.aye.issuetrackerdto.entityDto.DepartmentDto;

import java.io.IOException;
import java.util.List;

public interface DepartmentService {
    List<DepartmentDto> getAllDepartment(String jwt) throws Exception;

    String saveDepartment(DepartmentDto departmentDto, String jwt) throws IOException;

    DepartmentDto getDepartmentById(Long id, String jwt);

    String updateDepartment(DepartmentDto departmentDto, String jwt) throws IOException;

    List<DepartmentDto> deleteDepartment (Long id, String jwt);

//    List<DepartmentDto> getAllDepartments();

}
