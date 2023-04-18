package com.srmt.repository.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;

public final class ActSheduleSpecification {
	public static Specification<ActShedule> searchActShedulesByActId(
			Long actId) {

		return new Specification<ActShedule>() {

			@Override
			public Predicate toPredicate(Root<ActShedule> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				
				if (actId != null) {
					predicates.add(cb.equal(
							root.<Act> get("act").<Long> get(
									"id"), actId));
				}

				

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};

	}
}
