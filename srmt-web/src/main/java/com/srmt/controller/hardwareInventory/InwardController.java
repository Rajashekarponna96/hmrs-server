package com.srmt.controller.hardwareInventory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hardwareInventory.Inward;
import com.srmt.service.hardwareInventory.InwardService;

@RestController
@RequestMapping("/inward")
public class InwardController {
	
	@Autowired
	private InwardService inwardService;
	
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody Inward inward) {
		inwardService.add(inward);
	}
	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<Inward> findInwards(@RequestParam("page") int page,
			@RequestParam("size") int size) {
		return inwardService.findAllSorting(page, size);
	}
	
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateInward(@PathVariable("id") Long id, @RequestBody Inward inward) {
		inwardService.updateInward(id, inward);
	}

	
	
	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public int getInwardsCount() {
		return inwardService.findInwards().size();

	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Inward> findAllInwards() {
		return inwardService.findInwards();
		
		
	}
}
