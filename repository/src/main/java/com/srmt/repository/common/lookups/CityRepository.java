package com.srmt.repository.common.lookups;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.common.lookups.City;

@Repository
public interface CityRepository extends PagingAndSortingRepository<City, Long> {

	List<City> findByDistrict_Id(Long id);

	List<City> findByDistrict_IdOrderByNameDesc(Long id);

}
