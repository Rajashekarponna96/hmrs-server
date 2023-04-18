package com.srmt.repository.tdv.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.sales.Customer;

@Repository
public interface CustomerRepository extends PagingAndSortingRepository<Customer, Long> {
	List<Customer> findBySalesRepresentative_Id(Long salesRepId, Pageable pageable);
}
