package com.srmt.repository.transport;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.transport.Station;

@Repository
public interface StationRepository extends PagingAndSortingRepository<Station, Long>,JpaSpecificationExecutor<Station> {


	List<Station> findByControl_Id(Long id);

	List<Station> findByNameOrCode(String name, String code);

}
