package com.srmt.service.usermanagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.srmt.model.usermanagement.Feature;
import com.srmt.model.usermanagement.FeatureCategory;
import com.srmt.repository.usermanagement.FeatureCategoryRepository;
import com.srmt.repository.usermanagement.FeatureRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class FeatureCategoryServiceImpl extends
		GenericServiceImpl<FeatureCategory, Long> implements
		FeatureCategoryService {
	@Autowired
	private FeatureCategoryRepository featureCategoryRepository;
	
	@Autowired
	private FeatureRepository featureRepository;

	public FeatureCategoryServiceImpl() {
		super(FeatureCategory.class);
	}

	@Override
	public void add(FeatureCategory featureCategory) {
		featureCategory.getFeatures().forEach(
				f -> f.setFeatureCategory(featureCategory));
		super.add(
				FeatureCategory.class,
				featureCategory.getName(),
				genericSpecification.findByProperty("name",
						featureCategory.getName()), featureCategory);
	}

	@Override
	public void update(Long id, FeatureCategory featureCategory) {
		FeatureCategory dbFeatureCategory = featureCategoryRepository
				.findByName(featureCategory.getName());
		if (dbFeatureCategory != null) {
			if (!dbFeatureCategory.getId().equals(id)) {
				throw new RuntimeException(
						"Feature Category already exist with this name");
			}
		}
		
		dbFeatureCategory.setFeatures(featureCategory.getFeatures());
		
		for (Feature feature : dbFeatureCategory.getFeatures()) {
			feature.setFeatureCategory(dbFeatureCategory);
		};
		
		dbFeatureCategory.setName(featureCategory.getName());
		dbFeatureCategory.setDescription(featureCategory.getDescription());
		baseRepository.save(dbFeatureCategory);
	}

	@Override
	public List<FeatureCategory> findAll() {
		return baseRepository.findAll();
	}

}
