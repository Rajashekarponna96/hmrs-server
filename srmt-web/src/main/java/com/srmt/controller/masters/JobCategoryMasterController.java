package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.JobCategory;
import com.srmt.service.masters.JobCategoryMasterService;

@RestController
@RequestMapping("/jobCategoryMaster")
public class JobCategoryMasterController {

	@Autowired
	private JobCategoryMasterService jobCategoryMasterService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody JobCategory jobCategoryMaster) {
		jobCategoryMasterService.add(jobCategoryMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody JobCategory jobCategoryMaster) {
		jobCategoryMasterService.update(id, jobCategoryMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		jobCategoryMasterService.deleteById(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<JobCategory> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return jobCategoryMasterService.findByPageAndSize(page, size);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public JobCategory findById(@PathVariable("id") Long id) {
		return jobCategoryMasterService.findById(id);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return jobCategoryMasterService.getCount();
	}

}
