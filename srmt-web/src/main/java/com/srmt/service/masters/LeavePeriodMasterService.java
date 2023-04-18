package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.LeavePeriod;

public interface LeavePeriodMasterService {

	void add(LeavePeriod leavePeriodMaster);

	void update(Long id, LeavePeriod leavePeriodMaster);

	void deleteById(Long id);

	List<LeavePeriod> findByPageAndSize(int page, int size);

	Long getCount();

	List<LeavePeriod> findAll();

}
