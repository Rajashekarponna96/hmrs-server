package com.srmt.service.masters;

import com.srmt.model.hrms.administration.WorkShiftBreak;
import com.srmt.service.GenericService;

public interface WorkShiftBreakService extends
		GenericService<WorkShiftBreak, Long> {

	void addWorkShiftBreak(Long id, WorkShiftBreak workShiftBreak);

	void updateWorkShiftBreak(Long id, WorkShiftBreak workShiftBreak);

}
