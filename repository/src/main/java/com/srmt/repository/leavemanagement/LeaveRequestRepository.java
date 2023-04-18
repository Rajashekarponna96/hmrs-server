package com.srmt.repository.leavemanagement;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.leaveaManagement.LeaveRequest;

@Repository
public interface LeaveRequestRepository extends
		PagingAndSortingRepository<LeaveRequest, Long>,
		JpaSpecificationExecutor<LeaveRequest> {

	List<LeaveRequest> findByEmployee_Id(Long id, Pageable pageable);

	Long countByEmployee_Id(Long id);

}
