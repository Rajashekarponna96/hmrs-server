package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.LeaveType;
@Repository
public interface LeaveTypeRepository extends
		PagingAndSortingRepository<LeaveType, Long> {

	LeaveType findByCode(String code);

}
