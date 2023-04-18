package com.srmt.repository.hrms.employee;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.employee.Qualification;

@Repository
public interface QualificationRepository extends
		PagingAndSortingRepository<Qualification, Long> {

}
