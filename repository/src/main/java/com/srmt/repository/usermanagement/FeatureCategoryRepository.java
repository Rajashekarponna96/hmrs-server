package com.srmt.repository.usermanagement;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.srmt.model.usermanagement.FeatureCategory;

public interface FeatureCategoryRepository extends
		PagingAndSortingRepository<FeatureCategory, Long> {
	
	public FeatureCategory findByName(String name);

}
