package com.srmt.repository.tdv.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.sales.tdv.SalesOrderTdvDump;

@Repository
public interface OutPutOrderDumpRepository  extends PagingAndSortingRepository<SalesOrderTdvDump, Long>{

}
