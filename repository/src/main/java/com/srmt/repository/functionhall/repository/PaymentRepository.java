package com.srmt.repository.functionhall.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.crm.fh.Payment;

@Repository
public interface PaymentRepository extends
		PagingAndSortingRepository<Payment, Long>,
		JpaSpecificationExecutor<Payment> {

}
