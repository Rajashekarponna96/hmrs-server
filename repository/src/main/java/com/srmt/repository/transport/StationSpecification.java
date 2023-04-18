package com.srmt.repository.transport;

import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle.Control;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.transport.Station;

public class StationSpecification {

	public static Specification<Station> searchStationByControlName(Long id) {
		return new Specification<Station>() {
			@Override
			public Predicate toPredicate(Root<Station> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (id != null) {
					predicates.add(cb.equal(root.<Control> get("control").<Long> get("id"), id));
				}
				
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}

}
