package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.CompanyInfo;
import com.srmt.repository.hrms.administration.CompanyInfoRepository;

@Service
public class CompanyInfoServiceImpl implements CompanyInfoService {

	@Autowired
	private CompanyInfoRepository companyInfoRepository;

	@Override
	public void add(CompanyInfo companyInfo) {
		companyInfoRepository.save(companyInfo);
	}

	@Override
	public void update(Long id, CompanyInfo companyInfo) {

		CompanyInfo thisCompanyInfo = companyInfoRepository.findOne(id);
		thisCompanyInfo.setAddress(companyInfo.getAddress());
		thisCompanyInfo.setCode(companyInfo.getCode());
		thisCompanyInfo.setEmail(companyInfo.getEmail());
		thisCompanyInfo.setFax(companyInfo.getFax());
		thisCompanyInfo.setName(companyInfo.getName());
		thisCompanyInfo.setNotes(companyInfo.getNotes());
		thisCompanyInfo.setPhone(companyInfo.getPhone());
		thisCompanyInfo.setRegistrationNumber(companyInfo
				.getRegistrationNumber());
		thisCompanyInfo.setTaxId(companyInfo.getTaxId());
		companyInfoRepository.save(thisCompanyInfo);

	}

	@Override
	public CompanyInfo getById(Long id) {

		CompanyInfo companyInfo = companyInfoRepository.findOne(id);
		if (companyInfo == null) {
			throw new RuntimeException("CompanyInfo [" + id
					+ "] id  does not exist.");
		}
		return companyInfo;
	}

	@Override
	public CompanyInfo findByFirst() {
		List<CompanyInfo> companyList = companyInfoRepository.findAll(
				new PageRequest(0, 1)).getContent();
		return companyList.size() == 0 ? null : companyList.get(0);
	}
}
