package com.srmt.service.masters;

import com.srmt.model.hrms.administration.WorkShift;
import com.srmt.service.GenericService;

public interface WorkShiftService extends GenericService<WorkShift, Long> {

	void add(WorkShift workShift);

	void update(Long id, WorkShift workShift) throws Exception;

	void deleteById(Long id);

}
