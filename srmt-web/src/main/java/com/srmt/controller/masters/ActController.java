package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.service.masters.ActService;
import com.srmt.service.masters.ActSheduleService;

@RestController
@RequestMapping(value = "/act")
public class ActController {

	@Autowired
	private ActService actService;

	@Autowired
	private ActSheduleService actSheduleService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Act act) {
		actService.add(act);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id, @RequestBody Act act) {
		actService.update(id, act);
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Act> getAll() {
		return actService.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteAct(@PathVariable("id") Long id) {
		actService.deleteAct(id);
	}

	@RequestMapping(value = "/{actId}/actShedule", method = RequestMethod.POST)
	public void addActShedule(@PathVariable("actId") Long actId,
			@RequestBody ActShedule actShedule) {
		actSheduleService.addActShedule(actId, actShedule);
	}

	@RequestMapping(value = "/{actId}/actshedule/{actSheduleId}", method = RequestMethod.PUT)
	public void updateActShedule(@PathVariable("actId") Long actId,
			@PathVariable("actSheduleId") Long actSheduleId,
			@RequestBody ActShedule actShedule) {
		actShedule.setId(actSheduleId);
		actSheduleService.updateActShedule(actId, actShedule);
	}
	
	@RequestMapping(value = "/{actId}/allActShedules", method = RequestMethod.GET)
	public List<ActShedule> getActShedulesById(@PathVariable("actId") Long actId) {
		return actService.getActSchedulesById(actId);
	}	
	
	@RequestMapping(value="/search/actShedules",method=RequestMethod.GET)
	public List<ActShedule> searchActShedulesByActId(@RequestParam(name="actId",required=false) Long actId){
		return actSheduleService.searchActShedulesByActId(actId);
	}
}
