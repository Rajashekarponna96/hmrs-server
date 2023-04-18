package com.srmt.model.hrms.leaveaManagement;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EntityManager;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.arbiva.date.LocalDateRange;
import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.crm.fh.Booking;
import com.srmt.model.crm.fh.BookingStatus;
import com.srmt.model.crm.fh.FunctionHall;
import com.srmt.model.crm.fh.FunctionHallEnquiry;
import com.srmt.model.hrms.administration.LeaveType;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Entity
@Table(name = "hrms_LeaveRequest")
@EntityValidators(value = { @EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateLeaveRequest") })
@EntityListeners(AuditingEntityListener.class)
public class LeaveRequest implements IEntity<LeaveRequest> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Employee employee;

	@OneToOne
	private LeaveType leaveType;

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate fromDate;

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate toDate;

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime appliedOn;

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime respondedOn;

	@Enumerated
	private LeaveRequestStatus status;

	private String reason;

	private String comments;

	@ManyToOne
	private LeaveEntitlement leaveEntitlement;

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

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

	public LeaveRequest() {
		this.appliedOn = LocalDateTime.now();
	}
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

	public LeaveEntitlement getLeaveEntitlement() {
		return leaveEntitlement;
	}

	public void setLeaveEntitlement(LeaveEntitlement leaveEntitlement) {
		this.leaveEntitlement = leaveEntitlement;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}

	public LeaveType getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(LeaveType leaveType) {
		this.leaveType = leaveType;
	}

	public LeaveRequestStatus getStatus() {
		return status;
	}

	public void setStatus(LeaveRequestStatus status) {
		this.status = status;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public LocalDateTime getAppliedOn() {
		return appliedOn;
	}

	public void setAppliedOn(LocalDateTime appliedOn) {
		this.appliedOn = appliedOn;
	}

	public LocalDateTime getRespondedOn() {
		return respondedOn;
	}

	public void setRespondedOn(LocalDateTime respondedOn) {
		this.respondedOn = respondedOn;
	}

	public long getDays() {
		LocalDate plusOneDay=null;
		if(toDate!=null){
			 plusOneDay=toDate.plusDays(1);
		}
			
		
		return new LocalDateRange(fromDate, plusOneDay).getPeriodinDays();
	
	}

	@Override
	public void copy(LeaveRequest toEntity) {
		toEntity.setComments(comments);
		toEntity.setEmployee(employee);
		toEntity.setFromDate(fromDate);
		toEntity.setId(id);
		toEntity.setLeaveType(leaveType);
		toEntity.setReason(reason);
		toEntity.setStatus(status);
		toEntity.setToDate(toDate);

	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LeaveRequest other = (LeaveRequest) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public void validateLeaveRequest(SimpleJpaRepository simpleJpaRepository,
			EntityManager em) {
		Specification<LeaveRequest> spec = new Specification<LeaveRequest>() {
			@Override
			public Predicate toPredicate(Root<LeaveRequest> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				Predicate predicate1 = cb.lessThan(
						root.<LocalDate> get("fromDateTime"), getFromDate());
				Predicate predicate2 = cb.greaterThan(
						root.<LocalDate> get("toDateTime"), getFromDate());

				Predicate condition1 = cb.and(predicate1, predicate2);

				Predicate predicate3 = cb.lessThan(
						root.<LocalDate> get("fromDateTime"), getToDate());
				Predicate predicate4 = cb.greaterThan(
						root.<LocalDate> get("toDateTime"), getToDate());

				Predicate condition2 = cb.and(predicate3, predicate4);

				predicates.add(cb.or(condition1, condition2));
				predicates.add(cb.equal(root.<Employee> get("employee")
						.<List<LeaveEntitlement>> get("leaveEntitlements"),
						leaveEntitlement));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
		SimpleJpaRepository<LeaveRequest, Long> leaveRequestRepository = new SimpleJpaRepository<LeaveRequest, Long>(
				LeaveRequest.class, em);
		List<LeaveRequest> leaveRequestList = leaveRequestRepository
				.findAll(spec);
		if (!leaveRequestList.isEmpty()) {
			throw new RuntimeException("Overlapped Leave Request");
		}
	}

}
