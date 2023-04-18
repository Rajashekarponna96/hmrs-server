package com.srmt.service.lookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import com.srmt.model.common.lookups.Country;
import com.srmt.model.common.lookups.State;
import com.srmt.model.hrms.administration.Language;
import com.srmt.repository.common.lookups.CountryRepository;
import com.srmt.repository.common.lookups.StateRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class CountryServiceImpl extends GenericServiceImpl<Country, Long>
		implements CountryService {

	public CountryServiceImpl() {
		super(Country.class);
	}

	@Autowired
	private CountryRepository countryRepository;

	@Autowired
	private StateRepository stateRepository;

	@Override
	public List<Country> findCountries() {
		return (List<Country>) countryRepository.findAll(new Sort(new Order(
				Direction.ASC, "name")));
	}

	@Override
	public List<State> findStatesById(Long id) {
		return stateRepository.findByCountry_Id(id);
	}

	@Override
	public void add(Country country) {
		List<Country> countries = countryRepository.findByNameOrCode(
				country.getName(), country.getCode());

		if (countries.size() != 0) {
			throw new RuntimeException("Duplicate Entry for Country");
		}
		countryRepository.save(country);

	}

	@Override
	public void updateCountry(Long id, Country country) {
		List<Country> countries = countryRepository.findByNameOrCode(
				country.getName(), country.getCode());
		if (countries.size() != 0) {
			for (Country country2 : countries) {
				if (country2.getId() != id) {
					throw new RuntimeException("Duplicate Entry for Country");
				}
			}
		}

		countryRepository.save(country);
	}

	@Override
	public void addState(Long countryId, State state) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Country> findAllSorting(int page, int size) {
		PageRequest pageRequest = new PageRequest(page, size, Direction.ASC,
				"name");
		return countryRepository.findAll(pageRequest).getContent();
	}

}
