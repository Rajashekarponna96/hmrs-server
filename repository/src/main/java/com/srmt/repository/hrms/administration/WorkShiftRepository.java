package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.srmt.model.hrms.administration.WorkShift;

public interface WorkShiftRepository extends
		PagingAndSortingRepository<WorkShift, Long> {

}
