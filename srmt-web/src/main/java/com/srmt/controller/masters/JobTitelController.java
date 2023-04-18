package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.JobTitle;
import com.srmt.service.masters.JobTitelService;

@RestController
@RequestMapping("/jobTitle")
public class JobTitelController {

	@Autowired
	private JobTitelService jobTitelService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody JobTitle jobTitleMaster) {
		jobTitelService.add(jobTitleMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody JobTitle jobTitleMaster) {
		jobTitelService.update(id, jobTitleMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		jobTitelService.deleteById(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public JobTitle findById(@PathVariable("id") Long id) {
		return jobTitelService.findById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<JobTitle> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return jobTitelService.findByPageAndSize(page, size);
	}
	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long getCount() {
		return jobTitelService.getCount();
	}
}
