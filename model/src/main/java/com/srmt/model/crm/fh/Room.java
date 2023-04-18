package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Convert;
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

import com.arbiva.date.jackson.serializer.LocalDateTimeDeserializer;
import com.arbiva.date.jackson.serializer.LocalDateTimeSerializer;
import com.arbiva.date.jpa.converters.LocalDateTimeConverter;
import com.arbiva.lang.Money;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationType;

@Audited
@Entity
@Table(name = "crm_fh_room")
@EntityValidators(value = {
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, specFactoryMethod = "validateByRoomCode")
	 })
@EntityListeners(AuditingEntityListener.class)
/**
 * 
 */
public class Room implements Serializable, IEntity<Room> {

	private static final long serialVersionUID = -6299096708143343945L;

	private Long id;
	private String code;

	private FunctionHall functionHall;

	private Money ratePerDay;
	@CreatedDate
	private LocalDateTime createDateTime;
	@LastModifiedDate
	private LocalDateTime modifiedDate;

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

	@Override
	@SuppressWarnings("unchecked")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@ManyToOne
	public FunctionHall getFunctionHall() {
		return functionHall;
	}

	public void setFunctionHall(FunctionHall functionHall) {
		this.functionHall = functionHall;
	}

	public Money getRatePerDay() {
		return ratePerDay;
	}

	public void setRatePerDay(Money ratePerDay) {
		this.ratePerDay = ratePerDay;
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(1733, 43).append(id).hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Room other = (Room) obj;

		return new EqualsBuilder().append(id, other.id).isEquals();
	}

	@Override
	public void copy(Room toEntity) {
		toEntity.setCode(code);
		toEntity.setFunctionHall(functionHall);
		toEntity.setId(id);
		toEntity.setRatePerDay(ratePerDay);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByRoomCode(SimpleJpaRepository repository,
			EntityManager em) {
		Specification<Room> spec = new Specification<Room>() {
			@Override
			public Predicate toPredicate(Root<Room> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));
				predicates.add(cb.equal(root.<FunctionHall> get("functionHall")
						.<Long> get("id"), functionHall.getId()));
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		Room room = (Room) repository.findOne(spec);
		if (room != null) {
			throw new RuntimeException("Room Number #[" + code
					+ "] already exists in #[" + functionHall.getName() + "]");
		}
	}
	
	
}
