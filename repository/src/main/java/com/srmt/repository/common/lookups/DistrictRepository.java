package com.srmt.repository.common.lookups;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.common.lookups.District;

@Repository
public interface DistrictRepository extends
		PagingAndSortingRepository<District, Long> ,JpaSpecificationExecutor<District>{

	List<District> findByState_Id(Long id);
	
	public District findByCode(String code);
	
	List<District> findByNameOrCode(String name,String code);

	List<District> findByState_IdOrderByNameDesc(Long id);

}
