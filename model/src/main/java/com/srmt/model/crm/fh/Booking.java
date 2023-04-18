package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
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
import com.srmt.model.hrms.administration.Sequence;
import com.srmt.model.hrms.employee.Document;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Entity
@Table(name = "crm_fh_booking")
@EntityValidators(value = {
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateBookingStatusForDate"),
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "incrementBookingSequence") ,
		@EntityValidator(requestMethod = "PUT", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateBookingStatusForDate"),
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "checkForActiveRateCard")})
@EntityListeners(AuditingEntityListener.class)
public class Booking implements IEntity<Booking>, Serializable {

	private static final long serialVersionUID = -1977981209719182922L;

	private Long id;

	private FunctionHall functionHall;

	private LocalDateTime fromDateTime;

	private LocalDateTime toDateTime;

	private String groomName;

	private String groomFatherName;

	private String brideName;

	private String brideFatherName;

	private LocalDateTime marriageDate;

	private String celebrityName;

	private int additionalRooms;

	private FunctionHallEnquiry functionHallEnquiry;


	private Invoice invoice;

	@JsonIgnore
	private List<Payment> payments;

	private Document weddingCard;

	private LocalDate bookingDate;

	@CreatedDate
	private LocalDateTime createDateTime;
	@LastModifiedDate
	private LocalDateTime modifiedDate;

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

	@Transient
	private List<String> receiptNumbers;

	private String bookingSerialNo;
	
	
	private String reason;

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
		Booking other = (Booking) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
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

