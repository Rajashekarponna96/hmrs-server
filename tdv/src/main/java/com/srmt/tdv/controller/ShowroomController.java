package com.srmt.tdv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.sales.ShowRoom;
import com.srmt.tdv.service.ShowroomService;

@RestController
@RequestMapping("/ShowRoom")
public class ShowroomController {
	
	@Autowired
	private ShowroomService showroomService;
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<ShowRoom> searchByShowroomCodeAndLocationId(
			@RequestParam(value = "showroomCode", required = false) String showroomCode,
			@RequestParam(value = "locationId", required = false) Long locationId,
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return showroomService.searchByShowroomIdAndLocation(showroomCode, locationId, page, size);
	}
	
	@RequestMapping(value = "/search/count", method = RequestMethod.GET)
	public int searchByShowroomCodeAndLocationIdCount(
			@RequestParam(value = "showroomCode", required = false) String showroomCode,
			@RequestParam(value = "locationId", required = false) Long locationId) {
		return showroomService.searchByShowroomIdAndLocationCount(showroomCode, locationId);
	}
}
