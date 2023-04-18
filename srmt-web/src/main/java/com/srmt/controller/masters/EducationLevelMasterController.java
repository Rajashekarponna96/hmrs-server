package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.EducationLevel;
import com.srmt.service.masters.EducationLevelMasterService;

@RestController
@RequestMapping("/EducationLevelMaster")
public class EducationLevelMasterController {

	@Autowired
	private EducationLevelMasterService educationLevelMasterService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody EducationLevel educationLevelMaster) {
		educationLevelMasterService.add(educationLevelMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody EducationLevel educationLevelMaster) {
		educationLevelMasterService.update(id, educationLevelMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		educationLevelMasterService.deleteById(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public EducationLevel findById(@PathVariable("id") Long id) {
		return educationLevelMasterService.findById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<EducationLevel> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return educationLevelMasterService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return educationLevelMasterService.getCount();
	}
}
