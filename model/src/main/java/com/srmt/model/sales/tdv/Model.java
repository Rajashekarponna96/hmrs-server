package com.srmt.model.sales.tdv;

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
import com.srmt.rest.model.EntityValidator;
import com.srmt.rest.model.EntityValidators;
import com.srmt.rest.model.IEntity;
import com.srmt.rest.model.ValidationType;

@Entity
@Table(name = "sales_model")
@Audited
@EntityListeners(AuditingEntityListener.class)
public class Model implements IEntity<Model> {

	private Long id;

	private String code;

	private String name;

	private List<ProductLine> productLines;

	private ParentProductLine parentProductLine;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "model")
	public List<ProductLine> getProductLines() {
		return productLines;
	}

	@JsonProperty
	public void setProductLines(List<ProductLine> productLines) {
		this.productLines = productLines;
	}

	@ManyToOne
	public ParentProductLine getParentProductLine() {
		return parentProductLine;
	}

	public void setParentProductLine(ParentProductLine parentProductLine) {
		this.parentProductLine = parentProductLine;
	}

	@Override
	public void copy(Model toEntity) throws Exception {
		toEntity.setCode(code);
		toEntity.setId(id);
		toEntity.setName(name);
		toEntity.setParentProductLine(parentProductLine);
		toEntity.setProductLines(productLines);
	}

}
