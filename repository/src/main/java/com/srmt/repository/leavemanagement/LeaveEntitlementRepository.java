package com.srmt.repository.leavemanagement;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;

@Repository
public interface LeaveEntitlementRepository extends
		PagingAndSortingRepository<LeaveEntitlement, Long>,
		JpaSpecificationExecutor<LeaveEntitlement> {

	List<LeaveEntitlement> findByEmployee_IdAndLeavePeriod_Active(Long id,
			boolean b, PageRequest pageRequest);

	Long countByEmployee_IdAndLeavePeriod_Active(Long id, boolean b);

	LeaveEntitlement findByLeavePeriod_IdAndLeaveType_IdAndEmployee_Id(Long id,
			Long id2, Long id3);

	List<LeaveEntitlement> findByLeavePeriod_IdAndEmployee_Id(Long leavePeriodId,
			Long employeeId);

	
}
