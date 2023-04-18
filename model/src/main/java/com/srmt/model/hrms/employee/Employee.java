package com.srmt.model.hrms.employee;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.common.lookups.State;
import com.srmt.model.hrms.Address;
import com.srmt.model.hrms.Person;
import com.srmt.model.hrms.administration.Department;
import com.srmt.model.hrms.administration.Designation;
import com.srmt.model.hrms.administration.EmploymentType;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;
import com.srmt.model.sales.Customer;
import com.srmt.model.sales.tdv.ProductLine;
import com.srmt.model.usermanagement.User;
import com.srmt.rest.model.IEntity;

@Entity
@Table(name = "hrms_employee")
@Audited(auditParents = { Person.class })
@EntityListeners(AuditingEntityListener.class)
public class Employee extends Person implements IEntity<Employee> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String employeeId;

	private boolean active;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "employee")
	private List<Document> documents;

	@Embedded
	private Address presentAddress;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "superior")
	private List<Employee> reportees;

	@JsonIgnore
	@ManyToOne(optional = true)
	private Employee superior;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "employee")
	private List<Dependent> dependents;

	@ManyToOne
	private Department department;

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate dateOfjoining;

	@ManyToOne
	private EmploymentType employmentType;

	@ManyToOne
	private State jobLocation;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "employee")
	private List<LanguageProficiency> languageProficiencies;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "employee")
	private List<Qualification> qualifications;

	private String terminationReason;

	private String notes;

	@ManyToOne
	private Designation designatin;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "employee")
	private User user;

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate terminationDate;

	@OneToOne(cascade = CascadeType.ALL)
	private Dependent primaryDependent;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "employee")
	private List<WorkExperience> workExperiences;

	private String reportingCommnets;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "employee")
	private List<Attendance> attendances;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "employee")
	private List<LeaveEntitlement> leaveEntitlements;

	@CreatedDate
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime createDateTime;

	@LastModifiedDate
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime modifiedDate;

	private String salesManager;

	private String salesRepCode;

	private String salesRemarks;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "salesRepresentative")
	private List<Customer> salesCustomers;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "sales_rep_productLines")
	private List<ProductLine> productLines;

	@ManyToMany
	@JoinTable(name = "sales_salesRepo_locations")
	private List<Location> locations;

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

	public LocalDateTime getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(LocalDateTime createDateTime) {
		this.createDateTime = createDateTime;
	}

	public LocalDateTime getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(LocalDateTime modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public Employee() {
		workExperiences = new ArrayList<WorkExperience>();
		qualifications = new ArrayList<Qualification>();
		languageProficiencies = new ArrayList<LanguageProficiency>();
		dependents = new ArrayList<Dependent>();
		attendances = new ArrayList<Attendance>();
		leaveEntitlements = new ArrayList<LeaveEntitlement>();
		documents = new ArrayList<Document>();

	}

	public Address getPresentAddress() {
		return presentAddress;
	}

	public void setPresentAddress(Address presentAddress) {
		this.presentAddress = presentAddress;
	}

	@JsonIgnore
	public List<Dependent> getDependents() {
		return dependents;
	}

	@JsonProperty
	public void setDependents(List<Dependent> dependents) {
		this.dependents.clear();
		this.dependents.addAll(dependents);
		this.dependents.forEach(f -> f.setEmployee(this));
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public LocalDate getDateOfjoining() {
		return dateOfjoining;
	}

	public void setDateOfjoining(LocalDate dateOfjoining) {
		this.dateOfjoining = dateOfjoining;
	}

	public EmploymentType getEmploymentType() {
		return employmentType;
	}

	public void setEmploymentType(EmploymentType employmentType) {
		this.employmentType = employmentType;
	}

	public State getJobLocation() {
		return jobLocation;
	}

	public void setJobLocation(State jobLocation) {
		this.jobLocation = jobLocation;
	}

	@JsonIgnore
	public List<LanguageProficiency> getLanguageProficiencies() {
		return languageProficiencies;
	}

	@JsonProperty
	public void setLanguageProficiencies(
			List<LanguageProficiency> languageProficiencies) {
		this.languageProficiencies.clear();
		this.languageProficiencies.addAll(languageProficiencies);

	}

	@JsonIgnore
	public List<Employee> getReportees() {
		return reportees;
	}

	@JsonProperty
	public void setReportees(List<Employee> reportees) {
		this.reportees.clear();
		this.reportees.addAll(reportees);
	}

	@JsonIgnore
	public Employee getSuperior() {
		return superior;
	}

	@JsonProperty
	public void setSuperior(Employee superior) {
		this.superior = superior;
	}

	public List<Qualification> getQualifications() {
		return qualifications;
	}

	public void setQualifications(List<Qualification> qualifications) {
		this.qualifications = qualifications;
	}

	public String getTerminationReason() {
		return terminationReason;
	}

	public void setTerminationReason(String terminationReason) {
		this.terminationReason = terminationReason;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public LocalDate getTerminationDate() {
		return terminationDate;
	}

	public void setTerminationDate(LocalDate terminationDate) {
		this.terminationDate = terminationDate;
	}

	public boolean hasDependent(Long id) {
		return dependents.stream()
				.filter(d -> d.isNominee() && d.getId() != id).findAny()
				.isPresent();
	}

	public String getSalesRepCode() {
		return salesRepCode;
	}

	public void setSalesRepCode(String salesRepCode) {
		this.salesRepCode = salesRepCode;
	}

	/*
	 * public boolean hasDependentFirst() { return dependents.stream().filter(d
	 * -> d.getNominee()).findAny() .isPresent(); }
	 */
	public boolean hasDependentFirst() {
		return dependents.stream().filter(d -> d.isNominee()).findAny()
				.isPresent();
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Dependent getPrimaryDependent() {
		return primaryDependent;
	}

	public void setPrimaryDependent(Dependent primaryDependent) {
		this.primaryDependent = primaryDependent;
	}

	public Designation getDesignatin() {
		return designatin;
	}

	public void setDesignatin(Designation designatin) {
		this.designatin = designatin;
	}

	@JsonIgnore
	public List<WorkExperience> getWorkExperiences() {
		return workExperiences;
	}

	@JsonProperty
	public void setWorkExperiences(List<WorkExperience> workExperiences) {
		this.workExperiences.clear();
		this.workExperiences.addAll(workExperiences);
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getReportingCommnets() {
		return reportingCommnets;
	}

	public void setReportingCommnets(String reportingCommnets) {
		this.reportingCommnets = reportingCommnets;
	}

	@JsonIgnore
	public List<Attendance> getAttendances() {
		return attendances;
	}

	@JsonProperty
	public void setAttendances(List<Attendance> attendances) {
		this.attendances.clear();
		this.attendances.addAll(attendances);
	}

	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents.clear();
		this.documents.addAll(documents);
	}

	@JsonIgnore
	public List<LeaveEntitlement> getLeaveEntitlements() {
		return leaveEntitlements;
	}

	@JsonProperty
	public void setLeaveEntitlements(List<LeaveEntitlement> leaveEntitlements) {
		this.leaveEntitlements.clear();
		this.leaveEntitlements.addAll(leaveEntitlements);
	}

	public Long getId() {
		return id;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	@JsonProperty
	public void setUser(User user) {
		this.user = user;
	}

	@Transient
	public String getRole() {
		return user == null ? null : user.getRole().getName();
	}

	public String getSalesManager() {
		return salesManager;
	}

	public void setSalesManager(String salesManager) {
		this.salesManager = salesManager;
	}

	public String getSalesRemarks() {
		return salesRemarks;
	}

	public void setSalesRemarks(String salesRemarks) {
		this.salesRemarks = salesRemarks;
	}

	@JsonIgnore
	public List<Location> getLocations() {
		return locations;
	}

	@JsonProperty
	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

	@JsonIgnore
	public List<ProductLine> getProductLines() {
		return productLines;
	}

	@JsonProperty
	public void setProductLines(List<ProductLine> productLines) {
		this.productLines = productLines;
	}
	
	public List<Customer> getSalesCustomers() {
		return salesCustomers;
	}

	public void setSalesCustomers(List<Customer> salesCustomers) {
		this.salesCustomers = salesCustomers;
	}

	@Override
	public void copy(Employee toEntity) {
		toEntity.setActive(active);
		toEntity.setDateOfjoining(dateOfjoining);
		toEntity.setDepartment(department);
		toEntity.setDesignatin(designatin);
		toEntity.setEmploymentType(employmentType);
		toEntity.setUser(user);
		toEntity.setDepartment(department);
		toEntity.setSuperior(superior);
		toEntity.setLocations(locations);
		toEntity.setFisrtName(getFisrtName());
		toEntity.setLastName(getLastName());
		toEntity.setMiddleName(getMiddleName());
		toEntity.setFullName(getFullName());
		toEntity.setDob(getDob());
		toEntity.setGender(getGender());
		toEntity.setMaritalStutus(getMaritalStutus());
		toEntity.setBloodGroup(getBloodGroup());
		toEntity.setPrimaryDependent(primaryDependent);
		toEntity.setSalesRepCode(salesRepCode);
		toEntity.setSalesManager(salesManager);
		toEntity.setProductLines(productLines);
		toEntity.setSalesCustomers(salesCustomers);
	}

	@Transient
	public String getSuperiorFullName() {
		return superior == null ? null : superior.getFullName();
	}

}
