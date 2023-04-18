package com.srmt.service.employee;

import java.time.LocalDate;
import java.util.List;

import com.srmt.dto.EmployeeLocationAndProductlineDto;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.employee.Dependent;
import com.srmt.model.hrms.employee.Document;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.hrms.employee.LanguageProficiency;
import com.srmt.model.hrms.employee.Qualification;
import com.srmt.model.hrms.employee.WorkExperience;
import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.model.hrms.leaveaManagement.LeaveRequest;
import com.srmt.service.GenericService;

public interface EmployeeService extends GenericService<Employee, Long> {

	Employee add(Employee employee);

	Employee findById(Long id);

	Employee upateEmployee(Long id, Employee employee) throws Exception;

	void addContact(Employee employee);

	void addDocuments(Long id, String category, Document document);

	List<Document> getDocuments(Long id, String category);

	void updateDocuments(Long id, Document document);

	void deleteDocumentById(long employeeId, long documentId);

	void addDependent(Long id, Dependent dependent);

	void updateDependent(Long id, Dependent dependent);

	List<Dependent> getAllDependents(Long id);

	void deleteDependent(Long id, Long dependentId);

	Dependent findEmployeeDependentById(Long employeeId, Long dependentId);

	List<Employee> findEpmloyeeByPageAndSize(int page, int size);

	Long getCount();

	void addJobDetails(Employee employee);

	void addLanguageProficiency(Long id, LanguageProficiency languageProficiency);

	void updateLanguageProficiency(Long id, Long languageProficiencyId,
			LanguageProficiency languageProficiency);

	List<LanguageProficiency> getLanguageProficiesById(Long id);

	void deleteLanguageProficiency(Long id, Long languageProficiencyId);

	void addQualifications(Long id, Qualification qualification);

	void updateQualification(Long id, Qualification qualification);

	List<Qualification> getQualificationsById(Long id);

	void deleteByQualificationById(Long id, Long qualificationId);

	void addExperience(Long id, WorkExperience workExperience);

	void updateExperience(Long id, WorkExperience workExperience);

	void deletWorkExperience(Long id, Long experienceId);

	List<WorkExperience> findWorkExperienceById(Long id);

	void reportto(Employee employee);

	void addAttendance(Long id, Attendance attendance);

	void terminateEmloyee(Employee employee);

	void setEmployeeStatus(Long id);

	List<Employee> findAllActiveEmployee();

	List<Employee> findReporties(Long id);

	void apply(Long id, LeaveRequest leaveRequest);

	List<LeaveEntitlement> findAllLeaveEntitlementById(Long id);

	List<Attendance> findReportingEmployeeAttendance(Long superiorId,
			Long employeeId, LocalDate date);

	List<Attendance> findReportingEmployeeAttendance(Long superiorId,
			Long employeeId, Long locationId, Long departmentId,
			LocalDate fromDate, LocalDate toDate, int page, int size);

	List<Attendance> findReportingEmployeeAttendanceCount(Long superiorId,
			Long employeeId, Long locationId, Long departmentId,
			LocalDate thisfromDate, LocalDate thisToDate);

	List<Attendance> findAllEmployeeAttendance(Long employeeId,
			Long locationId, Long departmentId, LocalDate thisfromDate,
			LocalDate thisToDate, int page, int size);

	List<Attendance> findAllEmployeeAttendanceCount(Long employeeId,
			Long locationId, Long departmentId, LocalDate thisfromDate,
			LocalDate thisToDate);

	List<Employee> getAllActiveEmployees();

	List<LeaveEntitlement> findEmployeeLeaveEntitlement(Long employeeId);

	List<Employee> findAllEmployeesExceptById(Long id);

	List<LeaveEntitlement> findLeaveEntitlementByCalendarYear(Long id,
			Long calendarId, int page, int size);

	Employee findSuperior(Long id);

	List<LeaveEntitlement> findLeaveEntitlementByEmployeeIdAndLeavePeriodId(
			Long employeeId, Long leavePeriodId);

	

	List<Employee> getAllSalesRepresentatives();

	List<Employee> searchSalesRepresentativeBysalesRepCodeAndmobile(
			String salesRepCode, String mobile,int page,int size);

	int searchSalesRepresentativeBysalesRepCodeAndmobileCount(
			String salesRepCode, String mobile);
	List<Location> findAllLocationsById(Long empId);
	
	void addLocations(Long empId, Employee employee);

	List<Employee> searchEmployeeByIdAndLocationAndDepartment(Long employeeId,
			Long locationId, Long departmentId, int page, int size);

	int searchEmployeeByIdAndLocationAndDepartmentCount(Long employeeId,
			Long locationId, Long departmentId);

	EmployeeLocationAndProductlineDto getLocationsAndVehicleModelsByEmployeeId(
			Long employeeId);

	List<Employee> getAllActiveAndUserNotNullEmployees();

	
	
}
