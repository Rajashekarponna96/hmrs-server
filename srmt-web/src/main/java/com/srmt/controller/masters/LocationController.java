package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Department;
import com.srmt.model.hrms.administration.Holiday;
import com.srmt.model.hrms.administration.Location;
import com.srmt.service.masters.HolidayMasterService;
import com.srmt.service.masters.LocationDepartmentService;
import com.srmt.service.masters.LocationService;

@RestController
@RequestMapping("/location")
public class LocationController {

	@Autowired
	private LocationService locationService;
	
	@Autowired
	private LocationDepartmentService locationDepartmentService;
	
	@Autowired
	private HolidayMasterService holidayMasterService;
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Location location) {
		locationService.add(location);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody Location location) throws Exception {
		locationService.update(id, location);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id) {
		locationService.delete(id);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Location> findAll() {
		return locationService.findAll();
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public long findAllCount() {
		return locationService.count();
	}
	
	@RequestMapping(value="/{id}/departments",method=RequestMethod.GET)
	public List<Department> getDepartmentsByLocation(@PathVariable("id") Long id){
		return locationDepartmentService.getDepartmentsByLocation(id);
	}
	
	@RequestMapping(value = "/{id}/department", method = RequestMethod.POST)
	public void addDepartment(@PathVariable("id") Long id,@RequestBody Department locationDepartment) {
		locationDepartmentService.addDepartment(id,locationDepartment);
	}
	

	@RequestMapping(value = "/{id}/department/{deptId}", method = RequestMethod.PUT)
	public void updateDepartment(@PathVariable("id") Long id,@PathVariable("deptId") Long deptId,
			@RequestBody Department locationDepartment) {
		locationDepartmentService.updateDepartment(id,deptId, locationDepartment);
	}
	
	@RequestMapping(value="/{id}/calenderYear/{calenderYearId}/holidays",method=RequestMethod.POST)
	public void addHolidays(@PathVariable("id") Long id,@PathVariable("calenderYearId") Long calenderYearId,
			@RequestBody List<Holiday> holidays){
		holidayMasterService.addHolidays(id,calenderYearId,holidays);
	}
	
	@RequestMapping(value="/{id}/calenderYear/{calenderYearId}/holiday/{holidayId}",method=RequestMethod.PUT)
	public void updataHoliday(@PathVariable("id") Long id,@PathVariable("calenderYearId") Long calenderYearId,@PathVariable("holidayId") Long holidayId
			,@RequestBody Holiday holiday){
		holidayMasterService.updataHoliday(id,calenderYearId,holidayId,holiday);
	}

}
