package com.srmt.service.usermanagement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.srmt.model.usermanagement.Feature;
import com.srmt.repository.usermanagement.FeatureRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class FeatureServiceImpl extends GenericServiceImpl<Feature, Long>
		implements FeatureService {
	
	private FeatureRepository featureRepository;

	public FeatureServiceImpl() {
		super(Feature.class);

	}

	@Override
	public void add(Feature feature) {
		super.add(Feature.class, feature.getName(),
				genericSpecification.findByProperty("name", feature.getName()),
				feature);

	}

	@Override
	public void upadte(Long id, Feature feature) throws Exception {
		super.update(Feature.class, id,
				genericSpecification.findByProperty("name", feature.getName()),
				feature);
	}

	@Override
	public Long getCount() {
		
		return super.count();
	}

	@Override
	public List<Feature> getAllFeatures() {
		
		return (List<Feature>) featureRepository.findAll();
	}

	@Override
	public void deleteById(Long id) {
		super.delete(id);
		
	}

}
