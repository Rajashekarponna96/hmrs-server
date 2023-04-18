package com.srmt.model.sales.tdv;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.srmt.rest.model.IEntity;

@Entity
@Table(name = "sales_ProductLine_SpecificationCategory")
@Audited
@EntityListeners(AuditingEntityListener.class)
public class SpecificationCategory implements IEntity<SpecificationCategory> {

	private Long id;

	private String name;

	private String value;

	private List<Specification> specifications;

	private ProductLine productLine;

	public SpecificationCategory() {
		specifications = new ArrayList<Specification>();
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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@JsonIgnore
	@ManyToOne
	public ProductLine getProductLine() {
		return productLine;
	}

	@JsonProperty
	public void setProductLine(ProductLine productLine) {
		this.productLine = productLine;
	}

	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "specificationCategory")
	public List<Specification> getSpecifications() {
		return specifications;
	}

	
	public void setSpecifications(List<Specification> specifications) {
		specifications.forEach(s -> s.setSpecificationCategory(this));
		this.specifications = specifications;
	}

	@Override
	public void copy(SpecificationCategory toEntity) throws Exception {
		toEntity.setName(name);
		toEntity.setId(id);
		toEntity.setSpecifications(specifications);
		toEntity.setValue(value);
		toEntity.setProductLine(productLine);
	}

}
