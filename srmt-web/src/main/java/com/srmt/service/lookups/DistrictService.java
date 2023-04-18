package com.srmt.service.lookups;

import java.util.List;

import com.srmt.model.common.lookups.City;
import com.srmt.model.common.lookups.District;
import com.srmt.service.GenericService;

public interface DistrictService extends GenericService<District, Long>{

	List<District> findByStateId(Long id);


	List<City> findCitiesByDistrictId(Long id);


	void addDistrict(Long stateId, District district);


	void updateCountry(Long id, District district) throws Exception;


	void updateDistrict(Long stateId, Long distId, District district);


	List<District> searchDistrictsByStateId(Long stateId, int page, int size);


	int searchDistrictsByStateIdCount(Long stateId);


	
}
