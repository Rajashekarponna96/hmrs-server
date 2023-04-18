package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.LeaveType;
import com.srmt.repository.hrms.administration.LeaveTypeRepository;

@Service
public class LeaveTypeMasterServiceImpl implements LeaveTypeMasterService {

	@Autowired
	private LeaveTypeRepository leaveTypeMasterRepository;

	@Override
	public void add(LeaveType leaveTypeMaster) {
		LeaveType leaveTypeMasterByCode = leaveTypeMasterRepository
				.findByCode(leaveTypeMaster.getCode());
		if (leaveTypeMasterByCode != null) {
			throw new RuntimeException("Leave Type Master ["
					+ leaveTypeMaster.getCode() + "] code already exists.");
		}
		leaveTypeMasterRepository.save(leaveTypeMaster);

	}

	@Override
	public void update(Long id, LeaveType leaveTypeMaster) {

		LeaveType leaveTypeMasterById = leaveTypeMasterRepository.findOne(id);
		if (leaveTypeMasterById == null) {
			throw new RuntimeException("Leave Type Master [" + id
					+ "] id does not exists.");
		}
		LeaveType leaveTypeMasterByCode = leaveTypeMasterRepository
				.findByCode(leaveTypeMaster.getCode());
		if (leaveTypeMasterByCode != null
				&& leaveTypeMasterById != null
				&& !leaveTypeMasterById.getId().equals(
						leaveTypeMasterByCode.getId())) {
			throw new RuntimeException("Laave Type Master ["
					+ leaveTypeMaster.getCode() + "] already exists.");
		}
		leaveTypeMasterById.setCode(leaveTypeMaster.getCode());
		leaveTypeMasterById.setComments(leaveTypeMaster.getComments());
		leaveTypeMasterById.setName(leaveTypeMaster.getName());
		leaveTypeMasterRepository.save(leaveTypeMasterById);
	}

	@Override
	public void deleteById(Long id) {
		LeaveType leaveTypeMasterById = leaveTypeMasterRepository.findOne(id);
		if (leaveTypeMasterById == null) {
			throw new RuntimeException("Leave Type Master [" + id
					+ "] id does not exists.");
		}
		leaveTypeMasterRepository.delete(leaveTypeMasterById);
	}

	@Override
	public LeaveType findById(Long id) {
		LeaveType leaveTypeMasterById = leaveTypeMasterRepository.findOne(id);
		if (leaveTypeMasterById == null) {
			throw new RuntimeException("Leave Type Master [" + id
					+ "] id does not exists.");
		}
		return leaveTypeMasterById;
	}

	@Override
	public List<LeaveType> findByPageAndSize(int page, int size) {
		return leaveTypeMasterRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

	@Override
	public Long getCount() {
		return leaveTypeMasterRepository.count();
	}

	@Override
	public List<LeaveType> findAll() {
		return (List<LeaveType>) leaveTypeMasterRepository.findAll();

	}
}
