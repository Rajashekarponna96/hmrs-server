package com.srmt.service.masters;

import com.srmt.model.hrms.administration.CompanyInfo;

public interface CompanyInfoService {

	void add(CompanyInfo companyInfo);

	void update(Long id, CompanyInfo companyInfo);

	CompanyInfo getById(Long id);

	CompanyInfo findByFirst();

}
