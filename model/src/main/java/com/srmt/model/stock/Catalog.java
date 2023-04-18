package com.srmt.model.stock;

import java.util.List;

import com.srmt.rest.model.IEntity;

public class Catalog implements IEntity<Catalog> {

	private Long id;

	private String name;

	private String value;

	private List<Product> products;

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

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	@Override
	public void copy(Catalog toEntity) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
