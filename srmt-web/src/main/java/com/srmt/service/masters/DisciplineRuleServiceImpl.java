package com.srmt.service.masters;

import java.util.List;

import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.DisciplineAction;
import com.srmt.model.hrms.administration.DisciplineRule;
import com.srmt.service.GenericServiceImpl;

@Service
public class DisciplineRuleServiceImpl extends
		GenericServiceImpl<DisciplineRule, Long> implements
		DisciplineRuleService {

	public DisciplineRuleServiceImpl() {
		super(DisciplineRule.class);
	}

	@Override
	public void add(DisciplineRule disciplineRule) {
		for (DisciplineAction disciplineAction : disciplineRule
				.getDisciplineActions()) {
			disciplineAction.setDisciplineRule(disciplineRule);
		}

		super.add(
				DisciplineRule.class,
				disciplineRule.getCode(),
				genericSpecification.findByProperty("code",
						disciplineRule.getCode()), disciplineRule);
	}

	@Override
	public void update(Long id, DisciplineRule disciplineRule) {
		for (DisciplineAction disciplineAction : disciplineRule
				.getDisciplineActions()) {
			disciplineAction.setDisciplineRule(disciplineRule);
		}
		baseRepository.save(disciplineRule);
		/*super.update(
				DisciplineRule.class,
				id,
				genericSpecification.findByProperty("code",
						disciplineRule.getCode()), disciplineRule);*/
	}

	@Override
	public void deleteById(Long id) {
		super.delete(id);
	}

	@Override
	public Long getCount() {
		return super.count();
	}

	@Override
	public List<DisciplineRule> findAll() {
		return baseRepository.findAll();
	}

}
