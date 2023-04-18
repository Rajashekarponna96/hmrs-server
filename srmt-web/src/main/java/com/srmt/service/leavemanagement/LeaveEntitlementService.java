package com.srmt.service.leavemanagement;

import java.util.List;

import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.service.GenericService;

public interface LeaveEntitlementService extends
		GenericService<LeaveEntitlement, Long> {

	void add(LeaveEntitlement leaveEntitlement);

	void update(Long id, LeaveEntitlement leaveEntitlement) throws Exception;

	List<LeaveEntitlement> findLeaveEntitlementByEmployeeId(Long id, int page,
			int size);

	Long findCountByEmployeeId(Long id);

	List<LeaveEntitlement> findByPageAndSize(int page, int size);

	public void addEmployeeLeaveEntitlement(Long employeeId,
			LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException;

	public void addAllEmployeeLeaveEntitlement(LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException;

	void addLocationLeaveEntitlement(Long locationId,
			LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException;

	void addDepartmentwise(Long departmentId, LeaveEntitlement leaveEntitlement)
			throws CloneNotSupportedException;

	List<LeaveEntitlement> searchLeaveEntitlement(Long leavePeriodId,
			Long leaveTypeId, Long employeeId, int page, int size);

	int searchLeaveEntitlementCount(Long leavePeriodId, Long leaveTypeId,
			Long employeeId);

	
}
