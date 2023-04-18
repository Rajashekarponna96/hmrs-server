package com.srmt.repository.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.srmt.model.common.lookups.State;
import com.srmt.model.hrms.administration.Holiday;
import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.Location;

@Component
public final class HolidaySpecification {
	private HolidaySpecification() {

	}

	public static Specification<Holiday> searchByLeavePeriodAndState(
			Long leaveperiodId, Long stateId) {

		return new Specification<Holiday>() {

			@Override
			public Predicate toPredicate(Root<Holiday> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (leaveperiodId != null) {
					predicates.add(cb.equal(
							root.<LeavePeriod> get("leavePeriod").<Long> get(
									"id"), leaveperiodId));
				}
				if (stateId != null) {
					predicates.add(cb.equal(root.<Location> get("location").<State> get("state")
							.<Long> get("id"), stateId));
				}
				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}

}
