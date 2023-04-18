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
import com.srmt.service.transportlookups.AgentService;

@RestController
@RequestMapping(value="/agent")
public class AgentController {
	
	
	@Autowired
	private AgentService agentService;
	
	/*@RequestMapping(value = "/{stationId}", method = RequestMethod.POST)
	public void addAgent(@PathVariable("stationId") Long stationId,
			@RequestBody Agent agent) {
		agentService.addAgent(stationId, agent);
	}*/

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateControl(@PathVariable("id") Long id,
			@RequestBody Agent agent) throws Exception {
		agentService.updateControl(id, agent);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<Agent> searchAgentsByStationId(
	@RequestParam(value = "stationId", required = false) Long stationId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return agentService.searchAgentsByStationId(stationId,
				page, size);
	}

	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchAgentsByAndStationIdCount(
	@RequestParam(value = "stationId", required = false) Long stationId) {
		return agentService
				.searchAgentsByStationIdCount(stationId);
	}
	
	
	
}
