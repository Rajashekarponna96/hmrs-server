package com.srmt.repository.common.lookups;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.common.lookups.Country;

@Repository
public interface CountryRepository extends
		PagingAndSortingRepository<Country, Long> {
	
	List<Country> findByNameOrCode(String name,String code);
	
	List<Country> findByNameOrCodeAndIdNot(String name,String code,Long id);
	

}
