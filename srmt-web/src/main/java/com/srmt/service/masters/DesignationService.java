package com.srmt.service.masters;

import java.util.List;

import com.srmt.model.hrms.administration.Designation;
import com.srmt.service.GenericService;

public interface DesignationService extends GenericService<Designation, Long> {

	void add(Designation designation);

	void update(Long id, Designation designation) throws Exception;

	void delete(long id);

	List<Designation> getDesignations();

}