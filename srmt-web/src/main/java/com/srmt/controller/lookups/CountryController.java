package com.srmt.controller.lookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.common.lookups.Country;
import com.srmt.model.common.lookups.State;
import com.srmt.service.lookups.CountryService;
import com.srmt.service.lookups.StateService;

@RestController
@RequestMapping("/country")
public class CountryController {

	@Autowired
	private CountryService countryService;

	@Autowired
	private StateService stateService;

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Country> findCountries(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return countryService.findAllSorting(page, size);
	}

	@RequestMapping(value = "/{id}/states", method = RequestMethod.GET)
	public List<State> findStatesById(@PathVariable("id") Long id) {
		return countryService.findStatesById(id);
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Country country) {
		countryService.add(country);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateCountry(@PathVariable("id") Long id,
			@RequestBody Country country) {
		countryService.updateCountry(id, country);
	}

	@RequestMapping(value = "/{id}/state", method = RequestMethod.POST)
	public void addState(@PathVariable("id") Long countryId,
			@RequestBody State state) {
		stateService.addState(countryId, state);
	}

	@RequestMapping(value = "/{countryId}/state/{stateId}", method = RequestMethod.PUT)
	public void updateState(@PathVariable("countryId") Long countryId,
			@PathVariable("stateId") Long stateId, @RequestBody State state) {
		state.setId(stateId);
		stateService.updateState(countryId, state);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public int getCountriesCount() {
		return countryService.findCountries().size();

	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Country> findAllCountries() {
		return countryService.findCountries();
	}

}
