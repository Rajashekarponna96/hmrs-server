	package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Designation;
import com.srmt.service.masters.DesignationService;

@RestController
@RequestMapping(value = "/Designation")
public class DesignationController {

	@Autowired
	private DesignationService designationService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Designation designation) {
		designationService.add(designation);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody Designation designation) throws Exception {
		designationService.update(id, designation);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") long id) {
		designationService.delete(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Designation> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return designationService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public long count() {
		return designationService.count();
	}
	
	@RequestMapping(value="/all",method=RequestMethod.GET)
	public List<Designation> getDesignations(){
		return designationService.getDesignations();
	}
}
