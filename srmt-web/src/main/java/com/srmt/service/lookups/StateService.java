package com.srmt.service.lookups;

import java.util.List;

import com.srmt.model.common.lookups.District;
import com.srmt.model.common.lookups.State;
import com.srmt.service.GenericService;

public interface StateService extends GenericService<State, Long>{

	List<District> findDistrictsById(Long id);

	void addState(Long countryId, State state);

	void updateState(Long id, State state);

	

	

	List<State> searchStatesByCountryId(Long countryId, int page, int size);

	int searchStatesByCountryIdCount(Long countryId);

}
