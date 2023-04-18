package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.EmploymentType;

public interface EmployeeTypeMasterService {

	void add(EmploymentType employmentTypeMaster);

	void update(long id, EmploymentType employmentTypeMaster);

	EmploymentType findById(Long id);

	void deletebyId(long id);

	List<EmploymentType> findByPageAndSize(int page, int size);

	Long getCount();

	List<EmploymentType> getAllEmployeMentTypes();

}
