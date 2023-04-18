package com.srmt.repository.specficatios.functionhall;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.crm.fh.FunctionHall;
import com.srmt.model.crm.fh.FunctionHallEnquiry;
import com.srmt.model.hrms.Person;
import com.srmt.model.hrms.administration.EmploymentType;

public class FunctionHallEnquirySpecifications {

	private FunctionHallEnquirySpecifications() {

	}

	public static Specification<FunctionHallEnquiry> Search(
			LocalDate enquiryFromDate, LocalDate enquiryToDate, Long hallId,
			String mobileNumber) {
		return new Specification<FunctionHallEnquiry>() {

			@Override
			public Predicate toPredicate(Root<FunctionHallEnquiry> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if(enquiryFromDate != null && enquiryToDate != null)
				{
					predicates
					.add(cb.greaterThanOrEqualTo(root.get("enquiredOn"), enquiryFromDate));
					predicates
					.add(cb.lessThanOrEqualTo(root.get("enquiredOn"), enquiryToDate));
				}
				/*if (enquiryFromDate != null) {
					predicates
							.add(cb.greaterThan(root.get("enquiredOn"), enquiryFromDate));
				}
				if (enquiryToDate != null) {
					predicates.add(cb.lessThan(root.get("enquiredOn"),
							enquiryToDate));
				}*/
				if (hallId != null) {
					predicates.add(cb.equal(
							root.<FunctionHall> get("functionHall").<Long> get(
									"id"), hallId));
				}
				if (mobileNumber != null) {
					predicates.add(cb.equal(root.<Person> get("customer")
							.<String> get("mobile"), mobileNumber));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}
}
