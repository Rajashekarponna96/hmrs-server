package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.JobCategory;
import com.srmt.repository.hrms.administration.JobCategoryRepository;

@Service
public class JobCategoryMasterServiceImpl implements JobCategoryMasterService {

	@Autowired
	private JobCategoryRepository jobCategoryMasterRepository;

	@Override
	public void add(JobCategory jobCategoryMaster) {
		JobCategory thisJobCategory = jobCategoryMasterRepository
				.findByName(jobCategoryMaster.getName());
		if (thisJobCategory != null) {
			throw new RuntimeException("Job category[ "
					+ jobCategoryMaster.getName() + " ] Already Exists.");
		}
		jobCategoryMasterRepository.save(jobCategoryMaster);
	}

	@Override
	public void update(Long id, JobCategory jobCategoryMaster) {

		JobCategory thisJobCategoryMaster = jobCategoryMasterRepository
				.findOne(id);
		if (thisJobCategoryMaster == null) {
			throw new RuntimeException("Job Category [" + id
					+ "] does not exists.");
		}
		thisJobCategoryMaster.setCode(jobCategoryMaster.getCode());
		thisJobCategoryMaster
				.setDescription(jobCategoryMaster.getDescription());
		thisJobCategoryMaster.setName(jobCategoryMaster.getName());
		jobCategoryMasterRepository.save(jobCategoryMaster);
	}

	@Override
	public void deleteById(Long id) {
		JobCategory thisJobCategoryMaster = jobCategoryMasterRepository
				.findOne(id);
		if (thisJobCategoryMaster == null) {
			throw new RuntimeException("Job Category [" + id
					+ "] does not exists.");
		}
		jobCategoryMasterRepository.delete(thisJobCategoryMaster);
	}

	@Override
	public List<JobCategory> findByPageAndSize(int page, int size) {
		return jobCategoryMasterRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

	@Override
	public JobCategory findById(Long id) {
		JobCategory thisJobCategoryMaster = jobCategoryMasterRepository
				.findOne(id);
		if (thisJobCategoryMaster == null) {
			throw new RuntimeException("Job Category [" + id
					+ "] does not exists.");
		}
		return thisJobCategoryMaster;
	}

	@Override
	public Long getCount() {
		return jobCategoryMasterRepository.count();
	}
}
