package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.EmploymentType;
import com.srmt.service.masters.EmployeeTypeMasterService;

@RestController
@RequestMapping("/employeeTypeMaster")
public class EmployeeTypeMasterController {

	@Autowired
	private EmployeeTypeMasterService employeeTypeMasterService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody EmploymentType employmentTypeMaster) {
		employeeTypeMasterService.add(employmentTypeMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") long id,
			@RequestBody EmploymentType employmentTypeMaster) {
		employeeTypeMasterService.update(id, employmentTypeMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public EmploymentType findById(@PathVariable("id") Long id) {
		return employeeTypeMasterService.findById(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deletById(@PathVariable("id") long id) {
		employeeTypeMasterService.deletebyId(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<EmploymentType> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return employeeTypeMasterService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return employeeTypeMasterService.getCount();
	}
	
	@RequestMapping(value="/all",method=RequestMethod.GET)
	public List<EmploymentType> getAllEmployeMentTypes(){
		return employeeTypeMasterService.getAllEmployeMentTypes();
	}
}
