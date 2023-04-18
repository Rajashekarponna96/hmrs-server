package com.srmt.service.transportlookups;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.transport.Agent;
import com.srmt.model.transport.Control;
import com.srmt.model.transport.Station;
import com.srmt.repository.transport.AgentRepository;
import com.srmt.repository.transport.ControlRepository;
import com.srmt.repository.transport.StationRepository;
import com.srmt.repository.transport.StationSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class StationServiceImpl extends GenericServiceImpl<Station, Long>implements StationService {
	
	
	@Autowired
	private ControlRepository controlRepository;
	
	
	@Autowired
	private StationRepository stationRepository;

	public StationServiceImpl() {
		super(Station.class);

	}
	@Autowired
	private AgentRepository agentRepository;
	
	@Override
	public void addStation(Long controlId, Station station) {
		List<Station> stations = stationRepository.findByNameOrCode(station.getName(),
				station.getCode());
		if (stations.size() != 0) {
			throw new RuntimeException("Duplicate Entry For Station");
		}
		Control control = controlRepository.findOne(controlId);
		station.setControl(control);
		stationRepository.save(station);
	}

	@Override
	public void updateStation(Long id, Station station) {
		List<Station> stations = stationRepository.findByNameOrCode(station.getName(),
				station.getCode());

		if (stations.size() != 0) {
			for (Station station2 : stations) {
				if (station2.getId() != station.getId()) {
					throw new RuntimeException("Duplicate Entry For Station");

				}

			}

		}

		stationRepository.save(station);
	}

	
	
	@Override
	public List<Station> searchStationsByControlId(Long controlId, int page,
			int size) {
		Specification<Station> specifications = StationSpecification
				.searchStationByControlName(controlId);
		return stationRepository.findAll(specifications,
				new PageRequest(page, size, new Sort(new Order(Direction.ASC,
						"name"))))
				.getContent();
	}

	@Override
	public int searchStationsByControlIdCount(Long controlId) {
		Specification<Station> specifications = StationSpecification
				.searchStationByControlName(controlId);
		return stationRepository.findAll(specifications).size();
	}

	@Override
	public List<Agent> findAgentsById(Long id) {
		return agentRepository.findByStation_IdOrderByAgentNameDesc(id);
	}


}
