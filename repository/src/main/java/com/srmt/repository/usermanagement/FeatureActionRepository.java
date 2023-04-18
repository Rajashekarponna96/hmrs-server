package com.srmt.repository.usermanagement;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.srmt.model.usermanagement.FeatureAction;

public interface FeatureActionRepository extends
		PagingAndSortingRepository<FeatureAction, Long> {
	
	List<FeatureAction> findByRole_id(Long roleId);

}
