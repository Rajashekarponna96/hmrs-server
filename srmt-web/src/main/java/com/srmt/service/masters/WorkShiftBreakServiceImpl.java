package com.srmt.service.masters;

import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.WorkShift;
import com.srmt.model.hrms.administration.WorkShiftBreak;
import com.srmt.service.GenericServiceImpl;

@Service
public class WorkShiftBreakServiceImpl extends
		GenericServiceImpl<WorkShiftBreak, Long> implements
		WorkShiftBreakService {

	private SimpleJpaRepository<WorkShift, Long> workShiftRepository;

	public WorkShiftBreakServiceImpl() {
		super(WorkShiftBreak.class);
	}

	@Override
	public void addWorkShiftBreak(Long id, WorkShiftBreak workShiftBreak) {
		WorkShift workShift = workShiftRepository.findOne(id);
		workShift.validateBreak(workShiftBreak.getFromTime(),
				workShiftBreak.getToTime());
		super.add(
				WorkShift.class,
				id,
				workShiftBreak,
				genericSpecification.findByProperty("name",
						workShiftBreak.getName()));

	}

	@Override
	public void updateWorkShiftBreak(Long id, WorkShiftBreak workShiftBreak) {
		WorkShift workShift = workShiftRepository.findOne(id);
		workShift.validateBreak(workShiftBreak.getFromTime(),
				workShiftBreak.getToTime());
		super.add(
				WorkShift.class,
				id,
				workShiftBreak,
				genericSpecification.findByProperty("name",
						workShiftBreak.getName()));

	}

}
