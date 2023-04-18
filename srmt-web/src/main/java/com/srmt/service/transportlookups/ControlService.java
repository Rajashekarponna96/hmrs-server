package com.srmt.service.transportlookups;

import java.util.List;

import com.srmt.model.transport.Control;
import com.srmt.model.transport.Station;
import com.srmt.service.GenericService;

public interface ControlService extends GenericService<Control, Long>{

	List<Control> findAllSorting(int page, int size);

	List<Station> findStationsById(Long id);

	void add(Control control);

	void updateControl(Long id, Control control);
	
	void addStation(Long controlId, Station station);

	List<Control> findControls();

/*	void deleteControl(Long id);*/

}
