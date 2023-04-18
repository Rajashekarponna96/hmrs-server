package com.srmt.model.sales;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.crm.fh.FunctionHall;
import com.srmt.model.hrms.Address;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationMethod;
import com.srmt.rest.model.ValidationType;

@Audited
@Entity
@Table(name = "sales_showroom")
@EntityValidators(value = {
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateByCode"),
		@EntityValidator(requestMethod = "PUT", type = ValidationType.CUSTOM, validationMethod = ValidationMethod.PRE, specFactoryMethod = "validateByCodeInUpdate") })
@EntityListeners(AuditingEntityListener.class)
public class ShowRoom implements IEntity<ShowRoom> {

	private Long id;

	private String code;

	private Address address;

	private Employee incharge;

	private String mobile;

	private String landLine;

	private String fax;

	private String email;

	private String description;

	private Location location;

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

	@ManyToOne
	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

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

	@Embedded
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@ManyToOne
	public Employee getIncharge() {
		return incharge;
	}

	public void setIncharge(Employee incharge) {
		this.incharge = incharge;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getLandLine() {
		return landLine;
	}

	public void setLandLine(String landLine) {
		this.landLine = landLine;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	@Override
	public void copy(ShowRoom toEntity) {
		toEntity.setCode(code);
		toEntity.setDescription(description);
		toEntity.setEmail(email);
		toEntity.setFax(fax);
		toEntity.setId(id);
		toEntity.setIncharge(incharge);
		toEntity.setLandLine(landLine);
		toEntity.setMobile(mobile);
		toEntity.setLocation(location);

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByCode(SimpleJpaRepository repository, EntityManager em) {
		Specification<ShowRoom> spec = new Specification<ShowRoom>() {
			@Override
			public Predicate toPredicate(Root<ShowRoom> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		ShowRoom showroom = (ShowRoom) repository.findOne(spec);
		if (showroom != null) {
			throw new RuntimeException("Show Room with code #[" + code
					+ "]  already exists");
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByCodeInUpdate(SimpleJpaRepository repository,
			EntityManager em) {
		Specification<ShowRoom> spec = new Specification<ShowRoom>() {
			@Override
			public Predicate toPredicate(Root<ShowRoom> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		ShowRoom showroom = (ShowRoom) repository.findOne(spec);
		if (showroom != null && showroom.getId() != id) {
			throw new RuntimeException("Show Room with code #[" + code
					+ "]  already exists");
		}
	}

}
