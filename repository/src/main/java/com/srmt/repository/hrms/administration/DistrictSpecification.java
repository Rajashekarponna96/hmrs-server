package com.srmt.repository.hrms.administration;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.common.lookups.District;
import com.srmt.model.common.lookups.State;

public final class DistrictSpecification {
	static public Specification<District> searchDistrictByStateId(Long stateId) {
		return new Specification<District>() {
			@Override
			public Predicate toPredicate(Root<District> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (stateId != null) {
					predicates.add(cb.equal(root.<State> get("state").<Long> get("id"), stateId));
				}
				
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}
}
