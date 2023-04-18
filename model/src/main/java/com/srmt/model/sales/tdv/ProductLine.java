package com.srmt.model.sales.tdv;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
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
import com.srmt.model.sales.Customer;
import com.srmt.rest.model.IEntity;

@Entity
@Table(name = "sales_productLine")
@Audited
@EntityListeners(AuditingEntityListener.class)
public class ProductLine implements IEntity<ProductLine> ,Serializable{
	
	private static final long serialVersionUID = 1L;

	private Long id;

	private String number;

	private List<String> colors;

	private String description;

	private Model model;

	private ParentProductLine parentProductLine;

	private List<SpecificationCategory> categories;

	private List<Customer> customers;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	@ElementCollection
	public List<String> getColors() {
		return colors;
	}

	public void setColors(List<String> colors) {
		this.colors = colors;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@ManyToOne
	public Model getModel() {
		return model;
	}

	public void setModel(Model model) {
		this.model = model;
	}

	@ManyToOne
	public ParentProductLine getParentProductLine() {
		return parentProductLine;
	}

	public void setParentProductLine(ParentProductLine parentProductLine) {
		this.parentProductLine = parentProductLine;
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "productLine")
	public List<SpecificationCategory> getCategories() {
		return categories;
	}

	public void setCategories(List<SpecificationCategory> categories) {
		categories.forEach(c -> c.setProductLine(this));
		this.categories = categories;
	}

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "productLine")
	public List<Customer> getCustomers() {
		return customers;
	}

	@JsonProperty
	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

	@Override
	public void copy(ProductLine toEntity) throws Exception {
		toEntity.setCategories(categories);
		toEntity.setColors(colors);
		toEntity.setDescription(description);
		toEntity.setId(id);
		toEntity.setModel(model);
		toEntity.setNumber(number);
		toEntity.setParentProductLine(parentProductLine);
	}

}
