package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.DisciplineAction;
import com.srmt.model.hrms.administration.DisciplineRule;
import com.srmt.service.masters.DisciplineActionService;
import com.srmt.service.masters.DisciplineRuleService;

@RestController
@RequestMapping(value = "/disciplineRule")
public class DisciplineRuleController {

	@Autowired
	private DisciplineRuleService disciplineRuleService;

	@Autowired
	private DisciplineActionService disciplineActionService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody DisciplineRule disciplineRule) {
		disciplineRuleService.add(disciplineRule);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody DisciplineRule disciplineRule) {
		disciplineRuleService.update(id, disciplineRule);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<DisciplineRule> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return disciplineRuleService.findAll(page, size);
	}
	
	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return disciplineRuleService.count();
	}

	@RequestMapping(value = "/{id}/disciplineAction", method = RequestMethod.POST)
	public void addAction(@PathVariable("id") Long ruleId,
			@RequestBody DisciplineAction disciplineAction) {
		disciplineActionService.addAction(ruleId, disciplineAction);
	}

	@RequestMapping(value = "/{ruleId}/disciplineAction/{actionId}", method = RequestMethod.PUT)
	public void updateAction(@PathVariable("ruleId") Long ruleId,
			@PathVariable("actionId") Long actionId,
			@RequestBody DisciplineAction disciplineAction) {
		disciplineAction.setId(actionId);
		disciplineActionService.updateAction(ruleId, disciplineAction);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DisciplineRule findById(@PathVariable("id") Long id) {
		return disciplineRuleService.findBy(DisciplineRule.class, id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		disciplineRuleService.deleteById(id);
	}
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<DisciplineRule> findAll() {
		return disciplineRuleService.findAll(); 
	}
}
