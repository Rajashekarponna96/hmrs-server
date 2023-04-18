package com.srmt.service.lookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.common.lookups.Country;
import com.srmt.model.common.lookups.District;
import com.srmt.model.common.lookups.State;
import com.srmt.repository.common.lookups.CountryRepository;
import com.srmt.repository.common.lookups.DistrictRepository;
import com.srmt.repository.common.lookups.StateRepository;
import com.srmt.repository.hrms.administration.StateSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class StateServiceImpl extends GenericServiceImpl<State, Long> implements
		StateService {

	@Autowired
	private CountryRepository countryRepository;
	@Autowired
	private StateRepository stateRepository;

	public StateServiceImpl() {
		super(State.class);

	}

	@Autowired
	private DistrictRepository districtRepository;

	@Override
	public List<District> findDistrictsById(Long id) {
		return districtRepository.findByState_IdOrderByNameDesc(id);
	}

	@Override
	public void addState(Long countryId, State state) {
		List<State> states = stateRepository.findByNameOrCode(state.getName(),
				state.getCode());
		if (states.size() != 0) {
			throw new RuntimeException("Duplicete Entry For State");
		}
		Country country = countryRepository.findOne(countryId);
		state.setCountry(country);
		stateRepository.save(state);
	}

	@Override
	public void updateState(Long id, State state) {
		List<State> states = stateRepository.findByNameOrCode(state.getName(),
				state.getCode());

		if (states.size() != 0) {
			for (State state2 : states) {
				if (state2.getId() != state.getId()) {
					throw new RuntimeException("Duplicete Entry For State");

				}

			}

		}

		stateRepository.save(state);
	}

	@Override
	public List<State> searchStatesByCountryId(Long countryId, int page,
			int size) {
		Specification<State> specifications = StateSpecification
				.searchStateByCountryName(countryId);
		return stateRepository.findAll(
				specifications,
				new PageRequest(page, size, new Sort(new Order(Direction.ASC,
						"name")))).getContent();
	}

	@Override
	public int searchStatesByCountryIdCount(Long countryId) {
		Specification<State> specifications = StateSpecification
				.searchStateByCountryName(countryId);
		return stateRepository.findAll(specifications).size();
	}

}
