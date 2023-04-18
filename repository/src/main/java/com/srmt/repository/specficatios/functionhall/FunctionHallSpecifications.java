package com.srmt.repository.specficatios.functionhall;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.crm.fh.FunctionHall;

public final class FunctionHallSpecifications {

	public Specification<FunctionHall> findBy(String code, String name) {
		return new Specification<FunctionHall>() {
			@Override
			public Predicate toPredicate(Root<FunctionHall> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.get("code"), code));
				predicates.add(cb.equal(root.get("name"), name));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}
}
