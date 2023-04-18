package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.EducationLevel;

public interface EducationLevelMasterService {

	void add(EducationLevel educationLevelMaster);

	void update(Long id, EducationLevel educationLevelMaster);

	void deleteById(Long id);

	EducationLevel findById(Long id);

	List<EducationLevel> findByPageAndSize(int page, int size);

	Long getCount();

}
