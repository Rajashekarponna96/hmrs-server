package com.srmt.service.transportlookups;

import java.util.List;

import com.srmt.model.transport.Agent;
import com.srmt.model.transport.Station;

public interface StationService {

	void addStation(Long controlId, Station station);

	void updateStation(Long controlId, Station station);

	List<Station> searchStationsByControlId(Long controlId, int page, int size);

	int searchStationsByControlIdCount(Long controlId);

	List<Agent> findAgentsById(Long id);

}
