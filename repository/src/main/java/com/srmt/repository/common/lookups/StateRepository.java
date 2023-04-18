package com.srmt.repository.common.lookups;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.common.lookups.State;

@Repository
public interface StateRepository extends
		PagingAndSortingRepository<State, Long> ,JpaSpecificationExecutor<State>{

	List<State> findByCountry_Id(Long id);
	
	List<State> findByNameOrCode(String name,String code);

}
