package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.DisciplineRule;
import com.srmt.service.GenericService;

public interface DisciplineRuleService extends GenericService<DisciplineRule, Long> {
	
	void add(DisciplineRule disciplineRule);

	void update(Long id, DisciplineRule disciplineRule);

	void deleteById(Long id);
	
	Long getCount();
	
	List<DisciplineRule> findAll();
 
}
