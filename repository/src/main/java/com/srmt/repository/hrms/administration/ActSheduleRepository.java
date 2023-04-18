package com.srmt.repository.hrms.administration;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.ActShedule;
@Repository
public interface ActSheduleRepository extends PagingAndSortingRepository<ActShedule, Long> ,JpaSpecificationExecutor<ActShedule>{

	List<ActShedule> findActsById(Long id);

}
