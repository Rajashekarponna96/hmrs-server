package com.srmt.repository.functionhall.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.crm.fh.FunctionHallEnquiry;

@Repository
public interface FunctionHallEnquiryRepository extends
		PagingAndSortingRepository<FunctionHallEnquiry, Long>,
		JpaSpecificationExecutor<FunctionHallEnquiry> {

	static final String FIND_MONTHLY_FUNCTION_HALL_ENQUIRY = "select functionHallEnquiry from FunctionHallEnquiry functionHallEnquiry where MONTH(functionHallEnquiry.requiredFromDate)=:month and YEAR(functionHallEnquiry.requiredFromDate)=:year ";

	static final String FIND_DATE_WISE_FUNCTION_HALL_ENQUIRY = "select functionHallEnquiry from FunctionHallEnquiry functionHallEnquiry where DAY(functionHallEnquiry.requiredFromDate)=:date and MONTH(functionHallEnquiry.requiredFromDate)=:month and YEAR(functionHallEnquiry.requiredFromDate)=:year ";
	
	@Query(FIND_DATE_WISE_FUNCTION_HALL_ENQUIRY)
	List<FunctionHallEnquiry> findByRequiredFromDate(@Param("date") int date, @Param("month") int month, @Param("year") int year);

	@Query(FIND_MONTHLY_FUNCTION_HALL_ENQUIRY)
	List<FunctionHallEnquiry> findByMonthly(@Param("month") int month,
			@Param("year") int year);

}
