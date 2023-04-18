package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.EmploymentType;
import com.srmt.repository.hrms.administration.EmplopyeeTypeRepository;

@Service
public class EmployeeTypeMasterServiceImpl implements EmployeeTypeMasterService {

	@Autowired
	private EmplopyeeTypeRepository emplopyeeTypeMasterRepository;

	@Override
	public void add(EmploymentType employmentTypeMaster) {

		EmploymentType typeMaster = emplopyeeTypeMasterRepository
				.findByCode(employmentTypeMaster.getCode());
		if (typeMaster != null) {
			throw new RuntimeException("Employee Type Master ["
					+ employmentTypeMaster.getCode() + "] already exists.");
		}
		emplopyeeTypeMasterRepository.save(employmentTypeMaster);
	}

	@Override
	public void update(long id, EmploymentType employmentTypeMaster) {

		EmploymentType typeMaster = emplopyeeTypeMasterRepository
				.findOne(id);
		if (typeMaster == null) {
			throw new RuntimeException("Employee Type Master[ " + id
					+ "] does not exists.");
		}
		typeMaster.setCode(employmentTypeMaster.getCode());
		typeMaster.setDescription(employmentTypeMaster.getDescription());
		typeMaster.setName(employmentTypeMaster.getName());
		emplopyeeTypeMasterRepository.save(typeMaster);
	}

	@Override
	public EmploymentType findById(Long id) {
		EmploymentType typeMaster = emplopyeeTypeMasterRepository
				.findOne(id);
		if (typeMaster == null) {
			throw new RuntimeException("Employee Type Master[ " + id
					+ "] does not exists.");
		}
		return typeMaster;
	}

	@Override
	public void deletebyId(long id) {
		EmploymentType employmentTypeMaster = emplopyeeTypeMasterRepository
				.findOne(id);
		if (employmentTypeMaster == null) {
			throw new RuntimeException("Employee Type Master[ " + id
					+ "] does not exists.");
		}
		emplopyeeTypeMasterRepository.delete(employmentTypeMaster);
	}

	@Override
	public List<EmploymentType> findByPageAndSize(int page, int size) {
		return emplopyeeTypeMasterRepository.findAll(
				new PageRequest(page, size)).getContent();
	}

	@Override
	public Long getCount() {
		return emplopyeeTypeMasterRepository.count();
	}

	@Override
	public List<EmploymentType> getAllEmployeMentTypes() {
		
		return (List<EmploymentType>) emplopyeeTypeMasterRepository.findAll();
	}

}
