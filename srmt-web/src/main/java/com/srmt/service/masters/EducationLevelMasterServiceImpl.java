package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.EducationLevel;
import com.srmt.repository.hrms.administration.EducationLevelRepository;

@Service
public class EducationLevelMasterServiceImpl implements
		EducationLevelMasterService {

	@Autowired
	private EducationLevelRepository educationLevelMasterRepository;

	@Override
	public void add(EducationLevel educationLevelMaster) {
		EducationLevel thisEduactionLevelMaster = educationLevelMasterRepository
				.findByCode(educationLevelMaster.getCode());

		if (thisEduactionLevelMaster != null) {
			throw new RuntimeException("Education Level Master ["
					+ thisEduactionLevelMaster.getCode() + "] already exists.");
		}
		educationLevelMasterRepository.save(educationLevelMaster);
	}

	@Override
	public void update(Long id, EducationLevel educationLevelMaster) {
		EducationLevel thislevelMaster = educationLevelMasterRepository
				.findOne(id);
		if (thislevelMaster == null) {
			throw new RuntimeException("Education Level Master [" + id
					+ "] does not exists.");
		}
		thislevelMaster.setCode(educationLevelMaster.getCode());
		thislevelMaster.setName(educationLevelMaster.getName());
		thislevelMaster.setSpecialization(educationLevelMaster.getSpecialization());
		educationLevelMasterRepository.save(thislevelMaster);
	}

	@Override
	public void deleteById(Long id) {
		EducationLevel thislevelMaster = educationLevelMasterRepository
				.findOne(id);
		if (thislevelMaster == null) {
			throw new RuntimeException("Education Level Master [" + id
					+ "] does not exists.");
		}
		educationLevelMasterRepository.delete(thislevelMaster);
	}

	@Override
	public EducationLevel findById(Long id) {
		EducationLevel thislevelMaster = educationLevelMasterRepository
				.findOne(id);
		if (thislevelMaster == null) {
			throw new RuntimeException("Education Level Master [" + id
					+ "] does not exists.");
		}
		return thislevelMaster;
	}

	@Override
	public List<EducationLevel> findByPageAndSize(int page, int size) {
		return educationLevelMasterRepository.findAll(
				new PageRequest(page, size)).getContent();
	}

	@Override
	public Long getCount() {
		return educationLevelMasterRepository.count();
	}

}
