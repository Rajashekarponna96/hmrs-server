package com.srmt.service.masters;

import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.DisciplineAction;
import com.srmt.model.hrms.administration.DisciplineRule;
import com.srmt.service.GenericServiceImpl;

@Service
public class DisciplineActionServiceImpl extends
		GenericServiceImpl<DisciplineAction, Long> implements
		DisciplineActionService {

	public DisciplineActionServiceImpl() {
		super(DisciplineAction.class);
	}

	@Override
	public void add(DisciplineAction disciplineAction) {
		super.add(
				DisciplineAction.class,
				disciplineAction.getCode(),
				genericSpecification.findByProperty("code",
						disciplineAction.getCode()), disciplineAction);
	}

	@Override
	public void update(Long id, DisciplineAction disciplineAction)
			throws Exception {
		super.update(
				DisciplineAction.class,
				id,
				genericSpecification.findByProperty("code",
						disciplineAction.getCode()), disciplineAction);

	}

	@Override
	public void addAction(Long ruleId, DisciplineAction disciplineAction) {
		super.add(
				DisciplineRule.class,
				ruleId,
				disciplineAction,
				genericSpecification.findByProperty("code",
						disciplineAction.getCode()));

	}

	@Override
	public void updateAction(Long ruleId, DisciplineAction disciplineAction) {
		super.add(
				DisciplineRule.class,
				ruleId,
				disciplineAction,
				genericSpecification.findByProperty("code",
						disciplineAction.getCode()));

	}

	@Override
	public void deleteById(Long id) {
		super.delete(id);
	}

	@Override
	public Long getCount() {
		return super.count();
	}

}