	public Booking() {
		bookingDate = LocalDate.now();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroomName() {
		return groomName;
	}

	public void setGroomName(String groomName) {
		this.groomName = groomName;
	}

	public String getGroomFatherName() {
		return groomFatherName;
	}

	public void setGroomFatherName(String groomFatherName) {
		this.groomFatherName = groomFatherName;
	}

	public String getBrideName() {
		return brideName;
	}

	public void setBrideName(String brideName) {
		this.brideName = brideName;
	}

	public String getBrideFatherName() {
		return brideFatherName;
	}

	public void setBrideFatherName(String brideFatherName) {
		this.brideFatherName = brideFatherName;
	}

	public String getCelebrityName() {
		return celebrityName;
	}

	public void setCelebrityName(String celebrityName) {
		this.celebrityName = celebrityName;
	}

	public int getAdditionalRooms() {
		return additionalRooms;
	}

	public void setAdditionalRooms(int additionalRooms) {
		this.additionalRooms = additionalRooms;
	}

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getFromDateTime() {
		return fromDateTime;
	}

	public void setFromDateTime(LocalDateTime fromDateTime) {
		this.fromDateTime = fromDateTime;
	}

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getToDateTime() {
		return toDateTime;
	}

	public void setToDateTime(LocalDateTime toDateTime) {
		this.toDateTime = toDateTime;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "booking")
	public List<Payment> getPayments() {
		return payments;
	}

	@JsonProperty
	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	public Document getWeddingCard() {
		return weddingCard;
	}

	public void setWeddingCard(Document weddingCard) {
		this.weddingCard = weddingCard;
	}

	@OneToOne(cascade = CascadeType.MERGE)
	public FunctionHallEnquiry getFunctionHallEnquiry() {
		return functionHallEnquiry;
	}

	public void setFunctionHallEnquiry(FunctionHallEnquiry enquiry) {
		this.functionHallEnquiry = enquiry;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	@ManyToOne
	public FunctionHall getFunctionHall() {
		return functionHall;
	}

	public void setFunctionHall(FunctionHall functionHall) {
		this.functionHall = functionHall;
	}

	@OneToOne(cascade=CascadeType.ALL,mappedBy="booking")
	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}
	
	

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	@Transient
	public List<String> getReceiptNumbers() {
		List<String> receiptNumbers = new ArrayList<String>();
		payments.forEach(p -> receiptNumbers.add(p.getReceiptNumber()));
		return receiptNumbers;
	}

	@Override
	public void copy(Booking toEntity) {
		toEntity.setFromDateTime(fromDateTime);
		toEntity.setToDateTime(toDateTime);
		toEntity.setAdditionalRooms(additionalRooms);
		toEntity.setBrideFatherName(brideFatherName);
		toEntity.setCelebrityName(celebrityName);
		toEntity.setGroomFatherName(groomFatherName);
		toEntity.setGroomName(groomName);
		toEntity.setMarriageDate(marriageDate);
		toEntity.setWeddingCard(weddingCard);
		toEntity.setReason(reason);
		functionHallEnquiry.copy(toEntity.getFunctionHallEnquiry());
	}

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getMarriageDate() {
		return marriageDate;
	}

	public void setMarriageDate(LocalDateTime marriageDate) {
		this.marriageDate = marriageDate;
	}

	public void setReceiptNumbers(List<String> receiptNumbers) {
		this.receiptNumbers = receiptNumbers;
	}

	public String getBookingSerialNo() {
		return bookingSerialNo;
	}

	public void setBookingSerialNo(String bookingSerialNo) {
		this.bookingSerialNo = bookingSerialNo;
	}

	public void incrementBookingSequence(SimpleJpaRepository repository,
			EntityManager em) {

		// validateEventDate(repository, em);
		SimpleJpaRepository<Sequence, Long> sequenceRepository = new SimpleJpaRepository<Sequence, Long>(
				Sequence.class, em);

		Specification<Sequence> spec = new Specification<Sequence>() {
			@Override
			public Predicate toPredicate(Root<Sequence> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("name"), "BOOKING_SEQUENCE"));
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
		Sequence sequence = (Sequence) sequenceRepository.findOne(spec);
		if (sequence == null) {
			throw new RuntimeException("Booking Sequence Does not exists");
		}

		this.bookingSerialNo = "B" + sequence.getFomatted();
		repository.save(sequence);
	}

	public void validateBookingStatusForDate(
			SimpleJpaRepository simpleJpaRepository, EntityManager em) {
		Specification<Booking> spec = new Specification<Booking>() {
			@Override
			public Predicate toPredicate(Root<Booking> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				Predicate predicate1 = cb.lessThan(
						root.<LocalDateTime> get("fromDateTime"),
						getFromDateTime());
				Predicate predicate2 = cb.greaterThan(
						root.<LocalDateTime> get("toDateTime"),
						getFromDateTime());

				Predicate condition1 = cb.and(predicate1, predicate2);
				
				Predicate predicate3 = cb.lessThan(
						root.<LocalDateTime> get("fromDateTime"),
						getToDateTime());
				Predicate predicate4 = cb.greaterThan(
						root.<LocalDateTime> get("toDateTime"),
						getToDateTime());
				
				Predicate condition2 = cb.and(predicate3, predicate4);
				
				predicates.add(cb.or(condition1, condition2));
				predicates.add(cb.equal(
						root.<FunctionHallEnquiry> get("functionHallEnquiry")
								.get("bookingStatus"), BookingStatus.confirm));
				predicates.add(cb.equal(
						root.<FunctionHallEnquiry> get("functionHallEnquiry")
								.<FunctionHall> get("functionHall")
								.<Long> get("id"), functionHallEnquiry
								.getFunctionHall().getId()));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
		SimpleJpaRepository<Booking, Long> bookingRepository = new SimpleJpaRepository<Booking, Long>(
				Booking.class, em);
		List<Booking> bookingList = bookingRepository.findAll(spec);
		if (!bookingList.isEmpty()) {
			throw new RuntimeException("Function hall is alreay booked.");

		}
	}
	
	

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void checkForActiveRateCard(SimpleJpaRepository simpleJpaRepository, EntityManager em) {
		System.out.println("functionHall Enquiry is"+functionHallEnquiry);
		if (functionHallEnquiry.getFunctionHall().getActiveRateCard()==null) {
			throw new RuntimeException("Function hall Must have  one Active RateCard");

		}
	}

	
	
 
}
