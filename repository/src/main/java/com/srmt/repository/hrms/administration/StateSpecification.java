package com.srmt.repository.hrms.administration;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.common.lookups.Country;
import com.srmt.model.common.lookups.State;

public final class StateSpecification {
	static public Specification<State> searchStateByCountryName(Long id) {
		return new Specification<State>() {
			@Override
			public Predicate toPredicate(Root<State> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (id != null) {
					predicates.add(cb.equal(root.<Country> get("country").<Long> get("id"), id));
				}
				
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}
}
