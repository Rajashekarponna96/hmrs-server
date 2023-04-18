package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.CompanyInfo;

@Repository
public interface CompanyInfoRepository extends
		PagingAndSortingRepository<CompanyInfo, Long> {

}
