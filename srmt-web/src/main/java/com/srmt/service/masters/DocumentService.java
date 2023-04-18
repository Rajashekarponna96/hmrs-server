package com.srmt.service.masters;

import com.srmt.model.hrms.employee.Document;
import com.srmt.service.GenericService;

public interface DocumentService extends GenericService<Document, Long> {

	void addDocument(long id, Document document);

	void updateDocument(Long id, Document document);

	void delete(Long id);

}
