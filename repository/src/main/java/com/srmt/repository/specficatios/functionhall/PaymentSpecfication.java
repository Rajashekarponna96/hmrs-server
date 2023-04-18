package com.srmt.repository.specficatios.functionhall;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.crm.fh.Booking;
import com.srmt.model.crm.fh.FunctionHallEnquiry;
import com.srmt.model.crm.fh.Payment;
import com.srmt.model.hrms.Person;

public class PaymentSpecfication {

	private PaymentSpecfication() {

	}

	public static Specification<Payment> search(LocalDate date,
			String paymentType, String mobile, Long bookingId) {
		return new Specification<Payment>() {

			@Override
			public Predicate toPredicate(Root<Payment> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (date != null) {
					predicates.add(cb.equal(root.get("paymentDate"), date));
				}
				if (paymentType != null) {
					predicates.add(cb.equal(root.get("paymentType"),
							paymentType));
				}
				if (mobile != null) {
					predicates.add(cb.equal(root.<Booking> get("booking")
							.<FunctionHallEnquiry> get("functionHallEnquiry")
							.<Person> get("customer").get("mobile"), mobile));
				}
				if (bookingId != null) {
					predicates
							.add(cb.equal(
									root.<Booking> get("booking").get("id"),
									bookingId));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
	}

	public static Specification<Payment> searchByRecieptIdAndDate(
			LocalDate thisDate, String recieptId) {
		return new Specification<Payment>() {

			@Override
			public Predicate toPredicate(Root<Payment> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (thisDate != null) {
					predicates.add(cb.equal(root.get("paymentDate"), thisDate));
				}

				if (recieptId != null) {
					predicates.add(cb.equal(root.get("receiptNumber"),
							recieptId));
				}

			
				predicates.add(cb.equal(root.<Booking> get("booking")
						.<FunctionHallEnquiry> get("functionHallEnquiry")
						.<String> get("purpose"), "Marriage"));

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
	}

}
