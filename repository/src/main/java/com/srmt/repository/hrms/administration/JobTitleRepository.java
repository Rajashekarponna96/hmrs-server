package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.JobTitle;

@Repository
public interface JobTitleRepository extends
		PagingAndSortingRepository<JobTitle, Long> {

	JobTitle findByCode(String code);

}
