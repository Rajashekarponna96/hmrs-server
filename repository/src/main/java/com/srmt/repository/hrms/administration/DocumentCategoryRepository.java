package com.srmt.repository.hrms.administration;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.DocumentCategory;

@Repository
public interface DocumentCategoryRepository extends
		PagingAndSortingRepository<DocumentCategory, Long> {

	DocumentCategory findByCode(String code);

}
