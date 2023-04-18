package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.WorkShift;
import com.srmt.model.hrms.administration.WorkShiftBreak;
import com.srmt.service.masters.WorkShiftBreakService;
import com.srmt.service.masters.WorkShiftService;

@RestController
@RequestMapping(value = "/WorkShift")
public class WorkShiftController {

	@Autowired
	private WorkShiftService workShiftService;

	@Autowired
	private WorkShiftBreakService workShiftBreakService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody WorkShift workShift) {
		workShiftService.add(workShift);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody WorkShift workShift) throws Exception {
		workShiftService.update(id, workShift);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		workShiftService.deleteById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<WorkShift> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return workShiftService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long count() {
		return workShiftService.count();
	}

	@RequestMapping(value = "/{id}/WorkShiftBreak", method = RequestMethod.POST)
	public void addWorkShiftBreak(@PathVariable("id") Long id,
			@RequestBody WorkShiftBreak workShiftBreak) {
		workShiftBreakService.addWorkShiftBreak(id, workShiftBreak);
	}

	@RequestMapping(value = "/{id}/workShiftBreak/{workShiftBreakId}", method = RequestMethod.PUT)
	public void updateWorkShiftBreak(@PathVariable("id") Long id,
			@PathVariable("workShiftBreakId") Long workShiftBreakId,
			@RequestBody WorkShiftBreak workShiftBreak) {
		workShiftBreak.setId(workShiftBreakId);
		workShiftBreakService.updateWorkShiftBreak(id, workShiftBreak);
	}

}
