package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.srmt.model.hrms.administration.Designation;

public interface DesignationRepository extends
		PagingAndSortingRepository<Designation, Long> {

}
