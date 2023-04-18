package com.srmt.controller.lookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.common.lookups.City;
import com.srmt.model.common.lookups.District;
import com.srmt.service.lookups.DistrictService;

@RestController
@RequestMapping(value = "/district")
public class DistrictController {

	@Autowired
	private DistrictService districtService;

	@RequestMapping(value = "/{id}/cities", method = RequestMethod.GET)
	public List<City> findByDistrictId(@PathVariable("id") Long id) {
		return districtService.findCitiesByDistrictId(id);
	}

	@RequestMapping(value = "/{stateId}", method = RequestMethod.POST)
	public void addDistrict(@PathVariable("stateId") Long stateId,
			@RequestBody District district) {
		districtService.addDistrict(stateId, district);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateCountry(@PathVariable("id") Long id,
			@RequestBody District district) throws Exception {
		districtService.updateCountry(id, district);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<District> searchDistrictsByStateId(
	@RequestParam(value = "stateId", required = false) Long stateId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return districtService.searchDistrictsByStateId(stateId,
				page, size);
	}

	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchDistrictsByAndStateIdCount(
	@RequestParam(value = "stateId", required = false) Long stateId) {
		return districtService
				.searchDistrictsByStateIdCount(stateId);
	}
}
