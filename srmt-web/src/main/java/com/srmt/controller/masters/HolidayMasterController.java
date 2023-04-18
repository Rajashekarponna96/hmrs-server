package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Holiday;
import com.srmt.service.masters.HolidayMasterService;

@RestController
@RequestMapping("/holidayMaster")
public class HolidayMasterController {

	@Autowired
	private HolidayMasterService holidayMasterService;

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deletById(@PathVariable("id") Long id) {
		holidayMasterService.deleteById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Holiday> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return holidayMasterService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return holidayMasterService.getCount();
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<Holiday> findByLeavePeriodAndState(
			@RequestParam(value = "periodid", required = false) Long periodid,
			@RequestParam(value = "stateId", required = false) Long stateId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return holidayMasterService.findByLeavePeriodAndState(periodid,
				stateId, page, size);

	}

	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int findByLeavePeriodAndStateCount(
			@RequestParam(value = "periodid", required = false) Long periodid,
			@RequestParam(value = "stateId", required = false) Long stateId) {
		return holidayMasterService.findByLeavePeriodAndStateCount(periodid,
				stateId);

	}
}
