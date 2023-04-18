package com.srmt.repository.hrms.employee;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.employee.Document;

@Repository
public interface DocumentRepository extends
		PagingAndSortingRepository<Document, Long> {

	List<Document> findByCategoryAndEmployee_Id(String category, Long id);

}
