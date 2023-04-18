package com.srmt.dto;

import java.util.ArrayList;
import java.util.List;

import com.srmt.model.hrms.administration.Location;
import com.srmt.model.sales.tdv.ProductLine;

public class EmployeeLocationAndProductlineDto {

	private List<Location> locations;

	private List<ProductLine> productLines;

	public EmployeeLocationAndProductlineDto() {
		locations = new ArrayList<Location>();
		productLines = new ArrayList<ProductLine>();
	}

	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

	public List<ProductLine> getProductLines() {
		return productLines;
	}

	public void setProductLines(List<ProductLine> productLines) {
		this.productLines = productLines;
	}

}
