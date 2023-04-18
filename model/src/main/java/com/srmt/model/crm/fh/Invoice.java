package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.arbiva.date.jackson.serializer.LocalDateDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateSerializer;
import com.arbiva.date.jpa.converters.LocalDateConverter;
import com.arbiva.lang.Percentage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.hrms.Person;
import com.srmt.model.hrms.administration.Sequence;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Access(AccessType.PROPERTY)
@Entity
@Table(name = "crm_invoice")
@EntityValidators(value = { @EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "incrementInvoiceSequence") })
@EntityListeners(AuditingEntityListener.class)
public class Invoice implements IEntity<Invoice>, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

	private String name;

	private LocalDate createdOn;

	private Person customer;

	private List<Particular> particulars;

	private String invoiceNumber;

	private Percentage tax;

	private Percentage discount;

	private List<Payment> payments;

	private Booking booking;

	private RateCard rateCard;

	public Invoice() {
		particulars = new ArrayList<Particular>();
		createdOn = LocalDate.now();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDate createdOn) {
		this.createdOn = createdOn;
	}

	@OneToOne
	public Person getCustomer() {
		return customer;
	}

	public void setCustomer(Person customer) {
		this.customer = customer;
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice")
	public List<Particular> getParticulars() {
		return particulars;
	}

	public void setParticulars(List<Particular> particulars) {
		this.particulars = particulars;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	@Embedded
	@AttributeOverride(name = "value", column = @Column(name = "serviecetax_percentage"))
	public Percentage getTax() {
		return tax;
	}

	public void setTax(Percentage tax) {
		this.tax = tax;
	}

	@Embedded
	@AttributeOverride(name = "value", column = @Column(name = "discount_percentage"))
	public Percentage getDiscount() {
		return discount;
	}

	public void setDiscount(Percentage discount) {
		this.discount = discount;
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "invoice")
	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

	@JsonIgnore
	@OneToOne(cascade = CascadeType.MERGE)
	public Booking getBooking() {
		return booking;
	}

	@JsonProperty
	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	@OneToOne
	public RateCard getRateCard() {
		return rateCard;
	}

	public void setRateCard(RateCard rateCard) {
		this.rateCard = rateCard;
	}

	public void incrementInvoiceSequence(SimpleJpaRepository repository,
			EntityManager em) {
		SimpleJpaRepository<Sequence, Long> sequenceRepository = new SimpleJpaRepository<Sequence, Long>(
				Sequence.class, em);

		Specification<Sequence> spec = new Specification<Sequence>() {
			@Override
			public Predicate toPredicate(Root<Sequence> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("name"), "INVOICE_SEQUENCE"));
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
		Sequence sequence = (Sequence) sequenceRepository.findOne(spec);
		if (sequence == null) {
			throw new RuntimeException("Invoice Sequence Does not exists");
		}
		sequence.increment();

		repository.save(sequence);
		System.out.println("generated sequence is " + sequence);

		String financilaYear = "";

		if (getBooking().getBookingDate().getMonthValue() < 4) {
			financilaYear = (getBooking().getBookingDate().getYear() - 1) + "-"
					+ getBooking().getBookingDate().getYear();
		} else {
			financilaYear = getBooking().getBookingDate().getYear() + "-"
					+ (getBooking().getBookingDate().getYear() + 1);
		}
		this.invoiceNumber = getBooking().getFunctionHallEnquiry()
				.getFunctionHall().getCode()
				+ "/" + sequence.getValue() + "/" + financilaYear;

	}

	@Transient
	public double getTotal() {
		return particulars.stream().mapToDouble(p -> p.getTotal()).sum();
	}

	@Transient
	public double getTotalWithTax() {
		return getTotal() + ((tax.getValue() / 100) * getTotal());

	}

	@Override
	public void copy(Invoice toEntity) {
		toEntity.setCreatedOn(createdOn);
		toEntity.setCustomer(customer);
		toEntity.setId(id);
		toEntity.setName(name);
		// toEntity.setInvoiceNumber(invoiceNumber);
		for (Particular particular : particulars) {
			particular.setInvoice(this);
		}
		toEntity.setParticulars(particulars);
		toEntity.setDiscount(discount);
		toEntity.setPayments(payments);
		toEntity.setTax(tax);

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
		Invoice other = (Invoice) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
