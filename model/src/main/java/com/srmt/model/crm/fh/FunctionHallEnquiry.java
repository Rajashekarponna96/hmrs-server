package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
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
import javax.persistence.Transient;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

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
import com.srmt.model.hrms.Person;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Entity
@Table(name = "crm_fh_enquiry")
@Access(AccessType.PROPERTY)
@EntityValidators(value = { @EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateDateRange") })
@EntityListeners(AuditingEntityListener.class)
public class FunctionHallEnquiry implements IEntity<FunctionHallEnquiry>,
		Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

	private FunctionHall functionHall;

	private Person customer;

	private LocalDate enquiredOn;

	private LocalDateTime requiredFromDate;

	private LocalDateTime requiredToDate;
	

	private String source;

	private String purpose;

	private BookingStatus bookingStatus;

	private Booking booking;

	@CreatedDate
	private LocalDateTime createDateTime;
	@LastModifiedDate
	private LocalDateTime modifiedDate;

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

	@JsonIgnore
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(LocalDateTime createDateTime) {
		this.createDateTime = createDateTime;
	}

	@JsonIgnore
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(LocalDateTime modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	@JsonIgnore
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@JsonIgnore
	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public FunctionHallEnquiry() {
		enquiredOn = LocalDate.now();
	}

	@SuppressWarnings("unchecked")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne(cascade = CascadeType.MERGE)
	public FunctionHall getFunctionHall() {
		return functionHall;
	}

	public void setFunctionHall(FunctionHall functionHall) {
		this.functionHall = functionHall;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	public Person getCustomer() {
		return customer;
	}

	public void setCustomer(Person customer) {
		this.customer = customer;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getEnquiredOn() {
		return enquiredOn;
	}

	public void setEnquiredOn(LocalDate enquiredOn) {
		this.enquiredOn = enquiredOn;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	@Enumerated
	public BookingStatus getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(BookingStatus bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

	@JsonIgnore
	@OneToOne(mappedBy="functionHallEnquiry")
	public Booking getBooking() {
		return booking;
	}

	@JsonProperty
	public void setBooking(Booking booking) {
		this.booking = booking;
		// this.booking.setEnquiry(this);
	}

	@Override
	public void copy(FunctionHallEnquiry toEntity) {
		toEntity.setCustomer(customer);
		toEntity.setEnquiredOn(enquiredOn);
		toEntity.setFunctionHall(functionHall);
		toEntity.setPurpose(purpose);
		toEntity.setRequiredFromDate(requiredFromDate);
		toEntity.setRequiredToDate(requiredToDate);
		toEntity.setSource(source);
		toEntity.setBookingStatus(getBookingStatus());

	}

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getRequiredFromDate() {
		return requiredFromDate;
	}

	public void setRequiredFromDate(LocalDateTime requiredFromDate) {
		this.requiredFromDate = requiredFromDate;
	}

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getRequiredToDate() {
		return requiredToDate;
	}

	public void setRequiredToDate(LocalDateTime requiredToDate) {
		this.requiredToDate = requiredToDate;
	}

	public void validateDateRange(SimpleJpaRepository repository,
			EntityManager em) {
		if (requiredFromDate.isAfter(requiredToDate)) {
			throw new RuntimeException(
					"From date cannot be greater than To date");
		}
	}

	@Transient
	public boolean isBooked() {
		return booking != null ? true : false;
	}
	
	@Transient
	public boolean isExpired() {
		return requiredFromDate.isBefore(LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0))); 
	}
}
