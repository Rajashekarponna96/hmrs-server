package com.srmt.model.crm.fh;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
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
import javax.persistence.Table;
import javax.persistence.Transient;
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
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.srmt.model.hrms.Address;
import com.srmt.model.hrms.Person;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationType;

@Audited
@Access(AccessType.PROPERTY)
@Entity
@Table(name = "crm_func_hall")
@EntityValidators(value = { @EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, specFactoryMethod = "validateByCodeAndName") })
@EntityListeners(AuditingEntityListener.class)
public class FunctionHall implements Serializable, IEntity<FunctionHall> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2296019843766857181L;

	private Long id;

	private String code;

	private String name;

	private Person contactPerson;

	private Long seatingCapacity;

	private Long dinningCapacity;

	private Address address;

	@JsonIgnore
	private List<Room> rooms;

	@JsonIgnore
	private List<RateCard> rateCards;

	@JsonIgnore
	private List<FunctionHallEnquiry> enquiries;

	@JsonIgnore
	private List<Booking> bookings;

	private String description;

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

	public FunctionHall() {
		address = new Address();
		rooms = new ArrayList<Room>();
		enquiries = new ArrayList<FunctionHallEnquiry>();
		bookings = new ArrayList<Booking>();
	}

	@SuppressWarnings("unchecked")
	@Override
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

	@OneToOne(cascade = CascadeType.ALL)
	public Person getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(Person contactPerson) {
		this.contactPerson = contactPerson;
	}

	public Long getSeatingCapacity() {
		return seatingCapacity;
	}

	public void setSeatingCapacity(Long seatingCapacity) {
		this.seatingCapacity = seatingCapacity;
	}

	public Long getDinningCapacity() {
		return dinningCapacity;
	}

	public void setDinningCapacity(Long dinningCapacity) {
		this.dinningCapacity = dinningCapacity;
	}

	@Embedded
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "functionHall")
	public List<Room> getRooms() {
		return rooms;
	}

	public void setRooms(List<Room> rooms) {
		this.rooms = rooms;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "functionHall")
	public List<FunctionHallEnquiry> getEnquiries() {
		return enquiries;
	}

	@JsonProperty
	public void setEnquiries(List<FunctionHallEnquiry> enquiries) {
		this.enquiries = enquiries;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "functionHall")
	public List<Booking> getBookings() {
		return bookings;
	}

	@JsonProperty
	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "functionHall")
	public List<RateCard> getRateCards() {
		return rateCards;
	}

	public void setRateCards(List<RateCard> rateCards) {
		this.rateCards = rateCards;
	}

	@Transient
	public String getRoomNumbers() {

		StringBuffer rooNumbers = new StringBuffer();
		for (Room room : rooms) {
			rooNumbers.append(room.getCode()).append(",");
		}
		return rooNumbers.toString().trim().length() == 0 ? "" : rooNumbers
				.deleteCharAt(rooNumbers.length() - 1).toString();
	}

	@Transient
	public int getRoomNumberCount() {
		return rooms == null ? 0 : rooms.size();
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder(1791, 51).append(id).hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FunctionHall other = (FunctionHall) obj;

		return new EqualsBuilder().append(id, other.id).isEquals();
	}

	@Override
	public void copy(FunctionHall toEntity) {
		toEntity.setCode(code);
		toEntity.setAddress(address);
		toEntity.setContactPerson(contactPerson);
		toEntity.setDinningCapacity(dinningCapacity);
		toEntity.setId(id);
		toEntity.setName(name);
		toEntity.setRooms(rooms);
		toEntity.setSeatingCapacity(seatingCapacity);
		toEntity.setEnquiries(enquiries);
		toEntity.setDescription(description);
		toEntity.setBookings(bookings);
		toEntity.setRateCards(rateCards);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByCodeAndName(SimpleJpaRepository repository,
			EntityManager em) {
		Specification<FunctionHall> spec = new Specification<FunctionHall>() {
			@Override
			public Predicate toPredicate(Root<FunctionHall> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));
				predicates.add(cb.equal(root.get("name"), name));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		FunctionHall functionHall = (FunctionHall) repository.findOne(spec);
		if (functionHall != null) {
			throw new RuntimeException("Function Hall with code #[" + code
					+ "] and name #[" + name + " already exists");
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByCodeAndNameUpdate(SimpleJpaRepository repository,
			EntityManager em) {
		Specification<FunctionHall> spec = new Specification<FunctionHall>() {
			@Override
			public Predicate toPredicate(Root<FunctionHall> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));
				predicates.add(cb.equal(root.get("name"), name));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		FunctionHall functionHall = (FunctionHall) repository.findOne(spec);
		if (functionHall != null && functionHall.getId() != getId()) {
			throw new RuntimeException("Function Hall with code #[" + code
					+ "] and name #[" + name + " already exists");
		}
	}

	@JsonIgnore
	@Transient
	public RateCard getActiveRateCard() {
		Optional<RateCard> rateCard = rateCards != null && rateCards.size() > 0 ? rateCards
				.stream().filter(r -> r.isActive()).findFirst()
				: null;
		return rateCard!=null?(rateCard.isPresent() ? rateCard.get() : null):null;
	}
}
