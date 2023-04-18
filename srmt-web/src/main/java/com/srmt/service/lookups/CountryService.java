package com.srmt.service.lookups;

import java.util.List;

import com.srmt.model.common.lookups.Country;
import com.srmt.model.common.lookups.State;
import com.srmt.service.GenericService;

public interface CountryService extends  GenericService<Country, Long>{

	List<Country> findCountries();

	List<State> findStatesById(Long id);

	void add(Country country);

	void updateCountry(Long id, Country country);

	void addState(Long countryId, State state);

	List<Country> findAllSorting(int page, int size);
	


}
