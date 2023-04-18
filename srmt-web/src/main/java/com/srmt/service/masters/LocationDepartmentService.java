package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.Department;
import com.srmt.service.GenericService;

public interface LocationDepartmentService extends
		GenericService<Department, Long> {

	


	void deleteById(Long id);

	List<Department> SearchByActAndLocationAndDepartment(Long actId,
			Long locationId, Long departmentId, int page, int size);

	Long SearchByActAndLocationAndDepartmentCount(Long actId, Long locationId,
			Long departmentId);

	List<Department> getDepartmentsByLocation(Long id);

	void addDepartment(Long id, Department locationDepartment);
	
	void add(Department locationDepartment);

	void updateDepartment(Long id, Long deptId, Department locationDepartment);

	void addLocationWiseAct(Long id, Long sheduleId, Department department);

	List<Department> getLocationWiseActs(int page, int size);

	Long getLocationWiseActsCount();

}
