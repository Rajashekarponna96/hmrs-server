package com.srmt.repository.hrms.employee;

import java.time.LocalDate;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.Department;
import com.srmt.model.hrms.administration.Holiday;
import com.srmt.model.hrms.employee.LanguageProficiency;

@Repository
public interface LanguageProficiencyRepository extends
		PagingAndSortingRepository<LanguageProficiency, Long> {
	
	LanguageProficiency findByEmployee_IdAndLanguage_Name(Long id,String name);
	//public Department findByIdAndLocation_Id(Long deptId, Long id);

}
