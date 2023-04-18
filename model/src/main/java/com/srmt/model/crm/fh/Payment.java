package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EntityManager;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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

import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.arbiva.lang.Money;
import com.arbiva.util.NumberToWord;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.hrms.administration.Sequence;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Access(AccessType.PROPERTY)
@Entity
@Table(name = "crm_Payment")
@EntityValidators(value = {
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "updateStatusToConfirmed"),
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "incrementReceiptSequence"),
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateBookingStatusForDate")})
@EntityListeners(AuditingEntityListener.class)
public class Payment implements IEntity<Payment>, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

	private String paymentType;

	private PaymentMode paymentMode;

	private LocalDate paymentDate;

	private Money payable;

	private String cheque_DDNo;

	private LocalDate checue_DDDate;

	private String bankName;

	private String receiptNumber;

	private Booking booking;

	private Money dueAmount;

	@javax.persistence.Transient
	private String amountInWords;

	@CreatedDate
	private LocalDateTime createDateTime;
	@LastModifiedDate
	private LocalDateTime modifiedDate;

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

	private Invoice invoice;

	
	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(LocalDateTime createDateTime) {
		this.createDateTime = createDateTime;
	}

	@Convert(converter = LocalDateTimeConverter.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
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

	public Payment() {
		paymentDate = LocalDate.now();

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	@Enumerated
	public PaymentMode getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(PaymentMode paymentMode) {
		this.paymentMode = paymentMode;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	@Embedded
	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "payable_money")),
			@AttributeOverride(name = "currency", column = @Column(name = "payable_cur")), })
	public Money getPayable() {
		return payable;
	}

	public void setPayable(Money payable) {
		this.payable = payable;
	}

	public String getCheque_DDNo() {
		return cheque_DDNo;
	}

	public void setCheque_DDNo(String cheque_DDNo) {
		this.cheque_DDNo = cheque_DDNo;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getChecue_DDDate() {
		return checue_DDDate;
	}

	public void setChecue_DDDate(LocalDate checue_DDDate) {
		this.checue_DDDate = checue_DDDate;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	@ManyToOne
	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public String getReceiptNumber() {
		return receiptNumber;
	}

	public void setReceiptNumber(String receiptNumber) {
		this.receiptNumber = receiptNumber;
	}

	public Money getDueAmount() {
		return dueAmount;
	}

	public void setDueAmount(Money dueAmount) {
		this.dueAmount = dueAmount;
	}

	@javax.persistence.Transient
	public String getAmountInWords() {
		NumberToWord word = new NumberToWord();
		return word.convert((int) payable.getAmount());
	}

	@ManyToOne
	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}

	@Override
	public void copy(Payment toEntity) {
		toEntity.setBankName(bankName);
		toEntity.setBankName(bankName);
		toEntity.setChecue_DDDate(checue_DDDate);
		toEntity.setCheque_DDNo(cheque_DDNo);
		toEntity.setId(id);
		toEntity.setPayable(payable);
		toEntity.setPaymentDate(paymentDate);
		toEntity.setPaymentMode(paymentMode);
		toEntity.setPaymentType(paymentType);
		toEntity.setReceiptNumber(receiptNumber);

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void incrementReceiptSequence(SimpleJpaRepository repository,
			EntityManager em) {
		SimpleJpaRepository<Sequence, Long> sequenceRepository = new SimpleJpaRepository<Sequence, Long>(
				Sequence.class, em);

		Specification<Sequence> spec = new Specification<Sequence>() {
			@Override
			public Predicate toPredicate(Root<Sequence> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("name"), "RECEIPT_SEQUENCE"));
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
		Sequence sequence = (Sequence) sequenceRepository.findOne(spec);
		if (sequence == null) {
			throw new RuntimeException("Receipt Sequence Does not exists");
		}
		sequence.increment();
		repository.save(sequence);

		String financilaYear = "";

		if (getPaymentDate().getMonthValue() < 4) {
			financilaYear = (getPaymentDate().getYear() - 1) + "-"
					+ (getPaymentDate().getYear()+"").substring(2);
		} else {
			financilaYear = getPaymentDate().getYear() + "-"
					+ ((getPaymentDate().getYear() + 1)+"").substring(2);
		}
		this.receiptNumber = getBooking().getFunctionHallEnquiry().getFunctionHall()
						.getCode() + "/" + sequence.getValue() + "/" +  getPaymentType().charAt(0)
						+ "/" + financilaYear;

	}

	public void updateStatusToConfirmed(SimpleJpaRepository repository,
			EntityManager em) {
		
		if (booking != null) {

			SimpleJpaRepository<FunctionHallEnquiry, Long> functionHallEnquiryRepository = new SimpleJpaRepository<FunctionHallEnquiry, Long>(
					FunctionHallEnquiry.class, em);
			FunctionHallEnquiry functionHallEnquiry = functionHallEnquiryRepository
					.findOne(booking.getFunctionHallEnquiry().getId());
			if (functionHallEnquiry.getBooking().getPayments().isEmpty()) {
				functionHallEnquiry.setBookingStatus(BookingStatus.confirm);
			}
			functionHallEnquiryRepository.save(functionHallEnquiry);
		}
	}
	public void validateBookingStatusForDate(
			SimpleJpaRepository simpleJpaRepository, EntityManager em) {
		Specification<Payment> spec = new Specification<Payment>() {
			@Override
			public Predicate toPredicate(Root<Payment> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				Predicate predicate1 = cb.lessThan(
						root.<Booking> get("booking").<LocalDateTime> get("fromDateTime"),
						booking.getFromDateTime());
				Predicate predicate2 = cb.greaterThan(
						root.<Booking> get("booking").<LocalDateTime> get("toDateTime"),
						booking.getFromDateTime());

				Predicate condition1 = cb.and(predicate1, predicate2);
				
				Predicate predicate3 = cb.lessThan(
						root.<Booking> get("booking").<LocalDateTime> get("fromDateTime"),
						booking.getToDateTime());
				Predicate predicate4 = cb.greaterThan(
						root.<Booking> get("booking").<LocalDateTime> get("toDateTime"),
						booking.getToDateTime());
				
				Predicate condition2 = cb.and(predicate3, predicate4);
				
				predicates.add(cb.or(condition1, condition2));
				predicates.add(cb.equal(
						root.<Booking> get("booking").<FunctionHallEnquiry> get("functionHallEnquiry")
								.get("bookingStatus"), BookingStatus.confirm));
				predicates.add(cb.equal(
						root.<Booking> get("booking").<FunctionHallEnquiry> get("functionHallEnquiry")
								.<FunctionHall> get("functionHall")
								.<Long> get("id"), booking.getFunctionHallEnquiry()
								.getFunctionHall().getId()));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
		SimpleJpaRepository<Payment, Long> paymentRepository = new SimpleJpaRepository<Payment, Long>(
				Payment.class, em);
		List<Payment> payments = paymentRepository.findAll(spec);
		if (!payments.isEmpty()) {
			throw new RuntimeException("Function hall is alreay booked.");

		}
	}
	
}
