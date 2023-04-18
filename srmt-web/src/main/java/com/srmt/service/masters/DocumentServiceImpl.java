package com.srmt.service.masters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.DocumentCategory;
import com.srmt.model.hrms.employee.Document;
import com.srmt.repository.hrms.administration.DocumentCategoryRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class DocumentServiceImpl extends GenericServiceImpl<Document, Long>
		implements DocumentService {

	@Autowired
	private DocumentCategoryRepository documentCategoryRepository;

	@Autowired
	private com.srmt.repository.hrms.employee.DocumentRepository documentRepository;

	public DocumentServiceImpl() {
		super(Document.class);
	}

	@Override
	public void addDocument(long id, Document document) {
		super.add(DocumentCategory.class, id, document, null);

	}

	@Override
	public void updateDocument(Long id, Document document) {
		// super.add(DocumentCategory.class, id, document, null);
		DocumentCategory documentCategory = documentCategoryRepository
				.findOne(id);
		document.setDocumentCategory(documentCategory);
		Document document1 = documentRepository.findOne(document.getId());
		document1.setName(document.getName());
		document1.setFileUnique(document.getFileUnique());
		document1.setPath(document.getPath());
		document1.setSize(document.getSize());
		document1.setType(document.getType());
		documentRepository.save(document1);
	}
}
