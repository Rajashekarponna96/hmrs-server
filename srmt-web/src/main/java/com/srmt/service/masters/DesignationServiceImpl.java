package com.srmt.service.masters;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.srmt.model.hrms.administration.Designation;
import com.srmt.repository.hrms.administration.DesignationRepository;
import com.srmt.rest.repository.GenericSpecification;
import com.srmt.service.GenericServiceImpl;

@Service
public class DesignationServiceImpl extends
		GenericServiceImpl<Designation, Long> implements DesignationService {

	private GenericSpecification genericSpecification;
	@Autowired
	private DesignationRepository designationRepository;

	public DesignationServiceImpl() {
		super(Designation.class);
		genericSpecification = new GenericSpecification();
	}

	public void add(Designation entity) {
		super.add(Designation.class, entity.getCode(),
				genericSpecification.findByProperty("code", entity.getCode()),
				entity);

	}

	@Override
	public Designation findBy(Class<Designation> clazz, Long id) {
		return super.findBy(clazz, id);
	}

	@Override
	public List<Designation> findAll(Integer page, Integer size) {
		return super.findAll(page, size);
	}

	@Override
	public List<Designation> findAll(Specification<Designation> specification,
			Integer page, Integer size) {
		return super.findAll(page, size);
	}

	public void update(Long id, Designation entity) throws Exception {
		super.update(Designation.class, id,
				genericSpecification.findByProperty("code", entity.getCode()),
				entity);
	}

	@Override
	public void delete(Long id) {
		super.delete(id);
	}

	@Override
	public long count() {
		return super.count();
	}

	@Override
	public void delete(long id) {
		super.delete(id);
	}

	@Override
	public List<Designation> getDesignations() {

		return (List<Designation>) designationRepository.findAll();
	}

}
