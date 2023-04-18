package com.srmt.repository.hrms.employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.employee.Employee;

@Repository
public interface EmployeeRepository extends
		PagingAndSortingRepository<Employee, Long>,
		JpaSpecificationExecutor<Employee> {
	String FIND_BY_EMPLOYEE_ID = "select employee from Employee employee where employee.superior.id=:id";
	String FIND_BY_LOCATION_ID_AND_LOCATION = "select employee from Employee employee where employee.department.location.id=:locationId and employee.active=:active";
	String FIND_BY_DEPARTMENT_AND_ACTIVE = "select employee from Employee employee where employee.department.id=:departmentId and employee.active=:active";

	List<Employee> findByActive(boolean b);

	@Query(FIND_BY_EMPLOYEE_ID)
	List<Employee> findByEmployee_Id(@Param("id") Long id);

	List<Employee> findByIdNot(Long id);

	Employee findByEmployeeId(String employeeId);

	@Query(FIND_BY_LOCATION_ID_AND_LOCATION)
	List<Employee> findbyLocationAndActive(
			@Param("locationId") Long locationId,
			@Param("active") boolean active);

	@Query(FIND_BY_DEPARTMENT_AND_ACTIVE)
	List<Employee> findbyDepartmentAndActive(
			@Param("departmentId") Long departmentId,
			@Param("active") boolean active);

	List<Employee> findByIdNotAndActive(Long id,boolean active);
	
	
	
	List<Employee> findBysalesRepCodeNotNull();
	
	Employee findBysalesRepCode(String salesRepCode);
	
	List<Employee> findByuserNullAndActive(boolean b);

}
