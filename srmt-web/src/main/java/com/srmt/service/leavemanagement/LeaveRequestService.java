package com.srmt.service.leavemanagement;

import java.time.LocalDate;
import java.util.List;

import com.srmt.model.hrms.leaveaManagement.LeaveRequest;
import com.srmt.service.GenericService;

public interface LeaveRequestService extends GenericService<LeaveRequest, Long> {

	void apply(LeaveRequest leaveRequest);

	void approve(LeaveRequest leaveRequest);

	List<LeaveRequest> findByEmployeeId(Long id, int page, int size);

	Long findCountByEmplyeeId(Long id);

	List<LeaveRequest> getAll();

	List<LeaveRequest> searchByEmployeeId(Long employeeId, int page, int size);

	int searchLeaveRequestByEmployeeCount(Long employeeId);

	void cancelReLeaveRequest(Long id);

	List<LeaveRequest> searchLeaveRequestByReporties(Long superiorId,
			Long employeeId, int page, int size);

	int searchLeaveRequestByReportiesCount(Long superiorId, Long employeeId);

	List<LeaveRequest> getLeaveRequests(int page, int size);
}
