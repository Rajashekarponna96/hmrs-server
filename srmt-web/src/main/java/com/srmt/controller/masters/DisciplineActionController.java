package com.srmt.controller.masters;

import java.util.List;

import javax.annotation.RegEx;

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

@RestController
@RequestMapping(value = "/disciplineAction")
public class DisciplineActionController {

	@Autowired
	private DisciplineActionService disciplineActionService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody DisciplineAction disciplineAction) {
		disciplineActionService.add(disciplineAction);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody DisciplineAction disciplineAction) throws Exception {
		disciplineActionService.update(id, disciplineAction);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<DisciplineAction> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return disciplineActionService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return disciplineActionService.count();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DisciplineAction findById(@PathVariable("id") Long id) {
		return disciplineActionService.findBy(DisciplineAction.class, id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		disciplineActionService.deleteById(id);
	}
	
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<DisciplineAction> findAll() {
		return disciplineActionService.findAll();
	}

}
