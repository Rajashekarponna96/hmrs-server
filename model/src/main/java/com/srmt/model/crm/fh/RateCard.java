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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
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
import com.arbiva.lang.Percentage;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Access(AccessType.PROPERTY)
@Entity
@Table(name = "crm_rate_card")
@EntityValidators(value = { @EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateDuplaicateActiverateCard"),@EntityValidator(requestMethod = "PUT", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateDuplaicateActiverateCard") })
@EntityListeners(AuditingEntityListener.class)
public class RateCard implements IEntity<RateCard>, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

	private FunctionHall functionHall;

	private Money hallRentPerDay;

	private Money roomRentPerDay;

	private Money electricityChargePerUnit;

	private Percentage serviceTax;

	private Money nonRefundableAdvance;

	private Money cleaningCharges;

	private Money generatorRentPerHour;

	private LocalDate effectiveDate;
	@CreatedDate
	private LocalDateTime createDateTime;
	@LastModifiedDate
	private LocalDateTime modifiedDate;

	private boolean active;

	@CreatedBy
	private String createdBy;

	@LastModifiedBy
	private String modifiedBy;

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

	@Embedded
	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "hall_rent")),
			@AttributeOverride(name = "currency", column = @Column(name = "hall_rent_cur")), })
	public Money getHallRentPerDay() {
		return hallRentPerDay;
	}

	public void setHallRentPerDay(Money hallRentPerDay) {
		this.hallRentPerDay = hallRentPerDay;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "room_rent")),
			@AttributeOverride(name = "currency", column = @Column(name = "room_rent_cur")), })
	public Money getRoomRentPerDay() {
		return roomRentPerDay;
	}

	public void setRoomRentPerDay(Money roomRentPerDay) {
		this.roomRentPerDay = roomRentPerDay;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "elec_charge")),
			@AttributeOverride(name = "currency", column = @Column(name = "elec_charg_cur")), })
	public Money getElectricityChargePerUnit() {
		return electricityChargePerUnit;
	}

	public void setElectricityChargePerUnit(Money electricityChargePerUnit) {
		this.electricityChargePerUnit = electricityChargePerUnit;
	}

	@Embedded
	public Percentage getServiceTax() {
		return serviceTax;
	}

	public void setServiceTax(Percentage serviceTax) {
		this.serviceTax = serviceTax;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "advance_amt")),
			@AttributeOverride(name = "currency", column = @Column(name = "advance_amt_cur")), })
	public Money getNonRefundableAdvance() {
		return nonRefundableAdvance;
	}

	public void setNonRefundableAdvance(Money nonRefundableAdvance) {
		this.nonRefundableAdvance = nonRefundableAdvance;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "cleaning_amt")),
			@AttributeOverride(name = "currency", column = @Column(name = "cleaning_amt_cur")), })
	public Money getCleaningCharges() {
		return cleaningCharges;
	}

	public void setCleaningCharges(Money cleaningCharges) {
		this.cleaningCharges = cleaningCharges;
	}

	@AttributeOverrides({
			@AttributeOverride(name = "amount", column = @Column(name = "gen_rent_amt")),
			@AttributeOverride(name = "currency", column = @Column(name = "gen_rent_cur")), })
	public Money getGeneratorRentPerHour() {
		return generatorRentPerHour;
	}

	public void setGeneratorRentPerHour(Money generatorRentPerHour) {
		this.generatorRentPerHour = generatorRentPerHour;
	}

	@Convert(converter = LocalDateConverter.class)
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	public LocalDate getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(LocalDate effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(1755, 73).append(id).hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RateCard other = (RateCard) obj;

		return new EqualsBuilder().append(id, other.id).isEquals();
	}

	@Override
	public void copy(RateCard toEntity) {
		toEntity.setCleaningCharges(cleaningCharges);
		toEntity.setEffectiveDate(effectiveDate);
		toEntity.setFunctionHall(functionHall);
		toEntity.setGeneratorRentPerHour(generatorRentPerHour);
		toEntity.setNonRefundableAdvance(nonRefundableAdvance);
		toEntity.setRoomRentPerDay(roomRentPerDay);
		toEntity.setHallRentPerDay(hallRentPerDay);
		toEntity.setServiceTax(serviceTax);
		toEntity.setActive(active);
	}

	public void validateByFunctionHall(SimpleJpaRepository repository,
			EntityManager em) {

		SimpleJpaRepository<RateCard, Long> rateCardRepository = new SimpleJpaRepository<RateCard, Long>(
				RateCard.class, em);

		Specification<RateCard> spec = new Specification<RateCard>() {
			@Override
			public Predicate toPredicate(Root<RateCard> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("id"), getFunctionHall()
						.getId()));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		RateCard rateCard = (RateCard) rateCardRepository.findOne(spec);
		if (rateCard != null) {
			throw new RuntimeException("Function Hall with id #["
					+ getFunctionHall().getId()
					+ "] Rate card is already exists");
		}

	}

	public void validateDuplaicateActiverateCard(
			SimpleJpaRepository repository, EntityManager em) {

		SimpleJpaRepository<RateCard, Long> rateCardRepository = new SimpleJpaRepository<RateCard, Long>(
				RateCard.class, em);
		if (active) {

			Specification<RateCard> spec = new Specification<RateCard>() {
				@Override
				public Predicate toPredicate(Root<RateCard> root,
						CriteriaQuery<?> query, CriteriaBuilder cb) {
					List<Predicate> predicates = new ArrayList<Predicate>();
					predicates.add(cb.equal(root.get("id"), getFunctionHall()
							.getId()));
					predicates.add(cb.equal(root.get("active"), true));

					Predicate[] restrictions = new Predicate[predicates.size()];
					return cb.and(predicates.toArray(restrictions));
				}
			};

			List<RateCard> rateCards = rateCardRepository.findAll(spec);
			if (rateCards != null && rateCards.size() > 0) {
				throw new RuntimeException("Function Hall with id #["
						+ getFunctionHall().getId() + "] Rate card is Active");
			}
		}

	}
}
