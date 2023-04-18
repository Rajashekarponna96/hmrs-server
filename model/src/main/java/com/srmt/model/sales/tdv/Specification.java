package com.srmt.model.sales.tdv;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.srmt.rest.model.IEntity;

@Entity
@Table(name = "sales_ProductLine_Category_Specification")
@Audited
@EntityListeners(AuditingEntityListener.class)
public class Specification implements IEntity<Specification> {

	private Long id;

	private String name;

	private String value;

	private SpecificationCategory specificationCategory;

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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
    @JsonIgnore
	@ManyToOne
	public SpecificationCategory getSpecificationCategory() {
		return specificationCategory;
	}
   @JsonProperty
	public void setSpecificationCategory(
			SpecificationCategory specificationCategory) {
		this.specificationCategory = specificationCategory;
	}

	@Override
	public void copy(Specification toEntity) throws Exception {
		toEntity.setId(id);
		toEntity.setName(name);
		toEntity.setValue(value);
		toEntity.setSpecificationCategory(specificationCategory);
	}

}
