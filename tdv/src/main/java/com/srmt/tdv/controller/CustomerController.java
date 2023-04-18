package com.srmt.tdv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.sales.Customer;
import com.srmt.tdv.service.CustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping(value = "/{salesRepId}/", method=RequestMethod.GET)
	public List<Customer> getCustomersBySalesRepId(@PathVariable("salesRepId") Long salesRepId, @RequestParam("page") int page, @RequestParam("size") int size){
		return customerService.getCustomersBySalesRepId(salesRepId, page, size);
	}
}
