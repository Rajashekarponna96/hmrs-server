package com.srmt.repository.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.srmt.model.hrms.administration.BroadCastMessage;

@Component
public final class BroadCastMessageSpecification {

	public static Specification<BroadCastMessage> searchByType(String type) {
		return new Specification<BroadCastMessage>() {
			@Override
			public Predicate toPredicate(Root<BroadCastMessage> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (type != null) {
					predicates.add(cb.like(root.get("messageType"), type));
				}
				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
	}
}
