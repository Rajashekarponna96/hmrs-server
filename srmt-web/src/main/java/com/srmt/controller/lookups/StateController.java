package com.srmt.controller.lookups;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.common.lookups.District;
import com.srmt.model.common.lookups.State;
import com.srmt.service.lookups.DistrictService;
import com.srmt.service.lookups.StateService;

@RestController
@RequestMapping(value = "/state")
public class StateController {

	@Autowired
	private StateService stateService;

	@Autowired
	private DistrictService districtService;

	@RequestMapping(value = "{id}/districts", method = RequestMethod.GET)
	public List<District> findDistrictsById(@PathVariable("id") Long id) {
		return stateService.findDistrictsById(id);
	}

	@RequestMapping(value = "/{stateId}/district", method = RequestMethod.POST)
	public void addDistrict(@PathVariable("stateId") Long stateId,
			@RequestBody District district) {
		districtService.addDistrict(stateId, district);
	}

	@RequestMapping(value = "/{stateId}/district/{districtId}", method = RequestMethod.PUT)
	public void updateDistrict(@PathVariable("stateId") Long stateId,
			@PathVariable("districtId") Long districtId,
			@RequestBody District district) {
		district.setId(districtId);
		districtService.updateDistrict(stateId, districtId, district);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<State> searchStatesByCountryId(
			@RequestParam(value = "countryId", required = false) Long countryId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return stateService.searchStatesByCountryId(countryId,page,size);
	}
	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchStatesByCountryIdCount(
			@RequestParam(value = "countryId", required = false) Long countryId
			) {
		return stateService.searchStatesByCountryIdCount(countryId);
	}

}
