package com.srmt.repository.usermanagement;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.usermanagement.Feature;
@Repository
public interface FeatureRepository extends PagingAndSortingRepository<Feature, Long> {

}
