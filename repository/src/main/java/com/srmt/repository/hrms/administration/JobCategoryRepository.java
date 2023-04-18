package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.JobCategory;

@Repository
public interface JobCategoryRepository extends
		PagingAndSortingRepository<JobCategory, Long> {

	JobCategory findByName(String name);

}
