package com.srmt.repository.tdv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.crm.fh.FunctionHallEnquiry;
import com.srmt.model.crm.fh.Invoice;
import com.srmt.model.sales.ShowRoom;

@Repository
public interface ShowroomRepository extends PagingAndSortingRepository<ShowRoom, Long>,JpaSpecificationExecutor<ShowRoom>{
static final String FIND_BY_SHOWROOM_ID_AND_LOCATION = "select showRoom from ShowRoom showRoom where showRoom.code=:code and showRoom.location.id=:locationId";
	
	@Query(FIND_BY_SHOWROOM_ID_AND_LOCATION)
	List<ShowRoom> findByCodeOrLocation_Id(@Param("code") String code, @Param("locationId") Long locationId);
}
 