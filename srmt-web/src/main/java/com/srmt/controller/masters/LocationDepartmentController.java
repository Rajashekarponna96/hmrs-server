package com.srmt.controller.masters;

import java.util.List;

import org.apache.regexp.recompile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Department;
import com.srmt.service.masters.LocationDepartmentService;

@RestController
@RequestMapping("/localDepartmet")
public class LocationDepartmentController {

	@Autowired
	private LocationDepartmentService locationDepartmentService;

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Department> findByPageAndSize(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return locationDepartmentService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public Long findCount() {
		return locationDepartmentService.count();
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Department> findAll() {
		return locationDepartmentService.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		locationDepartmentService.deleteById(id);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<Department> SearchByActAndLocationAndDepartment(
			@RequestParam(value = "actId", required = false) Long actId,
			@RequestParam(value = "locationId", required = false) Long locationId,
			@RequestParam(value = "departmentId", required = false) Long departmentId,
			@RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size) {
		return locationDepartmentService.SearchByActAndLocationAndDepartment(
				actId, locationId, departmentId, page, size);
	}

	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public Long SearchByActAndLocationAndDepartmentCount(
			@RequestParam(value = "actId", required = false) Long actId,
			@RequestParam(value = "locationId", required = false) Long locationId,
			@RequestParam(value = "departmentId", required = false) Long departmentId) {
		return locationDepartmentService
				.SearchByActAndLocationAndDepartmentCount(actId, locationId,
						departmentId);
	};

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(Department locationDepartment) {
		locationDepartmentService.add(locationDepartment);
	};

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			Department locationDepartment) {
		locationDepartmentService.updateDepartment(id,
				locationDepartment.getId(), locationDepartment);
	};

	@RequestMapping(value = "/{id}/shedule/{sheduleId}/mapping", method = RequestMethod.POST)
	public void addLocationWiseAct(@PathVariable("id") Long id,
			@PathVariable("sheduleId") Long sheduleId,
			@RequestBody Department department) {
		locationDepartmentService.addLocationWiseAct(id, sheduleId, department);

	}

	@RequestMapping(value = "/locationwiseActs/pagination", method = RequestMethod.GET)
	public List<Department> getLocationWiseActs(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return locationDepartmentService.getLocationWiseActs(page, size);
	}

	@RequestMapping(value = "/locationwiseActs/count", method = RequestMethod.GET)
	public Long getLocationWiseActsCount() {
		return locationDepartmentService.getLocationWiseActsCount();
	}

}
