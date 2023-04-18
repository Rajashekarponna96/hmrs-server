package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.service.masters.ActSheduleService;

@RestController
@RequestMapping(value="/actShedule")
public class ActSheduleController {

	@Autowired
	private ActSheduleService actSheduleService;
	
	
	@RequestMapping(value="/{id}",method=RequestMethod.DELETE)
	public void deleteActShedule(@PathVariable("id") Long id){
		actSheduleService.deleteActShedule(id);
	}
	
	@RequestMapping(value="/all",method=RequestMethod.GET)
	public List<ActShedule> getAllActShedules(){
	return	actSheduleService.getAllActShedules();
	}
	
	
}
