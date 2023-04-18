package com.srmt.service.masters;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.model.hrms.administration.Department;
import com.srmt.model.hrms.administration.Location;
import com.srmt.repository.hrms.administration.ActSheduleRepository;
import com.srmt.repository.hrms.administration.LocationDepartmentRepository;
import com.srmt.repository.hrms.administration.LocationRepository;
import com.srmt.repository.specifications.LocationDepartmentSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class LocationDepartmentServiceImpl extends
		GenericServiceImpl<Department, Long> implements
		LocationDepartmentService {

	@Autowired
	private LocationDepartmentRepository locationDepartmentRepository;

	@Autowired
	private ActSheduleRepository actSheduleRepository;

	@Autowired
	private LocationRepository locationRepository;

	public LocationDepartmentServiceImpl() {
		super(Department.class);
	}

	/*
	 * @Override public void add(Department locationDepartment) { super.add(
	 * Department.class, locationDepartment.getCode(),
	 * genericSpecification.findByProperty("code",
	 * locationDepartment.getCode()), locationDepartment); }
	 */
	/*
	 * @Override public void update(Long id, Department locationDepartment) {
	 * Department dbLocation = super.findBy(Department.class, id);
	 * dbLocation.setCode(locationDepartment.getCode());
	 * dbLocation.setName(locationDepartment.getName());
	 * dbLocation.setActShedule(locationDepartment.getActShedule());
	 * dbLocation.setEffectiveDate(locationDepartment.getEffectiveDate());
	 * dbLocation.setBasic(locationDepartment.getBasic());
	 * dbLocation.setDa(locationDepartment.getDa());
	 * dbLocation.setLocation(locationDepartment.getLocation());
	 * baseRepository.save(dbLocation); }
	 */

	@Override
	public void deleteById(Long id) {
		super.delete(id);
	}

	@Override
	public List<Department> SearchByActAndLocationAndDepartment(Long actId,
			Long locationId, Long departmentId, int page, int size) {

		Specification<Department> specfication = LocationDepartmentSpecification
				.searchByActAndLocationAndDepartment(actId, locationId,
						departmentId);
		
	
		
		List<Department> localDepartments=locationDepartmentRepository.findAll(specfication,
				new PageRequest(page, size)).getContent();
		List<Department> locationWiseActs=new ArrayList<Department>();
		for (Department department : localDepartments) {
			if(department.getActShedule()!=null && department.getActShedule().getAct()!=null &&department.getLocation()!=null){
				locationWiseActs.add(department);
			}
			
		}

		return locationWiseActs ;
	}

	@Override
	public Long SearchByActAndLocationAndDepartmentCount(Long actId,
			Long locationId, Long departmentId) {
		Specification<Department> specfication = LocationDepartmentSpecification
				.searchByActAndLocationAndDepartment(actId, locationId,
						departmentId);
		return (long) locationDepartmentRepository.findAll(specfication).size();
	}

	@Override
	public List<Department> getDepartmentsByLocation(Long id) {
		Location location = locationRepository.findOne(id);
		if (location == null) {
			throw new RuntimeException("This Location not Exist");
		}
		return location.getLocationDepartments();
	}

	@Override
	public void addDepartment(Long id, Department locationDepartment) {

		Location location = locationRepository.findOne(id);
		Department departmentByCodeAndLocation = locationDepartmentRepository
				.findByCodeAndLocation_Id(locationDepartment.getCode(),
						location.getId());
		if (departmentByCodeAndLocation != null) {
			throw new RuntimeException("Duplicate Entry For Department");
		}
		
		locationDepartment.setLocation(location);
		locationDepartmentRepository.save(locationDepartment);

	}

	@Override
	public void updateDepartment(Long id, Long deptId,
			Department locationDepartment) {

		Department departmentByLocationAndDepartment = locationDepartmentRepository
				.findByIdAndLocation_Id(deptId, id);

		if (departmentByLocationAndDepartment == null) {
			throw new RuntimeException("Department Id #[" + deptId
					+ "]does not exists.");
		}
		Department departmentByCodeAndLocation = locationDepartmentRepository
				.findByCodeAndLocation_Id(locationDepartment.getCode(), id);
		
		if (departmentByCodeAndLocation!=null && !departmentByCodeAndLocation.getId().equals(
				departmentByLocationAndDepartment.getId())&&departmentByCodeAndLocation!=null) {
			throw new RuntimeException("Duplicate Entry For Department");
		}
		
		departmentByLocationAndDepartment.setCode(locationDepartment.getCode());
		departmentByLocationAndDepartment.setName(locationDepartment.getName());
		locationDepartmentRepository.save(departmentByLocationAndDepartment);

	}

	@Override
	public void add(Department locationDepartment) {
		/*
		 * super.add(Department.class, locationDepartment.getLocation(),
		 * genericSpecification.findByProperty("code",
		 * locationDepartment.getCode()),locationDepartment);
		 */

	}

	@Override
	public void addLocationWiseAct(Long id, Long sheduleId,
			Department department) {
		ActShedule actShedule = actSheduleRepository.findOne(sheduleId);
		Department locaDepartment = locationDepartmentRepository.findOne(id);
		locaDepartment.setActShedule(actShedule);
		locaDepartment.setEffectiveDate(department.getEffectiveDate());
		locaDepartment.setBasic(department.getBasic());
		locaDepartment.setDa(department.getDa());
		locationDepartmentRepository.save(locaDepartment);
	}

	@Override
	public List<Department> getLocationWiseActs(int page, int size) {

		return locationDepartmentRepository
				.findLocationWiseActs(new PageRequest(page, size));
	}

	@Override
	public Long getLocationWiseActsCount() {

		return locationDepartmentRepository.findLocationWiseActsCount();
	}
}
