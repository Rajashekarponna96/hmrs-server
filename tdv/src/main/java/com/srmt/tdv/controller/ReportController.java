package com.srmt.tdv.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.srmt.model.sales.Customer;
import com.srmt.rest.controller.GenericController;

@RestController
@RequestMapping("/tdv/report")
public class ReportController extends GenericController {

	@RequestMapping(value = "/customer/{customerId}/quotation", method = RequestMethod.GET)
	public ModelAndView generateInvoice(
			@PathVariable("customerId") Long customerId) throws Exception {

		Map<String, Object> parameterMap = new HashMap<String, Object>();
		Customer customer = (Customer) getGenericService().findEntity(
				"Customer", customerId);
		new JREmptyDataSource();
		List<Customer> customers = new ArrayList<Customer>();
		customers.add(customer);
		JRDataSource JRdataSource = new JRBeanCollectionDataSource(customers,
				true);
		parameterMap.put("address", customer.getAddress().toString());
		parameterMap.put("customer", customers);
		parameterMap.put("dataSource", JRdataSource);

		ModelAndView modelAndView = new ModelAndView("quotationView",
				parameterMap);
		return modelAndView;

	}
}
