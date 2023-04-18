package com.srmt.service.transportlookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;


import com.srmt.model.transport.Control;
import com.srmt.model.transport.Station;
import com.srmt.repository.transport.ControlRepository;
import com.srmt.repository.transport.StationRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class ControlServiceImpl extends GenericServiceImpl<Control, Long>
implements ControlService {
	
	
	public ControlServiceImpl() {
		super(Control.class);
	}



	@Autowired
	private ControlRepository controlRepository;
	
	@Autowired
	private StationRepository stationRepository;
	
	
	@Override
	public List<Control> findControls() {
		return (List<Control>) controlRepository.findAll(new Sort(new Order(
				Direction.ASC, "name")));
	}

	@Override
	public List<Station> findStationsById(Long id) {
		return stationRepository.findByControl_Id(id);
	}
	
	
	@Override
	public void add(Control control) {
		List<Control> controls = controlRepository.findByNameOrCode(
				control.getName(), control.getCode());

		if (controls.size() != 0) {
			throw new RuntimeException("Duplicate Entry for Country");
		}
		controlRepository.save(control);

	}

	@Override
	public void updateControl(Long id, Control control) {
		List<Control> controls = controlRepository.findByNameOrCode(
				control.getName(), control.getCode());
		if (controls.size() != 0) {
			for (Control control2 : controls) {
				if (control2.getId() != id) {
					throw new RuntimeException("Duplicate Entry for Control");
				}
			}
		}

		controlRepository.save(control);
	}
	/*@Override
	public void deleteControl(Long id) {
		Control control=controlRepository.findOne(id);
		controlRepository.delete(control);		
	}*/
	
	@Override
	public void addStation(Long controlId, Station station) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Control> findAllSorting(int page, int size) {
		PageRequest pageRequest = new PageRequest(page, size, Direction.ASC,
				"name");
		return controlRepository.findAll(pageRequest).getContent();
	}
}
