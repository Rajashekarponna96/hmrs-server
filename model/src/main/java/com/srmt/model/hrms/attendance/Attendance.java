package com.srmt.model.hrms.attendance;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.LocalTimeRange;
import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jackson.serializer.LocalTimeDeSerilizer;
import com.arbiva.date.jackson.serializer.LocalTimeSerilizer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.arbiva.date.jpa.converters.LocalTimeConverter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.rest.model.IEntity;

@Entity
@Table(name = "hrms_Attendance")
@Audited
@EntityListeners(AuditingEntityListener.class)
public class Attendance implements IEntity<Attendance>,Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Employee employee;

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate date;

	@Convert(converter = LocalTimeConverter.class)
	@JsonDeserialize(using = LocalTimeDeSerilizer.class)
	@JsonSerialize(using = LocalTimeSerilizer.class)
	private LocalTime timeIn;

	@Convert(converter = LocalTimeConverter.class)
	@JsonDeserialize(using = LocalTimeDeSerilizer.class)
	@JsonSerialize(using = LocalTimeSerilizer.class)
	private LocalTime timeout;

	private String commnets;

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

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getCommnets() {
		return commnets;
	}

	public void setCommnets(String commnets) {
		this.commnets = commnets;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalTime getTimeIn() {
		return timeIn;
	}

	public void setTimeIn(LocalTime timeIn) {
		this.timeIn = timeIn;
	}

	public LocalTime getTimeout() {
		return timeout;
	}

	public void setTimeout(LocalTime timeout) {
		this.timeout = timeout;
	}

	public LocalTimeRange getShiftTiming() {
		return new LocalTimeRange(timeIn, timeout);
	}

	@Override
	public void copy(Attendance toEntity) {
		toEntity.setCommnets(commnets);
		toEntity.setDate(date);
		toEntity.setEmployee(employee);
		toEntity.setTimeIn(timeIn);
		toEntity.setTimeout(timeout);
	}

	@Override
	public Long getId() {
		return this.id;
	}

}
