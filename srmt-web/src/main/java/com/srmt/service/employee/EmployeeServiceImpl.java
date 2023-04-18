package com.srmt.service.employee;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.dto.EmployeeLocationAndProductlineDto;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.administration.Sequence;
import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.employee.Dependent;
import com.srmt.model.hrms.employee.Document;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.hrms.employee.LanguageProficiency;
import com.srmt.model.hrms.employee.Qualification;
import com.srmt.model.hrms.employee.RelationType;
import com.srmt.model.hrms.employee.WorkExperience;
import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.model.hrms.leaveaManagement.LeaveRequest;
import com.srmt.model.hrms.leaveaManagement.LeaveRequestStatus;
import com.srmt.repository.attendance.AttendanceRepository;
import com.srmt.repository.hrms.administration.LocationRepository;
import com.srmt.repository.hrms.employee.DependentRepository;
import com.srmt.repository.hrms.employee.DocumentRepository;
import com.srmt.repository.hrms.employee.EmployeeRepository;
import com.srmt.repository.hrms.employee.LanguageProficiencyRepository;
import com.srmt.repository.hrms.employee.QualificationRepository;
import com.srmt.repository.hrms.employee.SequenceRepository;
import com.srmt.repository.hrms.employee.WorkExperienceRepository;
import com.srmt.repository.leavemanagement.LeaveEntitlementRepository;
import com.srmt.repository.leavemanagement.LeaveRequestRepository;
import com.srmt.repository.specifications.AttendanceSpecification;
import com.srmt.repository.specifications.EmployeeSpecification;
import com.srmt.repository.specifications.LeaveRequestSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class EmployeeServiceImpl extends GenericServiceImpl<Employee, Long>
		implements EmployeeService {

	@Autowired
	private DocumentRepository documentRepository;

	@Autowired
	private LeaveRequestRepository leaveRequestRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private SequenceRepository sequenceRepository;

	@Autowired
	private DependentRepository dependentRepository;

	@Autowired
	private LanguageProficiencyRepository languageProficiencyRepository;

	@Autowired
	private QualificationRepository qualificationRepository;

	@Autowired
	private WorkExperienceRepository workExperienceRepository;

	@Autowired
	private AttendanceRepository attendanceRepository;

	@Autowired
	private LeaveEntitlementRepository leaveEntitlementRepository;

	@Autowired
	private LocationRepository locationRepository;

	public EmployeeServiceImpl() {
		super(Employee.class);
	}

	@Override
	public Employee add(Employee employee) {

		Sequence sequence = sequenceRepository.findByName("EMPLOYEE_ID");
		if (sequence == null) {
			throw new RuntimeException(
					"Employee Sequence Entry does not exists.");
		}
		employee.setEmployeeId(sequence.getFomatted());
		sequenceRepository.save(sequence);
		return employeeRepository.save(employee);
	}

	@Override
	public Employee findById(Long id) {
		return super.findBy(Employee.class, id);
	}

	@Override
	public Employee upateEmployee(Long id, Employee employee) throws Exception {
		Employee employeeById = employeeRepository.findOne(employee.getId());
		employeeById.setPhotoPath(employee.getPhotoPath());
		if (employee.getSalesRepCode() != null) {
			Employee employeeFromDb = employeeRepository
					.findBysalesRepCode(employee.getSalesRepCode());
			if (employeeFromDb != null
					&& employeeFromDb.getId() != employee.getId()) {
				throw new RuntimeException("Sales Representative code["
						+ employee.getSalesRepCode() + "] Already Exist ");
			}
		}

		super.update(Employee.class, id, null, employee);
		return super.findBy(Employee.class, id);
		// return null;

	}

	@Override
	public void addContact(Employee employee) {
		Employee employeeById = super.findBy(Employee.class, employee.getId());
		employeeById.setAddress(employee.getAddress());
		employeeById.setMobile(employee.getMobile());
		employeeById.setEmail(employee.getEmail());
		employeeById.setHomePhone(employee.getHomePhone());
		employeeById.setWorkPhone(employee.getWorkPhone());
		System.out.println("before workphone is" + employee.getWorkPhone());
		System.out.println("after workphone is" + employeeById.getWorkPhone());
		baseRepository.save(employeeById);

	}

	@Override
	public void addDocuments(Long id, String category, Document document) {
		Employee employeeById = super.findBy(Employee.class, id);
		document.setCategory(category);
		document.setEmployee(employeeById);
		documentRepository.save(document);
	}

	@Override
	public List<Document> getDocuments(Long id, String category) {
		return documentRepository.findByCategoryAndEmployee_Id(category, id);

	}

	@Override
	public void updateDocuments(Long id, Document document) {
		Employee employeeById = super.findBy(Employee.class, id);
		Document documentById = documentRepository.findOne(document.getId());
		if (documentById == null) {
			throw new RuntimeException("Document [" + document.getId()
					+ "] id does not exists.");
		}
		documentById.setEmployee(employeeById);
		documentById.setName(document.getName());
		documentById.setPath(document.getPath());
		documentById.setSize(document.getSize());
		documentById.setType(document.getType());
		documentRepository.save(documentById);

	}

	@Override
	public void deleteDocumentById(long employeeId, long documentId) {
		Document documentById = documentRepository.findOne(documentId);
		if (documentById == null) {
			throw new RuntimeException("Document [" + documentId
					+ "] id does not exists.");
		}
		documentRepository.delete(documentById);

	}

	@Override
	public void addDependent(Long id, Dependent dependent) {
		Employee employeeById = super.findBy(Employee.class, id);
		if (dependent.isNominee() == true) {
			if (employeeById.hasDependentFirst()) {
				throw new RuntimeException("Employee already added Nominee.");
			}
		}

		List<Dependent> dependents = employeeById.getDependents();
		for (Dependent dependent2 : dependents) {
			if (dependent.getRelationType() == RelationType.Father
					|| dependent.getRelationType() == RelationType.Mother
					|| dependent.getRelationType() == RelationType.Wife
					|| dependent.getRelationType() == RelationType.Husband) {

				if (dependent.getRelationType() == dependent2.getRelationType()) {
					throw new RuntimeException("Duplicate Entry for#[ "
							+ dependent.getRelationType() + "]");
				}

			}
		}

		dependent.setEmployee(employeeById);
		employeeById.getDependents().add(dependent);
		dependentRepository.save(dependent);
	}

	@Override
	public void updateDependent(Long id, Dependent dependent) {
		Employee employeeById = super.findBy(Employee.class, id);

		List<Dependent> dependents = employeeById.getDependents();
		for (Dependent dependent2 : dependents) {
			if (dependent.getRelationType() == RelationType.Father
					|| dependent.getRelationType() == RelationType.Mother
					|| dependent.getRelationType() == RelationType.Wife
					|| dependent.getRelationType() == RelationType.Husband) {

				if (dependent.getRelationType() == dependent2.getRelationType()
						&& dependent.getId() != dependent2.getId()) {
					throw new RuntimeException("Duplicate Entry for#[ "
							+ dependent.getRelationType() + "]");
				}

				if (dependent.isNominee() == true
						&& dependent.getId() != dependent2.getId()) {
					if (employeeById.hasDependentFirst()) {
						throw new RuntimeException(
								"Employee already added Nominee.");
					}
				}

			}
		}

		Dependent dependentById = dependentRepository
				.findOne(dependent.getId());
		dependentById.setEmployee(employeeById);
		dependentById.setRelationType(dependent.getRelationType());
		dependentById.setNominee(dependent.isNominee());
		dependentById.setDob(dependent.getDob());
		dependentById.setFisrtName(dependent.getFisrtName());
		dependentRepository.save(dependentById);

	}

	@Override
	public List<Dependent> getAllDependents(Long id) {
		Employee employeeById = super.findBy(Employee.class, id);
		return employeeById.getDependents();
	}

	@Override
	public void deleteDependent(Long id, Long dependentId) {
		Employee employeeById = super.findBy(Employee.class, id);
		Dependent dependent = dependentRepository.findOne(dependentId);
		if (dependent == null) {
			throw new RuntimeException("Dependent #[" + dependentId
					+ "] deos not exists.");
		}
		dependent.setEmployee(null);
		// dependentRepository.save(dependent);
		dependentRepository.delete(dependent);
	}

	@Override
	public Dependent findEmployeeDependentById(Long employeeId, Long dependentId) {
		Employee employeeById = super.findBy(Employee.class, employeeId);
		dependentRepository.findOne(dependentId);
		Dependent dependent = dependentRepository.findOne(dependentId);

		if (dependent != null) {
			throw new RuntimeException("Dependent #[" + dependentId
					+ "] deos not exists.");
		}
		return dependent;
	}

	@Override
	public List<Employee> findEpmloyeeByPageAndSize(int page, int size) {
		return super.findAll(page, size);
	}

	@Override
	public Long getCount() {

		return super.count();
	}

	@Override
	public void addJobDetails(Employee employee) {
		if (employee.getDateOfjoining().isBefore(employee.getDob())) {
			throw new RuntimeException(
					"Date Of joining Must be the After Date Of Birth");
		}
		Employee employeeById = super.findBy(Employee.class, employee.getId());
		employeeById.setDepartment(employee.getDepartment());
		employeeById.setDateOfjoining(employee.getDateOfjoining());
		employeeById.setEmploymentType(employee.getEmploymentType());
		employeeById.setDesignatin(employee.getDesignatin());
		employeeRepository.save(employeeById);
	}

	@Override
	public void addLanguageProficiency(Long id,
			LanguageProficiency languageProficiency) {
		Employee employeeById = super.findBy(Employee.class, id);
		languageProficiency.setEmployee(employeeById);
		LanguageProficiency languageProficiencyFromDb = languageProficiencyRepository
				.findByEmployee_IdAndLanguage_Name(id, languageProficiency
						.getLanguage().getName());
		if (languageProficiencyFromDb != null) {
			throw new RuntimeException("Language [#"
					+ languageProficiencyFromDb.getLanguage().getName()
					+ "] Already Added");
		}
		if (languageProficiency.isCanMotherTounge() == true) {
			for (LanguageProficiency languageProficiency1 : employeeById
					.getLanguageProficiencies()) {
				if (languageProficiency1.isCanMotherTounge() == true) {
					throw new RuntimeException(
							" Your Mother Tounge Language is already added");
				}
			}
		}

		languageProficiencyRepository.save(languageProficiency);

	}

	@Override
	public void updateLanguageProficiency(Long id, Long languageProficiencyId,
			LanguageProficiency languageProficiency) {
		Employee employeeById = super.findBy(Employee.class, id);
		LanguageProficiency languageProficiencyById = languageProficiencyRepository
				.findOne(languageProficiencyId);
		LanguageProficiency languageProficiencyFromDb = languageProficiencyRepository
				.findByEmployee_IdAndLanguage_Name(id, languageProficiency
						.getLanguage().getName());
		if (languageProficiencyFromDb != null
				&& languageProficiencyFromDb.getId() != languageProficiency
						.getId()) {
			throw new RuntimeException("Language [#"
					+ languageProficiencyFromDb.getLanguage().getName()
					+ "] Already Added");
		}

		if (languageProficiency.isCanMotherTounge() == true) {
			for (LanguageProficiency languageProficiency1 : employeeById
					.getLanguageProficiencies()) {
				if (languageProficiency1.isCanMotherTounge() == true
						&& languageProficiency1.getId() != languageProficiency
								.getId()) {
					throw new RuntimeException(
							" Your Mother Tounge Language is already added");
				}

			}
		}

		languageProficiencyById.setCanRead(languageProficiency.isCanRead());
		languageProficiencyById.setCanSpeak(languageProficiency.isCanSpeak());
		languageProficiencyById.setEmployee(employeeById);
		languageProficiencyById.setLanguage(languageProficiency.getLanguage());
		languageProficiencyById.setCanWrite(languageProficiency.isCanWrite());
		languageProficiencyById.setCanMotherTounge(languageProficiency
				.isCanMotherTounge());
		languageProficiencyRepository.save(languageProficiencyById);
	}

	@Override
	public List<LanguageProficiency> getLanguageProficiesById(Long id) {
		Employee employeeById = super.findBy(Employee.class, id);
		return employeeById.getLanguageProficiencies();
	}

	@Override
	public void deleteLanguageProficiency(Long id, Long languageProficiencyId) {
		Employee employeeById = super.findBy(Employee.class, id);
		LanguageProficiency languageProficiency = languageProficiencyRepository
				.findOne(languageProficiencyId);
		languageProficiencyRepository.delete(languageProficiency);
	}

	@Override
	public void addQualifications(Long id, Qualification qualification) {
		Employee employeeById = super.findBy(Employee.class, id);
		qualification.setEmployee(employeeById);
		qualificationRepository.save(qualification);
	}

	@Override
	public void deleteByQualificationById(Long id, Long qualificationId) {
		Qualification qualificationById = qualificationRepository
				.findOne(qualificationId);
		qualificationRepository.delete(qualificationById);
	}

	@Override
	public void addExperience(Long id, WorkExperience workExperience) {
		Employee employeeById = super.findBy(Employee.class, id);
		if (workExperience.getFromDate().isAfter(workExperience.getToDate())) {
			throw new RuntimeException("From date Must be less Than To Date");
		}
		if (workExperience.getFromDate().isAfter(
				employeeById.getDateOfjoining())
				|| workExperience.getToDate().isAfter(
						employeeById.getDateOfjoining())) {
			throw new RuntimeException(
					"Experience Date must Be before the Date Of Joining");
		}
		workExperience.setEmployee(employeeById);
		workExperienceRepository.save(workExperience);

	}

	@Override
	public void updateExperience(Long id, WorkExperience workExperience) {
		Employee employeeById = super.findBy(Employee.class, id);

		WorkExperience workExperienceworkById = workExperienceRepository
				.findOne(workExperience.getId());
		if (workExperienceworkById == null) {
			throw new RuntimeException("WorkExperience #["
					+ workExperience.getId() + " id does not exists.");
		}
		if (workExperience.getFromDate().isAfter(workExperience.getToDate())) {
			throw new RuntimeException("From date Must be less Than To Date");
		}
		if (workExperience.getFromDate().isAfter(
				employeeById.getDateOfjoining())
				|| workExperience.getToDate().isAfter(
						employeeById.getDateOfjoining())) {
			throw new RuntimeException(
					"Experience Date must Be before the Date Of Joining");
		}
		workExperienceworkById.setComments(workExperience.getComments());
		workExperienceworkById.setCompanyName(workExperience.getCompanyName());
		workExperienceworkById.setFromDate(workExperience.getFromDate());
		workExperienceworkById.setToDate(workExperience.getToDate());
		workExperienceworkById.setJobTitle(workExperience.getJobTitle());

		workExperienceRepository.save(workExperienceworkById);
	}

	@Override
	public void deletWorkExperience(Long id, Long experienceId) {
		Employee employeeById = super.findBy(Employee.class, id);
		WorkExperience workExperienceworkById = workExperienceRepository
				.findOne(experienceId);
		if (workExperienceworkById == null) {
			throw new RuntimeException("WorkExperience #[" + experienceId
					+ " id does not exists.");
		}
		workExperienceRepository.delete(workExperienceworkById);
	}

	@Override
	public List<WorkExperience> findWorkExperienceById(Long id) {
		Employee employeeById = super.findBy(Employee.class, id);
		return employeeById.getWorkExperiences();
	}

	@Override
	public void reportto(Employee employee) {
		employee.getSuperior();
		Employee superiorEmployeeById = super.findBy(Employee.class, employee
				.getSuperior().getId());

		Employee employeeById = super.findBy(Employee.class, employee.getId());
		employeeById.setSuperior(superiorEmployeeById);
		employeeById.getReportees().add(superiorEmployeeById);
		employeeById.setReportingCommnets(employee.getReportingCommnets());
		employeeRepository.save(employeeById);

	}

	@Override
	public List<Qualification> getQualificationsById(Long id) {
		Employee employeeById = super.findBy(Employee.class, id);
		return employeeById.getQualifications();
	}

	@Override
	public void updateQualification(Long id, Qualification qualification) {
		Employee employeeById = super.findBy(Employee.class, id);
		Qualification qualificationById = qualificationRepository
				.findOne(qualification.getId());
		qualificationById.setEmployee(employeeById);
		qualificationById.setCollegeName(qualification.getCollegeName());
		qualificationById.setCommnets(qualification.getCommnets());
		qualificationById.setEducationLevel(qualification.getEducationLevel());
		qualificationById.setMarks(qualification.getMarks());
		qualificationById.setSpecialization(qualification.getSpecialization());
		qualificationById.setYearOfPass(qualification.getYearOfPass());
		qualificationRepository.save(qualificationById);
	}

	@Override
	public void addAttendance(Long id, Attendance attendance) {
		Employee employeeById = super.findBy(Employee.class, id);
		attendance.setEmployee(employeeById);
		attendanceRepository.save(attendance);
	}

	@Override
	public void terminateEmloyee(Employee employee) {
		Employee employeeById = super.findBy(Employee.class, employee.getId());
		if (employee.getDateOfjoining() != null) {
			if (employee.getTerminationDate().isBefore(
					employee.getDateOfjoining())) {
				throw new RuntimeException(
						"Termination date should be After the Date Of Joining");
			}

		}

		employeeById.setTerminationDate(employee.getTerminationDate());
		employeeById.setTerminationReason(employee.getTerminationReason());
		employeeById.setNotes(employee.getNotes());
		if (employeeById.getUser() != null) {
			employeeById.getUser().setActive(false);
		}
		employeeById.setActive(false);
		employeeRepository.save(employeeById);
	}

	@Override
	public void setEmployeeStatus(Long id) {
		Employee employee = employeeRepository.findOne(id);
		employee.setActive(true);
		employeeRepository.save(employee);

	}

	@Override
	public List<Employee> findAllActiveEmployee() {
		return employeeRepository.findByActive(true);
	}

	@Override
	public List<Employee> findReporties(Long id) {
		Employee employee = employeeRepository.findOne(id);
		/*
		 * List<Employee> employees = new ArrayList<Employee>(); if
		 * (employee.getUser().getRole().getName().equalsIgnoreCase("ADMIN")) {
		 * employees = employeeRepository.findByIdNotAndActive(id); } else {
		 * 
		 * }
		 */
		return employee.getReportees();
	}

	@Override
	public void apply(Long id, LeaveRequest leaveRequest) {

		Specification<LeaveRequest> specfication = LeaveRequestSpecification
				.validateLeaveRequest(id, leaveRequest.getFromDate(),
						leaveRequest.getToDate());
		List<LeaveRequest> leaveRequestList = leaveRequestRepository
				.findAll(specfication);
		if (leaveRequestList.size() > 0)
			throw new RuntimeException("Leave Request Overlapped");
		Employee employeeById = super.findBy(Employee.class, id);
		leaveRequest.setEmployee(employeeById);
		leaveRequest.setStatus(LeaveRequestStatus.Pending);
		leaveRequestRepository.save(leaveRequest);

	}

	@Override
	public List<LeaveEntitlement> findAllLeaveEntitlementById(Long id) {
		return super.findBy(Employee.class, id).getLeaveEntitlements();
	}

	@Override
	public List<Attendance> findReportingEmployeeAttendance(Long superiorId,
			Long employeeId, LocalDate date) {
		Employee employee = employeeRepository.findOne(superiorId);
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		if (employee != null) {
			throw new RuntimeException("Employee Id #" + superiorId
					+ "] does not exists.");
		}
		if (employee.getRole().equals("ADMIN")) {
			attendanceList
					.addAll((Collection<? extends Attendance>) attendanceRepository
							.findAll());
		} else {
			Specification<Attendance> attendanceSpec = AttendanceSpecification
					.searchByIdAndDate(superiorId, employeeId, date);

			attendanceList.addAll(attendanceRepository.findAll(attendanceSpec));
		}
		return attendanceList;
	}

	@Override
	public List<Attendance> findReportingEmployeeAttendance(Long superiorId,
			Long employeeId, Long locationId, Long departmentId,
			LocalDate fromDate, LocalDate toDate, int page, int size) {
		Employee employee = employeeRepository.findOne(superiorId);
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		if (employee == null) {
			throw new RuntimeException("Employee Id #[" + superiorId
					+ "] does not exists.");
		}

		Specification<Attendance> attendanceSpec = AttendanceSpecification
				.searchByEmployeeLocationDepartmentAndDate(superiorId,
						employeeId, locationId, departmentId, fromDate, toDate);
		attendanceList.addAll(attendanceRepository.findAll(attendanceSpec,
				new PageRequest(page, size)).getContent());

		return attendanceList;
	}

	@Override
	public List<Attendance> findReportingEmployeeAttendanceCount(
			Long superiorId, Long employeeId, Long locationId,
			Long departmentId, LocalDate fromDate, LocalDate toDate) {
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		Specification<Attendance> attendanceSpec = AttendanceSpecification
				.searchByEmployeeLocationDepartmentAndDate(superiorId,
						employeeId, locationId, departmentId, fromDate, toDate);
		attendanceList.addAll(attendanceRepository.findAll(attendanceSpec));

		return attendanceList;
	}

	@Override
	public List<Attendance> findAllEmployeeAttendance(Long employeeId,
			Long locationId, Long departmentId, LocalDate thisfromDate,
			LocalDate thisToDate, int page, int size) {

		List<Attendance> attendanceList = new ArrayList<Attendance>();
		Specification<Attendance> attendanceSpec = AttendanceSpecification
				.searchAllEmployeeByEmployeeLocationDepartmentAndDate(
						employeeId, locationId, departmentId, thisfromDate,
						thisToDate);
		attendanceList.addAll(attendanceRepository.findAll(attendanceSpec,
				new PageRequest(page, size)).getContent());
		return attendanceList;
	}

	@Override
	public List<Attendance> findAllEmployeeAttendanceCount(Long employeeId,
			Long locationId, Long departmentId, LocalDate thisfromDate,
			LocalDate thisToDate) {
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		Specification<Attendance> attendanceSpec = AttendanceSpecification
				.searchAllEmployeeByEmployeeLocationDepartmentAndDate(
						employeeId, locationId, departmentId, thisfromDate,
						thisToDate);
		attendanceList.addAll(attendanceRepository.findAll(attendanceSpec));
		return attendanceList;
	}

	@Override
	public List<Employee> getAllActiveEmployees() {

		return employeeRepository.findByActive(true);
	}

	@Override
	public List<LeaveEntitlement> findEmployeeLeaveEntitlement(Long employeeId) {
		return super.findBy(Employee.class, employeeId).getLeaveEntitlements();
	}

	@Override
	public List<Employee> findAllEmployeesExceptById(Long id) {
		Employee employee = employeeRepository.findOne(id);

		boolean active = true;
		List<Employee> employees = employeeRepository.findByIdNotAndActive(id,
				active);

		return employees;
	}

	@Override
	public List<LeaveEntitlement> findLeaveEntitlementByCalendarYear(Long id,
			Long calendarId, int page, int size) {
		return leaveEntitlementRepository.findByLeavePeriod_IdAndEmployee_Id(
				calendarId, id);
	}

	@Override
	public Employee findSuperior(Long id) {
		Employee employee = employeeRepository.findOne(id);
		return employee.getSuperior();
	}

	@Override
	public List<LeaveEntitlement> findLeaveEntitlementByEmployeeIdAndLeavePeriodId(
			Long employeeId, Long leavePeriodId) {
		return leaveEntitlementRepository.findByLeavePeriod_IdAndEmployee_Id(
				leavePeriodId, employeeId);
	}

	@Override
	public List<Employee> getAllSalesRepresentatives() {
		return employeeRepository.findBysalesRepCodeNotNull();
	}

	@Override
	public List<Employee> searchSalesRepresentativeBysalesRepCodeAndmobile(
			String salesRepCode, String mobile, int page, int size) {
		Specification<Employee> salesRepSpec = EmployeeSpecification
				.searchSalesRepresentativeBysalesRepCodeAndmobile(salesRepCode,
						mobile);
		return employeeRepository.findAll(salesRepSpec,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchSalesRepresentativeBysalesRepCodeAndmobileCount(
			String salesRepCode, String mobile) {
		Specification<Employee> salesRepSpec = EmployeeSpecification
				.searchSalesRepresentativeBysalesRepCodeAndmobile(salesRepCode,
						mobile);
		return employeeRepository.findAll(salesRepSpec).size();
	}

	@Override
	public List<Location> findAllLocationsById(Long empId) {
		return employeeRepository.findOne(empId).getLocations();
	}

	@Override
	public void addLocations(Long empId, Employee employee) {
		Employee emp = employeeRepository.findOne(empId);
		emp.setLocations(employee.getLocations());
		emp.setProductLines(employee.getProductLines());
		employeeRepository.save(emp);
	}

	@Override
	public List<Employee> searchEmployeeByIdAndLocationAndDepartment(
			Long employeeId, Long locationId, Long departmentId, int page,
			int size) {
		Specification<Employee> specifications = EmployeeSpecification
				.searchEmployeeByIdAndLocationAndDepartment(employeeId,
						locationId, departmentId);
		return employeeRepository.findAll(specifications,
				new PageRequest(page, size)).getContent();
	}

	@Override
	public int searchEmployeeByIdAndLocationAndDepartmentCount(Long employeeId,
			Long locationId, Long departmentId) {
		Specification<Employee> specifications = EmployeeSpecification
				.searchEmployeeByIdAndLocationAndDepartment(employeeId,
						locationId, departmentId);
		return employeeRepository.findAll(specifications).size();
	}

	@Override
	public EmployeeLocationAndProductlineDto getLocationsAndVehicleModelsByEmployeeId(
			Long employeeId) {
		Employee employeeById = employeeRepository.findOne(employeeId);
		EmployeeLocationAndProductlineDto locationsAndModels = new EmployeeLocationAndProductlineDto();
		locationsAndModels.setLocations(employeeById.getLocations());
		locationsAndModels.setProductLines(employeeById.getProductLines());
		return locationsAndModels;
	}

	@Override
	public List<Employee> getAllActiveAndUserNotNullEmployees() {

		return employeeRepository.findByuserNullAndActive(true);
	}

}
