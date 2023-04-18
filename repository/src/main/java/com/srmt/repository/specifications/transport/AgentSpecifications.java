package com.srmt.repository.specifications.transport;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.transport.Agent;
import com.srmt.model.transport.Station;

public final class AgentSpecifications {
	
	public static Specification<Agent> searchAgentByStationId(Long stationId) {
		return new Specification<Agent>() {
			@Override
			public Predicate toPredicate(Root<Agent> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (stationId != null) {
					predicates.add(cb.equal(root.<Station> get("station").<Long> get("id"), stationId));
				}
				
				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}
}