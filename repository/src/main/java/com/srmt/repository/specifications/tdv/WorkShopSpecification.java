package com.srmt.repository.specifications.tdv;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.hrms.administration.Location;
import com.srmt.model.sales.ShowRoom;
import com.srmt.model.sales.Workshop;

public final class WorkShopSpecification {
	
	static public Specification<Workshop> searchByShowroomCodeOrLocationId(String code, Long locationId) {
		return new Specification<Workshop>() {
			@Override
			public Predicate toPredicate(Root<Workshop> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (code != null) {
					predicates.add(cb.equal(root.<String> get("code"), code));
				}
				if (locationId != null) {
					predicates.add(cb.equal(root.<Location> get("location")
							.<Long> get("id"), locationId));

				}
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}

}
