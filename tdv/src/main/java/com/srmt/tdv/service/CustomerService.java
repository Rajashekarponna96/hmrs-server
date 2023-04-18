package com.srmt.tdv.service;

import java.util.List;

import com.srmt.model.sales.Customer;

public interface CustomerService {
	List<Customer> getCustomersBySalesRepId(Long salesRepId, int page, int size);
	}
