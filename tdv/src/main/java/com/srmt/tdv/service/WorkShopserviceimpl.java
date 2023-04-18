package com.srmt.tdv.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.sales.Workshop;
import com.srmt.repository.specifications.tdv.WorkShopSpecification;
import com.srmt.repository.tdv.repository.WorkShopRepository;
@Service
public class WorkShopserviceimpl implements WorkShopService {

	@Autowired
	private WorkShopRepository workShopRepository;
	
	
	@Override
	public List<Workshop> searchByWorkShopCodeAndLocationId(String code,
			Long locationId, int page, int size) {
		
		Specification<Workshop> specification = WorkShopSpecification.searchByShowroomCodeOrLocationId(
				code, locationId);
		return workShopRepository.findAll(specification,
				new PageRequest(page, size)).getContent();
	}


	@Override
	public int searchByWorkShopCodeAndLocationIdCount(String code,
			Long locationId) {
		Specification<Workshop> specification = WorkShopSpecification.searchByShowroomCodeOrLocationId(
				code, locationId);
		return workShopRepository.findAll(specification)
				.size();
	}

}
