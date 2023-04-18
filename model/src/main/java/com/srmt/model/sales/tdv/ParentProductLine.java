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
@Table(name = "sales_parentProductLine")
@Audited
@EntityListeners(AuditingEntityListener.class)
public class ParentProductLine implements IEntity<ParentProductLine> {

	private Long id;

	private String name;
	
	private String code;

	private String value;

	private List<Model> models;

	private Segment segment;

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
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "parentProductLine")
	public List<Model> getModels() {
		return models;
	}

	@JsonProperty
	public void setModels(List<Model> models) {
		this.models = models;
	}

	@ManyToOne
	public Segment getSegment() {
		return segment;
	}

	public void setSegment(Segment segment) {
		this.segment = segment;
	}
	
	

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public void copy(ParentProductLine toEntity) throws Exception {
		toEntity.setId(id);
		toEntity.setModels(models);
		toEntity.setName(name);
		toEntity.setValue(value);
		toEntity.setCode(code);
	}

}
