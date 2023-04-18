package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.JobTitle;
import com.srmt.repository.hrms.administration.JobTitleRepository;

@Service
public class JobTitleServiceImpl implements JobTitelService {

	@Autowired
	private JobTitleRepository jobTitleMasterRepository;

	@Override
	public void add(JobTitle jobTitleMaster) {
		JobTitle thisJobTitleMaster = jobTitleMasterRepository
				.findByCode(jobTitleMaster.getCode());
		if (thisJobTitleMaster != null) {
			throw new RuntimeException("Job Title Master ["
					+ jobTitleMaster.getCode() + "] code is alreay exists");
		}
		jobTitleMasterRepository.save(jobTitleMaster);
	}

	@Override
	public void update(Long id, JobTitle jobTitleMaster) {

		JobTitle jobTitleMasterById = jobTitleMasterRepository
				.findOne(id);
		if (jobTitleMasterById == null) {
			throw new RuntimeException("job Title [" + id
					+ "] does not exists.");
		}

		JobTitle jobTitleMasterByCode = jobTitleMasterRepository
				.findByCode(jobTitleMaster.getCode());

		if (jobTitleMasterByCode.getId() != jobTitleMasterById.getId()) {
			throw new RuntimeException("Job Title Master ["
					+ jobTitleMaster.getCode() + "] code is alreay exists");
		}
		jobTitleMasterById.setCode(jobTitleMaster.getCode());
		jobTitleMasterById.setDescription(jobTitleMaster.getDescription());
		jobTitleMasterById.setTitle(jobTitleMaster.getTitle());
		jobTitleMasterRepository.save(jobTitleMasterById);

	}

	@Override
	public void deleteById(Long id) {
		JobTitle jobTitleMasterById = jobTitleMasterRepository
				.findOne(id);
		if (jobTitleMasterById == null) {
			throw new RuntimeException("job Title [" + id
					+ "] does not exists.");
		}
		jobTitleMasterRepository.delete(jobTitleMasterById);
	}

	@Override
	public JobTitle findById(Long id) {
		JobTitle jobTitleMasterById = jobTitleMasterRepository
				.findOne(id);
		if (jobTitleMasterById == null) {
			throw new RuntimeException("job Title [" + id
					+ "] does not exists.");
		}
		return jobTitleMasterById;
	}

	@Override
	public List<JobTitle> findByPageAndSize(int page, int size) {
		return jobTitleMasterRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

	@Override
	public Long getCount() {
		return jobTitleMasterRepository.count();
	}
}
