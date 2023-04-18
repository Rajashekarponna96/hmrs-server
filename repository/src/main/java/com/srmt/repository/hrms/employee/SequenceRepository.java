package com.srmt.repository.hrms.employee;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.Sequence;

@Repository
public interface SequenceRepository extends
		PagingAndSortingRepository<Sequence, Long> {

	Sequence findByName(String string);

}
