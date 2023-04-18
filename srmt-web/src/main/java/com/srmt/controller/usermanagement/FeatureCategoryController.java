package com.srmt.controller.usermanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.usermanagement.FeatureCategory;
import com.srmt.service.usermanagement.FeatureCategoryService;

@RestController
@RequestMapping(value = "/featureCategory")
public class FeatureCategoryController {

	@Autowired
	private FeatureCategoryService featureCategoryService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody FeatureCategory featureCategory) {
		featureCategoryService.add(featureCategory);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody FeatureCategory featureCategory) {
		featureCategory.setId(id);
		featureCategoryService.update(id,featureCategory);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public FeatureCategory findById(@PathVariable("id") Long id) {
		return featureCategoryService.findBy(FeatureCategory.class, id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<FeatureCategory> findByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return featureCategoryService.findAll(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public long getCount() {
		return featureCategoryService.count();
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<FeatureCategory> findAll() {
		return featureCategoryService.findAll();
	}
}
