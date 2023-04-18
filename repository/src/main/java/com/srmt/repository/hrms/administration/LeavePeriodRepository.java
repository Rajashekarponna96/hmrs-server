package com.srmt.repository.hrms.administration;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.LeavePeriod;

@Repository
public interface LeavePeriodRepository extends
		PagingAndSortingRepository<LeavePeriod, Long> {

	LeavePeriod findByCode(String code);

	String SEARCH_DUPLICATE = "select  leavePeriod from  LeavePeriod leavePeriod where leavePeriod.startDate <= :startDate and leavePeriod.endDate >= :startDate";

	@Query(SEARCH_DUPLICATE)
	List<LeavePeriod> findLeavePeriod(@Param("startDate") LocalDate startDate);
}
