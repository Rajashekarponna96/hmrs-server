package com.srmt.model.hrms.administration;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.arbiva.date.LocalTimeRange;
import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jackson.serializer.LocalTimeMinuteDeserilizer;
import com.arbiva.date.jackson.serializer.LocalTimeMinuteSerilizer;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.arbiva.date.jpa.converters.LocalTimeMinuteConverter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.rest.model.IEntity;

@Audited
@Entity
@Table(name = "hrms_workShift_master")
@EntityListeners(AuditingEntityListener.class)
public class WorkShift implements Serializable, IEntity<WorkShift> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6373854527930590367L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@Convert(converter = LocalTimeMinuteConverter.class)
	@JsonDeserialize(using = LocalTimeMinuteDeserilizer.class)
	@JsonSerialize(using = LocalTimeMinuteSerilizer.class)
	private LocalTime fromTime;

	@Convert(converter = LocalTimeMinuteConverter.class)
	@JsonDeserialize(using = LocalTimeMinuteDeserilizer.class)
	@JsonSerialize(using = LocalTimeMinuteSerilizer.class)
	private LocalTime toTime;

	@Column(length = 1024)
	private String description;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "workShift")
	private List<WorkShiftBreak> workShiftBreaks;

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

	public WorkShift() {
		workShiftBreaks = new ArrayList<WorkShiftBreak>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalTimeRange getShiftTiming() {
		return new LocalTimeRange(fromTime, toTime);
	}

	public LocalTime getFromTime() {
		return fromTime;
	}

	public void setFromTime(LocalTime fromTime) {
		this.fromTime = fromTime;
	}

	public LocalTime getToTime() {
		return toTime;
	}

	public void setToTime(LocalTime toTime) {
		this.toTime = toTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<WorkShiftBreak> getWorkShiftBreaks() {
		return workShiftBreaks;
	}

	public void setWorkShiftBreaks(List<WorkShiftBreak> workShiftBreaks) {
		this.workShiftBreaks.clear();
		this.workShiftBreaks.addAll(workShiftBreaks);
	}

	public void validateBreak(LocalTime fromOtherTime, LocalTime toOtherTime) {

		if (fromOtherTime.isBefore(fromTime) || toOtherTime.isAfter(toTime)) {
			throw new RuntimeException("Please enter valid Break Time");
		}

	}

	@Override
	public void copy(WorkShift toEntity) {
		toEntity.setId(id);
		toEntity.setName(name);
		toEntity.setDescription(description);
		toEntity.setFromTime(fromTime);
		toEntity.setToTime(toTime);
		toEntity.setWorkShiftBreaks(workShiftBreaks);
		for (WorkShiftBreak workShiftBreak : workShiftBreaks) {
			workShiftBreak.setWorkShift(toEntity);
		}
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
		WorkShift other = (WorkShift) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
