package com.srmt.repository.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.srmt.model.hrms.administration.Act;
import com.srmt.model.hrms.administration.ActShedule;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.administration.Department;

@Component
public final class LocationDepartmentSpecification {

	private LocationDepartmentSpecification() {

	}

	public static Specification<Department> searchByActAndLocationAndDepartment(
			Long actId, Long locationId, Long departmentId) {

		return new Specification<Department>() {

			@Override
			public Predicate toPredicate(Root<Department> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (actId != null) {
					predicates.add(cb.equal(root.<ActShedule> get("actShedule")
							.<Act> get("act").<Long> get("id"), actId));
				}
				if (locationId != null) {
					predicates.add(cb.equal(root.<Location> get("location")
							.<Long> get("id"), locationId));
				}
				if (departmentId != null) {
					predicates
							.add(cb.equal(root.<Long> get("id"), departmentId));
				}
				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}
}
