package com.srmt.repository.functionhall.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.crm.fh.Invoice;
@Repository
public interface Invoicerepository extends PagingAndSortingRepository<Invoice, Long> {

}
