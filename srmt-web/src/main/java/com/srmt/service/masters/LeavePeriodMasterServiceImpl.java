package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.repository.hrms.administration.LeavePeriodRepository;

@Service
public class LeavePeriodMasterServiceImpl implements LeavePeriodMasterService {

	@Autowired
	private LeavePeriodRepository leavePeriodMasterRepository;

	@Override
	public void add(LeavePeriod leavePeriodMaster) {
		LeavePeriod leavePeriodMasterByCode = leavePeriodMasterRepository
				.findByCode(leavePeriodMaster.getCode());
		if (leavePeriodMaster.getEndDate().isBefore(
				leavePeriodMaster.getStartDate())) {
			throw new RuntimeException("endDate must be greater than startDate");
		}
		if (leavePeriodMasterByCode != null) {
			throw new RuntimeException("Calendar Year Master ["
					+ leavePeriodMaster.getCode() + "] already exists.");
		}
		List<LeavePeriod> lp = leavePeriodMasterRepository
				.findLeavePeriod(leavePeriodMaster.getStartDate());
		if (lp.size() != 0) {
			throw new RuntimeException(
					"Calendar Year already exists within the given dates range");
		}
		leavePeriodMasterRepository.save(leavePeriodMaster);
	}

	@Override
	public void update(Long id, LeavePeriod leavePeriodMaster) {
		LeavePeriod leavePeriodMasterById = leavePeriodMasterRepository
				.findOne(id);
		if (leavePeriodMasterById == null) {
			throw new RuntimeException("Leave Period Master [" + id
					+ "] id does not exists.");
		}

		LeavePeriod leavePeriodMasterByCode = leavePeriodMasterRepository
				.findByCode(leavePeriodMaster.getCode());

		if (!leavePeriodMasterByCode.getId().equals(
				leavePeriodMasterById.getId())) {
			throw new RuntimeException("Leave Period Master ["
					+ leavePeriodMaster.getCode() + "] already exists.");
		}
		leavePeriodMasterRepository.save(leavePeriodMaster);
	}

	@Override
	public void deleteById(Long id) {
		LeavePeriod leavePeriodMasterById = leavePeriodMasterRepository
				.findOne(id);
		if (leavePeriodMasterById == null) {
			throw new RuntimeException("Leave Period Master [" + id
					+ "] id does not exists.");
		}
		leavePeriodMasterRepository.delete(leavePeriodMasterById);

	}

	@Override
	public List<LeavePeriod> findByPageAndSize(int page, int size) {
		return leavePeriodMasterRepository.findAll(new PageRequest(page, size))
				.getContent();
	}

	@Override
	public Long getCount() {
		return leavePeriodMasterRepository.count();
	}

	@Override
	public List<LeavePeriod> findAll() {
		return (List<LeavePeriod>) leavePeriodMasterRepository.findAll();
	}
}
