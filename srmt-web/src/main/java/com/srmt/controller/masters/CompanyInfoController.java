package com.srmt.controller.masters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.CompanyInfo;
import com.srmt.service.masters.CompanyInfoService;

@RestController
@RequestMapping("/companyInfo")
public class CompanyInfoController {

	@Autowired
	private CompanyInfoService companyInfoService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody CompanyInfo companyInfo) {
		companyInfoService.add(companyInfo);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody CompanyInfo companyInfo) {
		companyInfoService.update(id, companyInfo);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public CompanyInfo getById(@PathVariable("id") Long id) {
		return companyInfoService.getById(id);
	}

	@RequestMapping(value = "/first", method = RequestMethod.GET)
	public CompanyInfo findByFirst() {
		return companyInfoService.findByFirst();
	}

}
