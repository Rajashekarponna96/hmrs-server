package com.srmt.repository.hrms.employee;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.employee.Dependent;

@Repository
public interface DependentRepository extends
		PagingAndSortingRepository<Dependent, Long> {

}
