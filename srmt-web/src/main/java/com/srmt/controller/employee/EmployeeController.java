package com.srmt.controller.employee;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
import com.srmt.service.attendance.AttendanceService;
import com.srmt.service.employee.EmployeeService;
import com.srmt.service.leavemanagement.LeaveEntitlementService;
import com.srmt.service.leavemanagement.LeaveRequestService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private AttendanceService attendanceService;

	@Autowired
	private LeaveRequestService leaveRequestService;

	@Autowired
	private LeaveEntitlementService leaveEntitlementService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Employee add(@RequestBody Employee employee) {
		return employeeService.add(employee);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Employee findById(@PathVariable("id") Long id) {
		return employeeService.findById(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Employee upateEmployee(@PathVariable("id") Long id,
			@RequestBody Employee employee) throws Exception {
		employee.setId(id);
		
		return employeeService.upateEmployee(id, employee);
	}

	@RequestMapping(value = "/{id}/contact", method = RequestMethod.POST)
	public void addContact(@PathVariable("id") Long id,
			@RequestBody Employee employee) {
		employee.setId(id);
		employeeService.addContact(employee);
	}

	@RequestMapping(value = "/{id}/contact", method = RequestMethod.PUT)
	public void upateContact(@PathVariable("id") Long id,
			@RequestBody Employee employee) {
		employee.setId(id);
		employeeService.addContact(employee);
	}

	@RequestMapping(value = "/{id}/document", method = RequestMethod.POST)
	public void addDocument(@PathVariable("id") Long id,
			@RequestParam("category") String category,
			@RequestBody Document document) {
		employeeService.addDocuments(id, category, document);
	}

	@RequestMapping(value = "/{id}/documents", method = RequestMethod.GET)
	public List<Document> getDocuments(@PathVariable("id") Long id,
			@RequestParam("category") String category) {
		return employeeService.getDocuments(id, category);
	}

	@RequestMapping(value = "/{id}/document/{documnetId}", method = RequestMethod.PUT)
	public void updateDocuments(@PathVariable("id") Long id,
			@PathVariable("documnetId") Long documnetId,
			@RequestBody Document document) {

		document.setId(documnetId);
		employeeService.updateDocuments(id, document);
	}

	@RequestMapping(value = "/{id}/document/{documnetId}")
	public void deleteDocumentById(@PathVariable("id") long employeeId,
			@PathVariable("documnetId") long documentId) {
		employeeService.deleteDocumentById(employeeId, documentId);
	}

	@RequestMapping(value = "/{id}/dependent", method = RequestMethod.POST)
	public void addDependent(@PathVariable("id") Long id,
			@RequestBody Dependent dependent) {

		employeeService.addDependent(id, dependent);
	}

	@RequestMapping(value = "/{id}/dependent/{dependentId}", method = RequestMethod.PUT)
	public void updateDependent(@PathVariable("id") Long id,
			@PathVariable("dependentId") Long dependentId,
			@RequestBody Dependent dependent) {
		dependent.setId(dependentId);
		employeeService.updateDependent(id, dependent);
	}

	@RequestMapping(value = "/{id}/dependents", method = RequestMethod.GET)
	public List<Dependent> getAllDependents(@PathVariable("id") Long id) {
		return employeeService.getAllDependents(id);
	}

	@RequestMapping(value = "/{id}/dependent/{dependentId}", method = RequestMethod.DELETE)
	public void deleteDependent(@PathVariable("id") Long id,
			@PathVariable("dependentId") Long dependentId) {
		employeeService.deleteDependent(id, dependentId);
	}

	@RequestMapping(value = "/{id}/dependent/{dependentId}", method = RequestMethod.GET)
	public Dependent findDependentById(@PathVariable("id") Long id,
			@PathVariable("id") Long dependentId) {
		return employeeService.findEmployeeDependentById(id, dependentId);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Employee> findEpmloyeeByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return employeeService.findEpmloyeeByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return employeeService.getCount();
	}

	@RequestMapping(value = "/{id}/jobdetails", method = RequestMethod.POST)
	public void addJobDetails(@PathVariable("id") Long id,
			@RequestBody Employee employee) {
		employee.setId(id);
		employeeService.addJobDetails(employee);
	}

	@RequestMapping(value = "/{id}/languageProficiency", method = RequestMethod.POST)
	public void addLanguageProficiency(@PathVariable("id") Long id,
			@RequestBody LanguageProficiency languageProficiency) {
		employeeService.addLanguageProficiency(id, languageProficiency);
	}

	@RequestMapping(value = "/{id}/languageProficiency/{languageProficiencyId}", method = RequestMethod.PUT)
	public void updateLanguageProficiency(@PathVariable("id") Long id,
			@PathVariable("languageProficiencyId") Long languageProficiencyId,
			@RequestBody LanguageProficiency languageProficiency) {
		employeeService.updateLanguageProficiency(id, languageProficiencyId,
				languageProficiency);
	}

	@RequestMapping(value = "/{id}/languageProficies", method = RequestMethod.GET)
	public List<LanguageProficiency> getLanguageProficiesById(
			@PathVariable("id") Long id) {
		return employeeService.getLanguageProficiesById(id);
	}

	@RequestMapping(value = "/{id}/languageProficiency/{languageProficiencyId}", method = RequestMethod.DELETE)
	public void deleteLanguageProficiency(@PathVariable("id") Long id,
			@PathVariable("languageProficiencyId") Long LanguageProficiencyId) {
		employeeService.deleteLanguageProficiency(id, LanguageProficiencyId);
	}

	@RequestMapping(value = "/{id}/qualification", method = RequestMethod.POST)
	public void addQualifications(@PathVariable("id") Long id,
			@RequestBody Qualification qualification) {
		employeeService.addQualifications(id, qualification);
	}

	@RequestMapping(value = "/{id}/qualifications", method = RequestMethod.GET)
	public List<Qualification> getQualifications(@PathVariable("id") Long id) {
		return employeeService.getQualificationsById(id);
	}

	@RequestMapping(value = "/{id}/qualification/{qualificationId}", method = RequestMethod.PUT)
	public void updateQualification(@PathVariable("id") long id,
			@PathVariable("qualificationId") Long qualificationId,
			@RequestBody Qualification qualification) {
		qualification.setId(qualificationId);
		employeeService.updateQualification(id, qualification);
	}

	@RequestMapping(value = "/{id}/qualification/{qualificationId}", method = RequestMethod.DELETE)
	public void deleteByQualificationById(@PathVariable("id") Long id,
			@PathVariable("qualificationId") Long qualificationId) {
		employeeService.deleteByQualificationById(id, qualificationId);
	}

	@RequestMapping(value = "/{id}/experience", method = RequestMethod.POST)
	public void addExperience(@PathVariable("id") Long id,
			@RequestBody WorkExperience workExperience) {
		employeeService.addExperience(id, workExperience);
	}

	@RequestMapping(value = "/{id}/experience/{experienceId}", method = RequestMethod.PUT)
	public void updateExperience(@PathVariable("id") Long id,
			@PathVariable("experienceId") Long experienceId,
			@RequestBody WorkExperience workExperience) {
		workExperience.setId(experienceId);
		employeeService.updateExperience(id, workExperience);
	}

	@RequestMapping(value = "/{id}/experience/{experienceId}", method = RequestMethod.DELETE)
	public void deletWorkExperience(@PathVariable("id") Long id,
			@PathVariable("experienceId") Long experienceId) {
		employeeService.deletWorkExperience(id, experienceId);
	}

	@RequestMapping(value = "/{id}/experience", method = RequestMethod.GET)
	public List<WorkExperience> findWorkExperienceById(
			@PathVariable("id") Long id) {
		return employeeService.findWorkExperienceById(id);
	}

	@RequestMapping(value = "{id}/reportTo", method = RequestMethod.POST)
	public void reportto(@PathVariable("id") Long id,
			@RequestBody Employee employee) {
		employee.setId(id);
		employeeService.reportto(employee);
	}

	@RequestMapping(value = "/{id}/attendances", method = RequestMethod.GET)
	public List<Attendance> findAttendanceById(@PathVariable("id") Long id) {
		return attendanceService.findAttendanceById(id);
	}

	@RequestMapping(value = "/{id}/attendance", method = RequestMethod.POST)
	public void addAttendance(@PathVariable("id") Long id,
			@RequestBody Attendance attendance) {
		employeeService.addAttendance(id, attendance);
	}

	@RequestMapping(value = "/{id}/attendance/count", method = RequestMethod.GET)
	public Long AttendanceCount(@PathVariable("id") Long id) {
		return attendanceService.countById(id);
	}

	@RequestMapping(value = "/{id}/terminate", method = RequestMethod.POST)
	public void terminateEmloyee(@PathVariable("id") Long id,
			@RequestBody Employee employee) {
		employee.setId(id);
		employeeService.terminateEmloyee(employee);

	}

	@RequestMapping(value = "/{id}/active", method = RequestMethod.GET)
	public void setEmployeeStatus(@PathVariable("id") Long id) {
		employeeService.setEmployeeStatus(id);
	}

	@RequestMapping(value = "/{id}/leaveRequests", method = RequestMethod.GET)
	public List<LeaveRequest> findLeaveRequestByEmployeeId() {
		return leaveRequestService.getAll();
	}
	
	/*@RequestMapping(value = "/{id}/leaveRequests", method = RequestMethod.GET)
	public List<LeaveRequest> findLeaveRequestByEmployeeId(
			@PathVariable("id") Long id, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		return leaveRequestService.findByEmployeeId(id, page, size);
	}*/

	@RequestMapping(value = "/{id}/leaverequests/count", method = RequestMethod.GET)
	public Long findLeaveRequestCountByEmplyeeId(@PathVariable("id") Long id) {
		return leaveRequestService.findCountByEmplyeeId(id);
	}

	@RequestMapping(value = "/{id}/leaveEntitlement", method = RequestMethod.GET)
	public List<LeaveEntitlement> findLeaveEntitlementByEmployeeId(
			@PathVariable("id") Long id, @RequestParam("page") int page,
			@RequestParam("size") int size) {
		return leaveEntitlementService.findLeaveEntitlementByEmployeeId(id,
				page, size);
	}

	@RequestMapping(value = "/{id}/leaveEntitlement/count", method = RequestMethod.GET)
	public Long findLeaveEntitlementCountByEmployeeId(
			@PathVariable("id") Long id) {
		return leaveEntitlementService.findCountByEmployeeId(id);
	}

	@RequestMapping(value = "/active", method = RequestMethod.GET)
	public List<Employee> findAllActiveEmployee() {
		return employeeService.findAllActiveEmployee();
	}

	@RequestMapping(value = "/{id}/reporties", method = RequestMethod.GET)
	public List<Employee> findReporties(@PathVariable("id") Long id) {
		return employeeService.findReporties(id);
	}

	@RequestMapping(value = "/{id}/leaveEntitlement/all", method = RequestMethod.GET)
	public List<LeaveEntitlement> findAllLeaveEntitlementById(
			@PathVariable("id") Long id) {
		return employeeService.findAllLeaveEntitlementById(id);
	}

	@RequestMapping(value = "/{superiorId}/reportieesAttendance", method = RequestMethod.GET)
	public List<Attendance> findReportingEmployeeAttendance(
			@PathVariable("superiorId") Long superiorId,
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam(name = "locationId", required = false) Long locationId,
			@RequestParam(name = "departmentId", required = false) Long departmentId,
			@RequestParam(name = "fromDate", required = false) String fromDate,
			@RequestParam(name = "toDate", required = false) String toDate,
			@RequestParam(name = "page", required = true) int page,
			@RequestParam(name = "size", required = true) int size) {
		LocalDate thisfromDate = null;
		LocalDate thisToDate = null;
		if (fromDate != null && toDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter
					.ofPattern("dd-MM-yyyy");
			thisfromDate = LocalDate.parse(fromDate, formatter);
			thisToDate = LocalDate.parse(toDate, formatter);
		}
		return employeeService.findReportingEmployeeAttendance(superiorId,
				employeeId, locationId, departmentId, thisfromDate, thisToDate,
				page, size);

	}

	@RequestMapping(value = "/allEmployeeAttendanceSearch", method = RequestMethod.GET)
	public List<Attendance> findAllEmployeeAttendance(
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam(name = "locationId", required = false) Long locationId,
			@RequestParam(name = "departmentId", required = false) Long departmentId,
			@RequestParam(name = "fromDate", required = false) String fromDate,
			@RequestParam(name = "toDate", required = false) String toDate,
			@RequestParam(name = "page", required = true) int page,
			@RequestParam(name = "size", required = true) int size) {
		LocalDate thisfromDate = null;
		LocalDate thisToDate = null;
		if (fromDate != null && toDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter
					.ofPattern("dd-MM-yyyy");
			thisfromDate = LocalDate.parse(fromDate, formatter);
			thisToDate = LocalDate.parse(toDate, formatter);
		}
		return employeeService.findAllEmployeeAttendance(employeeId,
				locationId, departmentId, thisfromDate, thisToDate, page, size);

	}

	@RequestMapping(value = "/allEmployeeAttendanceSearch/count", method = RequestMethod.GET)
	public int findAllEmployeeAttendanceCount(
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam(name = "locationId", required = false) Long locationId,
			@RequestParam(name = "departmentId", required = false) Long departmentId,
			@RequestParam(name = "fromDate", required = false) String fromDate,
			@RequestParam(name = "toDate", required = false) String toDate) {
		LocalDate thisfromDate = null;
		LocalDate thisToDate = null;
		if (fromDate != null && toDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter
					.ofPattern("dd-MM-yyyy");
			thisfromDate = LocalDate.parse(fromDate, formatter);
			thisToDate = LocalDate.parse(toDate, formatter);
		}
		return employeeService.findAllEmployeeAttendanceCount(employeeId,
				locationId, departmentId, thisfromDate, thisToDate).size();

	}

	@RequestMapping(value = "/{superiorId}/reportieesAttendance/count", method = RequestMethod.GET)
	public int findReportingEmployeeAttendance(
			@PathVariable("superiorId") Long superiorId,
			@RequestParam(name = "employeeId", required = false) Long employeeId,
			@RequestParam(name = "locationId", required = false) Long locationId,
			@RequestParam(name = "departmentId", required = false) Long departmentId,
			@RequestParam(name = "fromDate", required = false) String fromDate,
			@RequestParam(name = "toDate", required = false) String toDate) {
		LocalDate thisfromDate = null;
		LocalDate thisToDate = null;
		if (fromDate != null && toDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter
					.ofPattern("dd-MM-yyyy");
			thisfromDate = LocalDate.parse(fromDate, formatter);
			thisToDate = LocalDate.parse(toDate, formatter);
		}
		return employeeService.findReportingEmployeeAttendanceCount(superiorId,
				employeeId, locationId, departmentId, thisfromDate, thisToDate)
				.size();

	}

	@RequestMapping(value = "/{id}/applyLeave", method = RequestMethod.POST)
	public void apply(@PathVariable("id") Long id,
			@RequestBody LeaveRequest leaveRequest) {
		employeeService.apply(id, leaveRequest);
	}

	@RequestMapping(value = "/activeEmployees", method = RequestMethod.GET)
	public List<Employee> getAllActiveEmployees() {
		return employeeService.getAllActiveEmployees();
	}

	@RequestMapping(value = "/{employeeId}/leaveEntitlement", method = RequestMethod.GET)
	public List<LeaveEntitlement> findEmployeeLeaveEntitlement(
			@PathVariable("employeeId") Long employeeId) {
		return employeeService.findEmployeeLeaveEntitlement(employeeId);
	}

	@RequestMapping(value = "/{id}/all", method = RequestMethod.GET)
	public List<Employee> findAllEmployeesExceptById(@PathVariable("id") Long id) {
		return employeeService.findAllEmployeesExceptById(id);
	}

	@RequestMapping(value = "/{id}/leaveEntitleMent", method = RequestMethod.GET)
	public List<LeaveEntitlement> findLeaveEntitlementByCalendarYear(
			@PathVariable("id") Long id,
			@RequestParam(value = "calendarId") Long calendarId,
			@RequestParam("page") int page, @RequestParam("size") int size) {

		return employeeService.findLeaveEntitlementByCalendarYear(id,
				calendarId, page, size);
	}

	@RequestMapping(value = "/{id}/monthlyAttendance", method = RequestMethod.GET)
	public List<Attendance> findMonthlyAttendance(
			@PathVariable("id") Long employeeId,
			@RequestParam(name = "month", required = false) Integer month,
			@RequestParam(name = "year", required = false) Integer year,
			@RequestParam("page") int page, @RequestParam("size") int size) {

		if (month == null && year == null) {
			LocalDate localDate = LocalDate.now();
			month = localDate.getMonthValue();
			year = localDate.getYear();
		}
		return attendanceService.findMonthlyAttendance(employeeId, month, year,
				page, size);
	}

	@RequestMapping(value = "/{id}/monthlyAttendance/count", method = RequestMethod.GET)
	public int findMonthlyAttendanceCount(@PathVariable("id") Long employeeId,
			@RequestParam(name = "month", required = false) Integer month,
			@RequestParam(name = "year", required = false) Integer year) {
		if (month == null && year == null) {
			LocalDate localDate = LocalDate.now();
			month = localDate.getMonthValue();
			year = localDate.getYear();
		}

		return attendanceService.findMonthlyAttendanceCount(employeeId, month,
				year);
	}

	@RequestMapping(value = "/{id}/superior", method = RequestMethod.GET)
	public Employee findSuperior(@PathVariable("id") Long id) {
		return employeeService.findSuperior(id);
	}

	@RequestMapping(value = "/{employeeId}/leavePeriod/{leavePeriodId}", method = RequestMethod.GET)
	public List<LeaveEntitlement> findLeaveEntitlementByEmployeeIdAndLeavePeriodId(
			@PathVariable("employeeId") Long employeeId,
			@PathVariable("leavePeriodId") Long leavePeriodId) {

		return employeeService
				.findLeaveEntitlementByEmployeeIdAndLeavePeriodId(employeeId,
						leavePeriodId);
	}

	@RequestMapping(value = "/salesRepresentatives", method = RequestMethod.GET)
	public List<Employee> getAllSalesRepresentatives() {
		return employeeService.getAllSalesRepresentatives();
	}

	@RequestMapping(value = "/search/salesRep", method = RequestMethod.GET)
	public List<Employee> searchSalesRepresentativeBysalesRepCodeAndmobile(
			@RequestParam(name = "salesRepCode", required = false) String salesRepCode,
			@RequestParam(name = "mobile", required = false) String mobile,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return employeeService
				.searchSalesRepresentativeBysalesRepCodeAndmobile(salesRepCode,
						mobile, page, size);
	}

	@RequestMapping(value = "/search/salesRep/count", method = RequestMethod.GET)
	public int searchSalesRepresentativeBysalesRepCodeAndmobileCount(
			@RequestParam(name = "salesRepCode", required = false) String salesRepCode,
			@RequestParam(name = "mobile", required = false) String mobile) {
		return employeeService
				.searchSalesRepresentativeBysalesRepCodeAndmobileCount(
						salesRepCode, mobile);
	}
	
	//getting 'Sales Representative' locations
	@RequestMapping(value = "/{id}/locations", method = RequestMethod.GET)
	public List<Location> findAllLocationsById(@PathVariable("id") Long id) {
		return employeeService.findAllLocationsById(id);
	}
	
	//added for saving 'Sales Representative' locations, vehiclemodels.
	@RequestMapping(value = "/{id}/locations/", method = RequestMethod.PUT)
	public void addSalesRepLocations(@PathVariable("id") Long id, @RequestBody Employee employee){
		employeeService.addLocations(id, employee);
	}
	
	@RequestMapping(value="/search/",method=RequestMethod.GET)
	public List<Employee> searchEmployeeByIdAndLocationAndDepartment(@RequestParam(name="employeeId",required=false) Long employeeId,
			@RequestParam(name="locationId",required=false) Long locationId,
			@RequestParam(name="departmentId",required=false) Long departmentId,@RequestParam("page") int page,
			@RequestParam("size") int size){
				return employeeService.searchEmployeeByIdAndLocationAndDepartment(employeeId,locationId,departmentId,page,size);
		
	}
	@RequestMapping(value="/search/count",method=RequestMethod.GET)
	public int searchEmployeeByIdAndLocationAndDepartmentCount(@RequestParam(name="employeeId",required=false) Long employeeId,
			@RequestParam(name="locationId",required=false) Long locationId,
			@RequestParam(name="departmentId",required=false) Long departmentId){
				return employeeService.searchEmployeeByIdAndLocationAndDepartmentCount(employeeId,locationId,departmentId);
		
	}
	
	@RequestMapping(value="/{employeeId}/locationsAndModels",method=RequestMethod.GET)
	public EmployeeLocationAndProductlineDto getLocationsAndVehicleModelsByEmployeeId(@PathVariable("employeeId") Long employeeId){
		return employeeService.getLocationsAndVehicleModelsByEmployeeId(employeeId);
	}
	
	@RequestMapping(value="/activeAndusersNotNullemps",method=RequestMethod.GET)
	public List<Employee> getAllActiveAndUserNotNullEmployees(){
		return employeeService.getAllActiveAndUserNotNullEmployees();
	}
	
	
	
	
}
