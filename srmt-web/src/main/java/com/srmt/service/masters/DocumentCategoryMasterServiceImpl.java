package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.DocumentCategory;
import com.srmt.repository.hrms.administration.DocumentCategoryRepository;

@Service
public class DocumentCategoryMasterServiceImpl implements
		DocumentCategoryMasterService {

	@Autowired
	private DocumentCategoryRepository documentCategoryMasterRepository;

	public void add(DocumentCategory documentCategoryMaster) {
		DocumentCategory thisdocumentCategoryMaster = documentCategoryMasterRepository
				.findByCode(documentCategoryMaster.getCode());
		if (thisdocumentCategoryMaster != null) {
			throw new RuntimeException("Document Category Master ["
					+ documentCategoryMaster.getCode() + "] already exists.");
		}
		documentCategoryMasterRepository.save(documentCategoryMaster);
	}

	@Override
	public void update(Long id, DocumentCategory categoryMaster) {
		DocumentCategory documentCategoryMaster = documentCategoryMasterRepository
				.findOne(id);
		if (documentCategoryMaster == null) {
			throw new RuntimeException("Document Category Master [" + id
					+ "] does not  exists.");
		}
		documentCategoryMaster.setCode(categoryMaster.getCode());
		documentCategoryMaster.setName(categoryMaster.getName());
		documentCategoryMasterRepository.save(categoryMaster);
	}

	@Override
	public void deleteById(Long id) {
		DocumentCategory documentCategoryMaster = documentCategoryMasterRepository
				.findOne(id);
		if (documentCategoryMaster == null) {
			throw new RuntimeException("Document Category Master [" + id
					+ "] does not  exists.");
		}
		documentCategoryMasterRepository.delete(documentCategoryMaster);

	}

	@Override
	public DocumentCategory findById(Long id) {
		DocumentCategory documentCategoryMaster = documentCategoryMasterRepository
				.findOne(id);
		if (documentCategoryMaster == null) {
			throw new RuntimeException("Document Category Master [" + id
					+ "] does not  exists.");
		}
		return documentCategoryMaster;
	}

	@Override
	public List<DocumentCategory> getByPageAndSize(int page, int size) {
		return documentCategoryMasterRepository.findAll(
				new PageRequest(page, size)).getContent();
	}

	@Override
	public long getCount() {
		return documentCategoryMasterRepository.count();
	}
}
