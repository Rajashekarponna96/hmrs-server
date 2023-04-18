package com.srmt.tdv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.sales.Workshop;
import com.srmt.tdv.service.WorkShopService;
@RestController
@RequestMapping("/workshop")
public class WorkShopController {
	
	@Autowired
	private WorkShopService workShopService;
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<Workshop> searchByWorkShopCodeAndLocationId(
			@RequestParam(value = "code", required = false) String code,
			@RequestParam(value = "locationId", required = false) Long locationId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return workShopService.searchByWorkShopCodeAndLocationId(code, locationId, page, size);
	}
	
	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchByWorkShopCodeAndLocationIdCount(
			@RequestParam(value = "code", required = false) String code,
			@RequestParam(value = "locationId", required = false) Long locationId
			) {
		return workShopService.searchByWorkShopCodeAndLocationIdCount(code, locationId);
	}

}
