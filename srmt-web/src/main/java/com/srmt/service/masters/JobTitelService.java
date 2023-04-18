package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.JobTitle;

public interface JobTitelService {

	void add(JobTitle jobTitleMaster);

	void update(Long id, JobTitle jobTitleMaster);

	void deleteById(Long id);

	JobTitle findById(Long id);

	List<JobTitle> findByPageAndSize(int page, int size);

	Long getCount();

}
