package com.srmt.tdv.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.sales.Customer;
import com.srmt.repository.tdv.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	private CustomerRepository customerRepository;
	
	@Override
	public List<Customer> getCustomersBySalesRepId(Long salesRepId, int page,
			int size) {
		return customerRepository.findBySalesRepresentative_Id(salesRepId, new PageRequest(page, size));
	}

}
