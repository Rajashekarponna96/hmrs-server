package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.EmploymentType;

@Repository
public interface EmplopyeeTypeRepository extends
		PagingAndSortingRepository<EmploymentType, Long> {

	EmploymentType findByCode(String code);

}
