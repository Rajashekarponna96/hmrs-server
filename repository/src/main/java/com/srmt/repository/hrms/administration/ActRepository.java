package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.Act;
@Repository
public interface ActRepository extends PagingAndSortingRepository<Act, Long> {
	
	public Act findByCode(String code);
 
}
