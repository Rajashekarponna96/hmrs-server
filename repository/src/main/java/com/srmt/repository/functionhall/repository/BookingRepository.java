package com.srmt.repository.functionhall.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.crm.fh.Booking;

@Repository
public interface BookingRepository extends
		PagingAndSortingRepository<Booking, Long>,
		JpaSpecificationExecutor<Booking> {
	Booking findByFunctionHallEnquiry_Id(Long enquiryId);
}
