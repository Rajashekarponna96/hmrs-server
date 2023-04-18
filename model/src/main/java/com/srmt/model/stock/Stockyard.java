package com.srmt.model.stock;

import java.util.List;

import com.srmt.model.hrms.Address;
import com.srmt.rest.model.IEntity;

public class Stockyard {

	private long id;

	private String name;

	private String code;

	private Address location;

	private List<Catalog> catalogs;

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public Address getLocation() {
		return location;
	}

	public void setLocation(Address location) {
		this.location = location;
	}

	public List<Catalog> getCatalogs() {
		return catalogs;
	}

	public void setCatalogs(List<Catalog> catalogs) {
		this.catalogs = catalogs;
	}

}
