package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Holiday;
import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.service.masters.HolidayMasterService;
import com.srmt.service.masters.LeavePeriodMasterService;

@RestController
@RequestMapping(value = "/leavePeriod")
public class LeavePeriodMasterController {

	@Autowired
	private LeavePeriodMasterService leavePeriodMasterService;

	@Autowired
	private HolidayMasterService holidayMasterService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody LeavePeriod leavePeriodMaster) {
		leavePeriodMasterService.add(leavePeriodMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody LeavePeriod leavePeriodMaster) {
		leavePeriodMasterService.update(id, leavePeriodMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		leavePeriodMasterService.deleteById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<LeavePeriod> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return leavePeriodMasterService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return leavePeriodMasterService.getCount();
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<LeavePeriod> findAll() {
		return leavePeriodMasterService.findAll();
	}
	
	

}
