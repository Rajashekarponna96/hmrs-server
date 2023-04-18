package com.srmt.controller.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.administration.DocumentCategory;
import com.srmt.model.hrms.employee.Document;
import com.srmt.service.masters.DocumentCategoryMasterService;
import com.srmt.service.masters.DocumentService;

@RestController
@RequestMapping("/documentCategoryMaster")
public class DocumentCategoryMasterController {

	@Autowired
	private DocumentCategoryMasterService documentCategoryMasterService;
	@Autowired
	private DocumentService documentService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void add(@RequestBody DocumentCategory documentCategoryMaster) {
		documentCategoryMasterService.add(documentCategoryMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody DocumentCategory categoryMaster) {
		documentCategoryMasterService.update(id, categoryMaster);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteById(@PathVariable("id") Long id) {
		documentCategoryMasterService.deleteById(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DocumentCategory findById(@PathVariable("id") Long id) {
		return documentCategoryMasterService.findById(id);
	}

	@RequestMapping(value = "/pagination", method = RequestMethod.GET)
	public List<DocumentCategory> getByPageAndSize(
			@RequestParam("page") int page, @RequestParam("size") int size) {
		return documentCategoryMasterService.getByPageAndSize(page, size);
	}

	@RequestMapping(value = "/count", method = RequestMethod.GET)
	public long getCount() {
		return documentCategoryMasterService.getCount();
	}

	@RequestMapping(value = "/{id}/document", method = RequestMethod.POST)
	public void addDocument(@PathVariable("id") long id,
			@RequestBody Document document) {
		documentService.addDocument(id, document);
	}

	@RequestMapping(value = "/{id}/document", method = RequestMethod.PUT)
	public void updateDocument(@PathVariable("id") Long id,
			@RequestBody Document document) {
		documentService.updateDocument(id, document);
	}
}
