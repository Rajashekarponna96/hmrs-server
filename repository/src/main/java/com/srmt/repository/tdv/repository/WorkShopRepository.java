package com.srmt.repository.tdv.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.sales.ShowRoom;
import com.srmt.model.sales.Workshop;
@Repository
public interface WorkShopRepository extends PagingAndSortingRepository<Workshop, Long>
,JpaSpecificationExecutor<Workshop>
{

}
