package com.srmt.controller.leavemangement;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.leaveaManagement.LeaveRequest;
import com.srmt.service.leavemanagement.LeaveRequestService;

@RestController
@RequestMapping(value = "/leaveRequest")
public class LeaveRequestController {

	@Autowired
	private LeaveRequestService leaveRequestService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void apply(@RequestBody LeaveRequest leaveRequest) {
		leaveRequestService.apply(leaveRequest);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void approve(@PathVariable("id") Long id,
			@RequestBody LeaveRequest leaveRequest) {
		leaveRequest.setId(id);
		leaveRequestService.approve(leaveRequest);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<LeaveRequest> getAll() {
		return leaveRequestService.getAll();
	}

	@RequestMapping(value = "/{id}/cancel", method = RequestMethod.PUT)
	public void cancelReLeaveRequest(@PathVariable("id") Long id) {
		leaveRequestService.cancelReLeaveRequest(id);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<LeaveRequest> searchLeaveRequestByEmployeeId(
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return leaveRequestService.searchByEmployeeId(employeeId, page, size);
	}

	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchLeaveRequestByEmployeeCount(
			@RequestParam(name = "employeeId", required = false) Long employeeId) {
		return leaveRequestService
				.searchLeaveRequestByEmployeeCount(employeeId);
	}

	@RequestMapping(value = "/search/reporties/{superiorId}", method = RequestMethod.GET)
	public List<LeaveRequest> searchLeaveRequestByReporties(
			@PathVariable("superiorId") Long superiorId,
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return leaveRequestService.searchLeaveRequestByReporties(superiorId,
				employeeId, page, size);

	}

	@RequestMapping(value = "/search/count/reporties/{superiorId}", method = RequestMethod.GET)
	public int searchLeaveRequestByReportiesCount(
			@PathVariable("superiorId") Long superiorId,
			@RequestParam(name = "employeeId", required = false) Long employeeId) {
		return leaveRequestService.searchLeaveRequestByReportiesCount(
				superiorId, employeeId);

	}
	
	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<LeaveRequest> getLeaveRequests(@RequestParam("page") int page,@RequestParam("size") int size) {
		return leaveRequestService.getLeaveRequests(page,size);
	}

}
