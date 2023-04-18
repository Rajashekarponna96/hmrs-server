package com.srmt.service.leavemanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.repository.hrms.employee.EmployeeRepository;
import com.srmt.repository.leavemanagement.LeaveEntitlementRepository;
import com.srmt.repository.specifications.LeaveEntitlementSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class LeaveEntitlementServiceImpl extends
		GenericServiceImpl<LeaveEntitlement, Long> implements
		LeaveEntitlementService {

	@Autowired
	private LeaveEntitlementRepository leaveEntitlementRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	public LeaveEntitlementServiceImpl() {
		super(LeaveEntitlement.class);
	}

	@Override
	public void add(LeaveEntitlement leaveEntitlement) {
		super.add(LeaveEntitlement.class, null, null, leaveEntitlement);

	}

	@Override
	public void update(Long id, LeaveEntitlement leaveEntitlement)
			throws Exception {
		LeaveEntitlement leaveEntitlementFromDb = leaveEntitlementRepository
				.findOne(id);
		if (leaveEntitlement.getDays() < leaveEntitlementFromDb.getDays()) {
			throw new RuntimeException(
					"Updated Entitlement Days Should be Greater than Before Entitlement Days i.e Greater Than#["
							+ leaveEntitlementFromDb.getDays()+ "]");
		}
		super.update(LeaveEntitlement.class, id, null, leaveEntitlement);
	}

	@Override
	public List<LeaveEntitlement> findLeaveEntitlementByEmployeeId(Long id,
			int page, int size) {
		return leaveEntitlementRepository
				.findByEmployee_IdAndLeavePeriod_Active(id, true,
						new PageRequest(page, size));
	}

	@Override
	public Long findCountByEmployeeId(Long id) {
		return leaveEntitlementRepository
				.countByEmployee_IdAndLeavePeriod_Active(id, true);
	}

	@Override
	public List<LeaveEntitlement> findByPageAndSize(int page, int size) {
		return leaveEntitlementRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

	@Override
	public void addEmployeeLeaveEntitlement(Long employeeId,
			LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		Employee employee = employeeRepository.findOne(employeeId);
		if (employee == null) {
			throw new RuntimeException("Employee Id#[" + employeeId
					+ "] does not exists.");
		}

		addEmployeeLeaveEntitlement(employee, leaveEntitlement);
	}

	@Override
	public void addAllEmployeeLeaveEntitlement(LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		List<Employee> employees = employeeRepository.findByActive(true);
		for (Employee employee : employees) {
			addEmployeeLeaveEntitlement(employee, leaveEntitlement);
		}
	}

	@Override
	public void addLocationLeaveEntitlement(Long locationId,
			LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		List<Employee> employees = employeeRepository.findbyLocationAndActive(
				locationId, true);
		for (Employee employee : employees) {
			addEmployeeLeaveEntitlement(employee, leaveEntitlement);
		}

	}

	@Override
	public void addDepartmentwise(Long departmentId,
			LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		List<Employee> employees = employeeRepository
				.findbyDepartmentAndActive(departmentId, true);
		for (Employee employee : employees) {
			addEmployeeLeaveEntitlement(employee, leaveEntitlement);
		}
	}

	@Override
	public List<LeaveEntitlement> searchLeaveEntitlement(Long leavePeriodId,
			Long leaveTypeId, Long employeeId, int page, int size) {

		Specification<LeaveEntitlement> specification = LeaveEntitlementSpecification
				.searchByLeavePeriodAndLeaveTypeAndEmployee(leavePeriodId,
						leaveTypeId, employeeId);
		return leaveEntitlementRepository.findAll(specification,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchLeaveEntitlementCount(Long leavePeriodId,
			Long leaveTypeId, Long employeeId) {
		Specification<LeaveEntitlement> specification = LeaveEntitlementSpecification
				.searchByLeavePeriodAndLeaveTypeAndEmployee(leavePeriodId,
						leaveTypeId, employeeId);
		return leaveEntitlementRepository.findAll(specification).size();
	}

	private void addEmployeeLeaveEntitlement(Employee employee,
			LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException {
		LeaveEntitlement entitlement = leaveEntitlementRepository
				.findByLeavePeriod_IdAndLeaveType_IdAndEmployee_Id(
						leaveEntitlement.getLeavePeriod().getId(),
						leaveEntitlement.getLeaveType().getId(),
						employee.getId());

		if (entitlement != null) {
			throw new RuntimeException("Duplicate Entry For LeaveEntitlement");
		} else {
			LeaveEntitlement clonedLeaveEntitlement = leaveEntitlement.clone();
			clonedLeaveEntitlement.setEmployee(employee);
			leaveEntitlementRepository.save(clonedLeaveEntitlement);
		}

	}

}
