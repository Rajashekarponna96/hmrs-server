package com.srmt.repository.specifications.tdv;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.crm.fh.FunctionHall;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.sales.ShowRoom;

public final class ShowroomSpecifications {

	static public Specification<ShowRoom> searchByShowroomCodeOrLocationId(String code, Long locationId) {
		return new Specification<ShowRoom>() {
			@Override
			public Predicate toPredicate(Root<ShowRoom> root,
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
