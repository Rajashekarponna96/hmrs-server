package com.srmt.service.masters;

import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Location;
import com.srmt.service.GenericServiceImpl;

@Service
public class LocatinServiceImpl extends GenericServiceImpl<Location, Long>
		implements LocationService {

	public LocatinServiceImpl() {
		super(Location.class);
	}

	@Override
	public void add(Location location) {
		super.add(
				Location.class,
				location.getCode(),
				genericSpecification.findByProperty("code", location.getCode()),
				location);
	}

	@Override
	public void update(Long id, Location location) throws Exception {
		super.update(
				Location.class,
				id,
				genericSpecification.findByProperty("code", location.getCode()),
				location);

	}

}
