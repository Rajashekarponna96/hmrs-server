package com.srmt.repository.hrms.administration;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.Location;
@Repository
public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {
	
	List<Location> findBySalesRep_Id(Long salesRepId);
}
