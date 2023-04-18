package com.srmt.model.stock;

import com.arbiva.lang.Money;
import com.srmt.rest.model.IEntity;

public class Product implements IEntity<Product> {

	private Long id;

	private String name;

	private String productId;

	private Money price;

	private ProductCategory productCategory;

	private ProductManufacturer productManufacturer;

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

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Money getPrice() {
		return price;
	}

	public void setPrice(Money price) {
		this.price = price;
	}

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

	@Override
	public void copy(Product toEntity) throws Exception {

	}

}
