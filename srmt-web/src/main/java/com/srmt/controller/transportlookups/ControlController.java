package com.srmt.controller.transportlookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.transport.Control;
import com.srmt.model.transport.Station;
import com.srmt.service.transportlookups.ControlService;
import com.srmt.service.transportlookups.StationService;

@RestController
@RequestMapping("/control")
public class ControlController {
	
	@Autowired
	private ControlService controlService;
	
	@Autowired
	private StationService stationService;
	
	
	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Control> findControls(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return controlService.findAllSorting(page, size);
	}
	
	
	@RequestMapping(value = "/{id}/stations", method = RequestMethod.GET)
	public List<Station> findStationsById(@PathVariable("id") Long id) {
		return controlService.findStationsById(id);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Control control) {
		controlService.add(control);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateControl(@PathVariable("id") Long id, @RequestBody Control control) {
		controlService.updateControl(id, control);
	}
	
	
	
	@RequestMapping(value = "/{id}/station", method =RequestMethod.POST)
	public void addStation(@PathVariable("id") Long controlId, @RequestBody Station station) {
		stationService.addStation(controlId, station);
	}

	@RequestMapping(value = "/{controlId}/station/{stationId}", method = RequestMethod.PUT)
	public void updateStation(@PathVariable("controlId") Long controlId, @PathVariable("stationId") Long stationId, @RequestBody Station station) {
		station.setId(stationId);
		stationService.updateStation(controlId, station);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public int getControlsCount() {
		return controlService.findControls().size();

	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Control> findAllControls() {
		return controlService.findControls();
		
		
	}

	/*
	@RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
	public void deleteControl(@PathVariable("id") Long id) {
		controlService.deleteControl(id);
	}*/

}
