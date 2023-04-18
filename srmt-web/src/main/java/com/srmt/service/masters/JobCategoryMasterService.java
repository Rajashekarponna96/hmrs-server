package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.JobCategory;

public interface JobCategoryMasterService {

	void add(JobCategory jobCategoryMaster);

	void update(Long id, JobCategory jobCategoryMaster);

	void deleteById(Long id);

	List<JobCategory> findByPageAndSize(int page, int size);

	JobCategory findById(Long id);

	Long getCount();

}
