package com.srmt.service.usermanagement;

import java.util.List;

import com.srmt.model.usermanagement.Feature;
import com.srmt.service.GenericService;

public interface FeatureService extends GenericService<Feature, Long>{

	void add(Feature feature);

	void upadte(Long id, Feature feature) throws Exception;

	
	Long getCount();

	List<Feature> getAllFeatures();

	void deleteById(Long id);

}
