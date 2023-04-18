package com.srmt.service.masters;

import com.srmt.model.hrms.administration.Location;
import com.srmt.service.GenericService;

public interface LocationService extends GenericService<Location, Long> {

	void add(Location location);

	void update(Long id, Location location) throws Exception;

	void delete(Long id);

}
