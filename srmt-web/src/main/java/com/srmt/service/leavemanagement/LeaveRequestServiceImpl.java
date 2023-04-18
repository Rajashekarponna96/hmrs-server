package com.srmt.service.leavemanagement;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.model.hrms.leaveaManagement.LeaveRequest;
import com.srmt.model.hrms.leaveaManagement.LeaveRequestStatus;
import com.srmt.repository.hrms.employee.EmployeeRepository;
import com.srmt.repository.leavemanagement.LeaveEntitlementRepository;
import com.srmt.repository.leavemanagement.LeaveRequestRepository;
import com.srmt.repository.specifications.LeaveRequestSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class LeaveRequestServiceImpl extends
		GenericServiceImpl<LeaveRequest, Long> implements LeaveRequestService {

	@Autowired
	private LeaveRequestRepository leaveRequestRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private LeaveEntitlementRepository leaveEntitlementRepository;

	public LeaveRequestServiceImpl() {
		super(LeaveRequest.class);
	}

	@Override
	public void apply(LeaveRequest leaveRequest) {
		super.add(LeaveRequest.class, null, null, leaveRequest);

	}

	@Override
	public void approve(LeaveRequest leaveRequest) {
		if (leaveRequest.getStatus().equals(LeaveRequestStatus.Approved)) {
			LeaveEntitlement leaveEntitlement = leaveEntitlementRepository
					.findOne(leaveRequest.getLeaveEntitlement().getId());

			leaveEntitlement.adjustLeave(leaveRequest.getDays());
			leaveEntitlementRepository.save(leaveEntitlement);
		}
		leaveRequest.setRespondedOn(LocalDateTime.now());
		baseRepository.save(leaveRequest);
	}

	@Override
	public List<LeaveRequest> findByEmployeeId(Long id, int page, int size) {
		return leaveRequestRepository.findByEmployee_Id(id, new PageRequest(
				page, size));
	}

	@Override
	public Long findCountByEmplyeeId(Long id) {
		return leaveRequestRepository.countByEmployee_Id(id);
	}

	@Override
	public List<LeaveRequest> getAll() {

		
		return (List<LeaveRequest>) leaveRequestRepository.findAll(new Sort(
				Direction.DESC, "appliedOn"));

	}

	@Override
	public List<LeaveRequest> searchByEmployeeId(Long employeeId, int page,
			int size) {
		Specification<LeaveRequest> specfication = LeaveRequestSpecification
				.searchByEmployeeId(employeeId);
		return leaveRequestRepository.findAll(specfication,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchLeaveRequestByEmployeeCount(Long employeeId) {
		Specification<LeaveRequest> specfication = LeaveRequestSpecification
				.searchByEmployeeId(employeeId);
		return leaveRequestRepository.findAll(specfication).size();
	}

	@Override
	public void cancelReLeaveRequest(Long id) {
		LeaveRequest leaveRequest = leaveRequestRepository.findOne(id);
		leaveRequest.setStatus(LeaveRequestStatus.Cancel);
		leaveRequestRepository.save(leaveRequest);

	}

	@Override
	public List<LeaveRequest> searchLeaveRequestByReporties(Long superiorId,
			Long employeeId, int page, int size) {

		Specification<LeaveRequest> specfication = LeaveRequestSpecification
				.searchReportiesAttendanceByEmployeeId(superiorId, employeeId);
		return leaveRequestRepository.findAll(specfication,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchLeaveRequestByReportiesCount(Long superiorId,
			Long employeeId) {
		Specification<LeaveRequest> specfication = LeaveRequestSpecification
				.searchReportiesAttendanceByEmployeeId(superiorId, employeeId);
		return leaveRequestRepository.findAll(specfication).size();
	}

	@Override
	public List<LeaveRequest> getLeaveRequests(int page, int size) {
		return leaveRequestRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

}
