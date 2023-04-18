package com.srmt.controller.transportlookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.transport.Agent;
import com.srmt.model.transport.Station;
import com.srmt.service.transportlookups.AgentService;
import com.srmt.service.transportlookups.StationService;

@RestController
@RequestMapping(value="/station")
public class StationController {
	
	@Autowired
	private StationService stationService;
	
	@Autowired
	private AgentService agentService;
	
	@RequestMapping(value = "{id}/agents", method = RequestMethod.GET)
	public List<Agent> findAgentsById(@PathVariable("id") Long id) {
		return stationService.findAgentsById(id);
	}

	@RequestMapping(value = "/{stationId}/agent", method = RequestMethod.POST)
	public void addAgent(@PathVariable("stationId") Long stationId,
			@RequestBody Agent agent) {
		agentService.addAgent(stationId, agent);
	}

	@RequestMapping(value = "/{stationId}/agent/{agentId}", method = RequestMethod.PUT)
	public void updateAgent(@PathVariable("stationId") Long stationId,
			@PathVariable("agentId") Long agentId,
			@RequestBody Agent agent) {
		agent.setId(agentId);
		agentService.updateAgent(stationId, agentId, agent);
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<Station> searchStationsByControlId(
			@RequestParam(value = "controlId", required = false) Long controlId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return stationService.searchStationsByControlId(controlId,page,size);
	}
	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchStationsByControlIdCount(
			@RequestParam(value = "controlId", required = false) Long controlId
			) {
		return stationService.searchStationsByControlIdCount(controlId);
	}
	

}
