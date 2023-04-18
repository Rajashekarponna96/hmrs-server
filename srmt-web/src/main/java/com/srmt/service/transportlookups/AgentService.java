package com.srmt.service.transportlookups;



import java.util.List;

import com.srmt.model.transport.Agent;
import com.srmt.service.GenericService;

public interface AgentService extends GenericService<Agent, Long>{

	void addAgent(Long stationId, Agent agent);


	void updateControl(Long id, Agent agent) throws Exception;

	List<Agent> searchAgentsByStationId(Long stationId, int page, int size);

	int searchAgentsByStationIdCount(Long stationId);

	void updateAgent(Long stationId, Long agentId, Agent agent);

	
	
	

	




}
