package com.srmt.service.lookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.common.lookups.City;
import com.srmt.model.common.lookups.District;
import com.srmt.model.common.lookups.State;
import com.srmt.repository.common.lookups.CityRepository;
import com.srmt.repository.common.lookups.DistrictRepository;
import com.srmt.repository.common.lookups.StateRepository;
import com.srmt.repository.hrms.administration.DistrictSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class DistrictServiceImpl extends GenericServiceImpl<District, Long>
		implements DistrictService {

	public DistrictServiceImpl() {
		super(District.class);

	}

	@Autowired
	private DistrictRepository districtRepository;

	@Autowired
	private CityRepository cityRepository;
	@Autowired
	private StateRepository stateRepository;

	@Override
	public List<District> findByStateId(Long id) {
		return districtRepository.findByState_IdOrderByNameDesc(id);
	}

	@Override
	public List<City> findCitiesByDistrictId(Long id) {
		return cityRepository.findByDistrict_IdOrderByNameDesc(id);
	}

	@Override
	public void addDistrict(Long stateId, District district) {
		List<District> districts = districtRepository.findByNameOrCode(
				district.getName(), district.getCode());

		if (districts.size() != 0) {
			throw new RuntimeException("Duplicate Entry For District");
		}
		State state = stateRepository.findOne(stateId);
		district.setState(state);
		districtRepository.save(district);
	}

	@Override
	public void updateCountry(Long id, District district) throws Exception {
		super.update(
				District.class,
				id,
				genericSpecification.findByProperty("code", district.getCode()),
				district);
	}

	@Override
	public void updateDistrict(Long stateId, Long distId, District district) {

		List<District> districts = districtRepository.findByNameOrCode(
				district.getName(), district.getCode());

		if (districts.size() != 0) {
			for (District district2 : districts) {
				if (district2.getId() != district.getId()) {
					throw new RuntimeException("Duplicate Entry For District");
				}
			}

		}
		State state = stateRepository.findOne(stateId);
		district.setState(state);

		districtRepository.save(district);

	}

	@Override
	public List<District> searchDistrictsByStateId(Long stateId, int page,
			int size) {
		Specification<District> specifications = DistrictSpecification
				.searchDistrictByStateId(stateId);
		return districtRepository.findAll(specifications,
				new PageRequest(page, size, new Sort(Direction.ASC, "name")))
				.getContent();
	}

	@Override
	public int searchDistrictsByStateIdCount(Long stateId) {
		Specification<District> specifications = DistrictSpecification
				.searchDistrictByStateId(stateId);
		return districtRepository.findAll(specifications).size();
	}

}
