package com.srmt.controller.leavemangement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.service.leavemanagement.LeaveEntitlementService;

@RestController
@RequestMapping("/leaveEntitlement")
public class LeaveEntitlementController {

	@Autowired
	private LeaveEntitlementService leaveEntitlementService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody LeaveEntitlement leaveEntitlement) {
		leaveEntitlementService.add(leaveEntitlement);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody LeaveEntitlement leaveEntitlement) throws Exception {
		leaveEntitlementService.update(id,leaveEntitlement);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<LeaveEntitlement> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return leaveEntitlementService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/empoyee/{employeeId}", method = RequestMethod.POST)
	public void addEmployeeLeaveEntitlement(
			@PathVariable("employeeId") Long employeeId,
			@RequestBody LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		leaveEntitlementService.addEmployeeLeaveEntitlement(employeeId,
				leaveEntitlement);
	}

	@RequestMapping(value = "/all", method = RequestMethod.POST)
	public void addAllEmployeeLeaveEntitlement(
			@RequestBody LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		leaveEntitlementService
				.addAllEmployeeLeaveEntitlement(leaveEntitlement);
	}

	@RequestMapping(value = "/location/{locationId}", method = RequestMethod.POST)
	public void addLocationLeaveEntitlement(
			@PathVariable("locationId") Long locationId,
			@RequestBody LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {

		leaveEntitlementService.addLocationLeaveEntitlement(locationId,
				leaveEntitlement);
	}

	@RequestMapping(value = "/department/{departmentId}", method = RequestMethod.POST)
	public void addDepartmentwise(
			@RequestParam("departmentId") Long departmentId,
			@RequestBody LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		leaveEntitlementService.addDepartmentwise(departmentId,
				leaveEntitlement);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<LeaveEntitlement> searchLeaveEntitlement(
			@RequestParam(name = "leavePeriodId", required = false) Long leavePeriodId,
			@RequestParam(name = "leaveTypeId", required = false) Long leaveTypeId,
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return leaveEntitlementService.searchLeaveEntitlement(leavePeriodId,
				leaveTypeId, employeeId, page, size);
	}

	@RequestMapping(value = "search/count", method = RequestMethod.GET)
	public int searchLeaveEntitlementCount(
			@RequestParam(name = "leavePeriodId", required = false) Long leavePeriodId,
			@RequestParam(name = "leaveTypeId", required = false) Long leaveTypeId,
			@RequestParam(name = "employeeId", required = false) Long employeeId) {

		return leaveEntitlementService.searchLeaveEntitlementCount(
				leavePeriodId, leaveTypeId, employeeId);

	}
	
	
}
