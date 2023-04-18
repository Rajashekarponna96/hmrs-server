package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.DocumentCategory;

public interface DocumentCategoryMasterService {

	void add(DocumentCategory documentCategoryMaster);

	void update(Long id, DocumentCategory categoryMaster);

	void deleteById(Long id);

	DocumentCategory findById(Long id);

	List<DocumentCategory> getByPageAndSize(int page, int size);

	long getCount();

}
