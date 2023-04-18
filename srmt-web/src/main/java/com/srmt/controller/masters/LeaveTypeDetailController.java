package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.LeaveType;
import com.srmt.service.masters.LeaveTypeMasterService;

@RestController
@RequestMapping("/leaveType")
public class LeaveTypeDetailController {

	@Autowired
	private LeaveTypeMasterService leaveTypeMasterService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody LeaveType leaveTypeMaster) {
		leaveTypeMasterService.add(leaveTypeMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody LeaveType leaveTypeMaster) {
		leaveTypeMasterService.update(id, leaveTypeMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		leaveTypeMasterService.deleteById(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public LeaveType findById(@PathVariable("id") Long id) {
		return leaveTypeMasterService.findById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<LeaveType> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return leaveTypeMasterService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return leaveTypeMasterService.getCount();
	}
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<LeaveType> findAll() {
		return leaveTypeMasterService.findAll();
	}
}
