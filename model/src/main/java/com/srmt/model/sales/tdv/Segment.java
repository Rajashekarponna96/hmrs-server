package com.srmt.model.sales.tdv;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationType;

@Entity
@Table(name = "sales_segment")
@Audited
@EntityValidators(value = {
		@EntityValidator(requestMethod = "POST", type = ValidationType.CUSTOM, specFactoryMethod = "validateByCodeAndName"),
		@EntityValidator(requestMethod = "PUT", type = ValidationType.CUSTOM, specFactoryMethod = "validateByCodeAndNameUpdate")
	 })
@EntityListeners(AuditingEntityListener.class)
public class Segment implements IEntity<Segment> {

	private Long id;

	private String name;

	private String code;

	private List<ParentProductLine> parentProductLines;

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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "segment")
	public List<ParentProductLine> getParentProductLines() {
		return parentProductLines;
	}

	@JsonProperty
	public void setParentProductLines(List<ParentProductLine> parentProductLines) {
		this.parentProductLines = parentProductLines;
	}

	@Override
	public void copy(Segment toEntity) throws Exception {
		toEntity.setCode(code);
		toEntity.setId(id);
		toEntity.setName(name);
		toEntity.setParentProductLines(parentProductLines);

	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByCodeAndName(SimpleJpaRepository repository,
			EntityManager em) {
		Specification<Segment> spec = new Specification<Segment>() {
			@Override
			public Predicate toPredicate(Root<Segment> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));
				predicates.add(cb.equal(root.get("name"), name));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		Segment segment = (Segment) repository.findOne(spec);
		if (segment != null) {
			throw new RuntimeException("Segment with code #[" + code
					+ "] OR name #[" + name + "] already exists");
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public void validateByCodeAndNameUpdate(SimpleJpaRepository repository,
			EntityManager em) {
		Specification<Segment> spec = new Specification<Segment>() {
			@Override
			public Predicate toPredicate(Root<Segment> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));
				predicates.add(cb.equal(root.get("name"), name));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};

		Segment segment = (Segment) repository.findOne(spec);
		if (segment != null && segment.getId() != getId()) {
			throw new RuntimeException("Segment with code #[" + code
					+ "] OR name #[" + name + " already exists");
		}
	}

}
