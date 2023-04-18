package com.srmt.service.usermanagement;

import java.util.List;

import com.srmt.model.usermanagement.FeatureCategory;
import com.srmt.service.GenericService;

public interface FeatureCategoryService extends
		GenericService<FeatureCategory, Long> {

	void add(FeatureCategory featureCategory);

	void update(Long id, FeatureCategory featureCategory);

	List<FeatureCategory> findAll();

}
