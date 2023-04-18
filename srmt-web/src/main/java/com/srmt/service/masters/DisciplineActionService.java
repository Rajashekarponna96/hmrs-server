package com.srmt.service.masters;

import com.srmt.model.hrms.administration.DisciplineAction;
import com.srmt.service.GenericService;

public interface DisciplineActionService extends
		GenericService<DisciplineAction, Long> {

	void add(DisciplineAction disciplineAction);

	void update(Long id, DisciplineAction disciplineAction) throws Exception;

	void addAction(Long ruleId, DisciplineAction disciplineAction);

	void updateAction(Long ruleId, DisciplineAction disciplineAction);

	void deleteById(Long id);
	
	Long getCount();


}
