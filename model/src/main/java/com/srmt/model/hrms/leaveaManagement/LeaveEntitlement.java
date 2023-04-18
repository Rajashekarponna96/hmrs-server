package com.srmt.model.hrms.leaveaManagement;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.LeaveType;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.rest.model.IEntity;

@Audited
@Entity
@Table(name = "hrms_LeaveEntitlement")
@EntityListeners(AuditingEntityListener.class)
public class LeaveEntitlement implements IEntity<LeaveEntitlement>, Cloneable,Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private LeaveType leaveType;

	private Double days;

	@ManyToOne
	private LeavePeriod leavePeriod;

	@Column(length = 1024)
	private String comments;

	private Boolean allowCarryForward;

	private Double carryForwardDays;

	private Double balance;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "leaveEntitlement")
	private List<LeaveRequest> leaveRequests;

	@ManyToOne
	private Employee employee;

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

	public LeaveEntitlement() {
		leaveRequests = new ArrayList<LeaveRequest>();
	}

	@JsonIgnore
	public List<LeaveRequest> getLeaveRequests() {
		return leaveRequests;
	}

	@JsonProperty
	public void setLeaveRequests(List<LeaveRequest> leaveRequests) {
		this.leaveRequests = leaveRequests;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LeaveType getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(LeaveType leaveType) {
		this.leaveType = leaveType;
	}

	public Double getDays() {
		return days;
	}

	public void setDays(Double days) {
		this.days = days;
	}

	public LeavePeriod getLeavePeriod() {
		return leavePeriod;
	}

	public void setLeavePeriod(LeavePeriod leavePeriod) {
		this.leavePeriod = leavePeriod;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Boolean getAllowCarryForward() {
		return allowCarryForward;
	}

	public void setAllowCarryForward(Boolean allowCarryForward) {
		this.allowCarryForward = allowCarryForward;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Double getCarryForwardDays() {
		return carryForwardDays;
	}

	public void setCarryForwardDays(Double carryForwardDays) {
		this.carryForwardDays = carryForwardDays;
	}

	/*public long getPendingLeaves() {
		return leaveRequests == null ? 0 : leaveRequests.stream()
				.filter(l -> l.getStatus().equals(LeaveRequestStatus.Pending))
				.count();
	}*/
	
public long getPendingLeaves() {
	long	pendingleavedays=0;
	List<LeaveRequest> leaveRequsts=new ArrayList<LeaveRequest>();
	for (LeaveRequest leaveRequest : leaveRequests) {
		if(leaveRequest.getStatus()==LeaveRequestStatus.Pending){
			leaveRequsts.add(leaveRequest);
		}
		
	}
	for (LeaveRequest leaveRequest : leaveRequsts) {
		pendingleavedays=pendingleavedays+leaveRequest.getDays();
	}
	return pendingleavedays;
}
	
	


	public long getTakenLeaves() {
		long	leavetaken=0;
		List<LeaveRequest> leaveRequsts=new ArrayList<LeaveRequest>();
		for (LeaveRequest leaveRequest : leaveRequests) {
			if(leaveRequest.getStatus()==LeaveRequestStatus.Approved){
				leaveRequsts.add(leaveRequest);
			}
			
		}
		for (LeaveRequest leaveRequest : leaveRequsts) {
			leavetaken=leavetaken+leaveRequest.getDays();
		}
		return leavetaken;
	}

	public void adjustLeave(long leaveDays) {
		balance = balance - leaveDays;
	}

	@Override
	public void copy(LeaveEntitlement toEntity) {
		toEntity.setComments(comments);
		toEntity.setDays(days);
		toEntity.setLeavePeriod(leavePeriod);
		toEntity.setLeaveType(leaveType);
		toEntity.setAllowCarryForward(allowCarryForward);
		toEntity.setCarryForwardDays(carryForwardDays);
		toEntity.setEmployee(employee);
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
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
		LeaveEntitlement other = (LeaveEntitlement) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public String getEmployeeFullName() {
		return employee.getFullName();
	}

	@Override
	public LeaveEntitlement clone() throws CloneNotSupportedException {
		LeaveEntitlement leaveEntitlement = new LeaveEntitlement();
		leaveEntitlement.setAllowCarryForward(allowCarryForward);
		leaveEntitlement.setBalance(balance);
		leaveEntitlement.setCarryForwardDays(carryForwardDays);
		leaveEntitlement.setComments(comments);
		leaveEntitlement.setDays(days);
		leaveEntitlement.setEmployee(employee);
		leaveEntitlement.setId(id);
		leaveEntitlement.setLeavePeriod(leavePeriod);
		leaveEntitlement.setLeaveRequests(leaveRequests);
		leaveEntitlement.setLeaveType(leaveType);
		return leaveEntitlement;
	}

}
