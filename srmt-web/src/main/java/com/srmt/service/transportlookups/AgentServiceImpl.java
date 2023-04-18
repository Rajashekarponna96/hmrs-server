package com.srmt.service.transportlookups;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.transport.Agent;
import com.srmt.model.transport.Station;
import com.srmt.repository.specifications.transport.AgentSpecifications;
import com.srmt.repository.transport.AgentRepository;
import com.srmt.repository.transport.StationRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class AgentServiceImpl extends GenericServiceImpl<Agent, Long> implements AgentService {

	public AgentServiceImpl() {
		super(Agent.class);
	}
	@Autowired
	private AgentRepository agentRepository; 
	
	@Autowired
	private StationRepository stationRepository;

	@Override
	public void addAgent(Long stationId, Agent agent) {
		
		List<Agent> agents = agentRepository.findByAgentNameOrAgentCode(
				agent.getAgentName(), agent.getAgentCode());

		if (agents.size() != 0) {
			throw new RuntimeException("Duplicate Entry For Agent");
		}
		Station station = stationRepository.findOne(stationId);
		agent.setStation(station);
		agentRepository.save(agent);
		
	}
	
	

	@Override
	public void updateAgent(Long stationId, Long agentId, Agent agent) {
		List<Agent> agents = agentRepository.findByAgentNameOrAgentCode(
				agent.getAgentName(), agent.getAgentCode());

		if (agents.size() != 0) {
			for (Agent agent2 : agents) {
				if (agent2.getId() != agent.getId()) {
					throw new RuntimeException("Duplicate Entry For Agent");
				}
			}

		}
		Station station = stationRepository.findOne(stationId);
		agent.setStation(station);

		agentRepository.save(agent);		
	}


	@Override
	public void updateControl(Long id, Agent agent) throws Exception {
		super.update(
				Agent.class,
				id,
				genericSpecification.findByProperty("agentCode", agent.getAgentCode()),
				agent);		
	}

	@Override
	public List<Agent> searchAgentsByStationId(Long stationId, int page, int size) {
		
		Specification<Agent> specifications = AgentSpecifications
				.searchAgentByStationId(stationId);
		return agentRepository.findAll(specifications,
				new PageRequest(page, size, new Sort(Direction.ASC, "agentName")))
				.getContent();
	}

	@Override
	public int searchAgentsByStationIdCount(Long stationId) {
		Specification<Agent> specifications = AgentSpecifications
				.searchAgentByStationId(stationId);
		return agentRepository.findAll(specifications).size();
	}



	

	
	
	
	}


