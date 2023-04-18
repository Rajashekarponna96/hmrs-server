package com.srmt.controller.usermanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.usermanagement.Feature;
import com.srmt.service.usermanagement.FeatureService;

@RestController
@RequestMapping(value="/feature")
public class FeatureController {
	@Autowired
	private FeatureService featureService;
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public void add(@RequestBody Feature feature){
		featureService.add(feature);
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.PUT)
	public void upadte(@PathVariable("id") Long id,@RequestBody Feature feature) throws Exception{
		featureService.upadte(id,feature);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		featureService.deleteById(id);
	}
	
	@RequestMapping(value="/pagination",method=RequestMethod.GET)
	public List<Feature> findByPageAndSize(@RequestParam("page") int page,@RequestParam("size") int size){
		return featureService.findAll(page, size);
	}
	
	@RequestMapping(value="/count",method=RequestMethod.GET)
	public Long getCount(){
		
		return featureService.getCount();
	}
	
	@RequestMapping(value="/all",method=RequestMethod.GET)
	public List<Feature> getAllFeatures(){
		return featureService.getAllFeatures();
		
	}


}
