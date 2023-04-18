package com.srmt.service.masters;

import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.WorkShift;
import com.srmt.model.hrms.administration.WorkShiftBreak;
import com.srmt.service.GenericServiceImpl;

@Service
public class WorkShiftServiceImpl extends GenericServiceImpl<WorkShift, Long>
		implements WorkShiftService {

	public WorkShiftServiceImpl() {
		super(WorkShift.class);
	}

	@Override
	public void add(WorkShift workShift) {
		for (WorkShiftBreak workShiftBreak : workShift.getWorkShiftBreaks()) {
			workShiftBreak.setWorkShift(workShift);
		}
		super.add(WorkShift.class, workShift.getName(), genericSpecification
				.findByProperty("name", workShift.getName()), workShift);
	}

	@Override
	public void update(Long id, WorkShift workShift) throws Exception {
		/*if (workShift.getFromTime().isAfter(workShift.getToTime())) {
			throw new RuntimeException("Please enter valid Time range");
		}*/
		super.update(WorkShift.class, id, genericSpecification.findByProperty(
				"name", workShift.getName()), workShift);
	}

	@Override
	public void deleteById(Long id) {
		super.delete(id);
	}

}
