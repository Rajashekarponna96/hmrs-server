package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.LeaveType;

public interface LeaveTypeMasterService {

	void add(LeaveType leaveTypeMaster);

	void update(Long id, LeaveType leaveTypeMaster);

	void deleteById(Long id);

	LeaveType findById(Long id);

	List<LeaveType> findByPageAndSize(int page, int size);

	Long getCount();

	List<LeaveType> findAll();

}
