package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.EducationLevel;

@Repository
public interface EducationLevelRepository extends 
PagingAndSortingRepository<EducationLevel, Long>  {

	EducationLevel findByCode(String code);

	
}
