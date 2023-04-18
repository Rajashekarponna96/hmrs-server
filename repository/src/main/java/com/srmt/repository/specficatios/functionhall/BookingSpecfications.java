package com.srmt.repository.specficatios.functionhall;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.crm.fh.Booking;
import com.srmt.model.crm.fh.BookingStatus;
import com.srmt.model.crm.fh.FunctionHall;
import com.srmt.model.crm.fh.FunctionHallEnquiry;
import com.srmt.model.hrms.Person;

public class BookingSpecfications {

	private BookingSpecfications() {

	}

	public static Specification<Booking> search(LocalDate date, String mobile,
			String functionType) {
		return new Specification<Booking>() {

			@Override
			public Predicate toPredicate(Root<Booking> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (date != null) {
					predicates.add(cb.equal(root.get("fromDateTime"), date));
				}
				if (mobile != null) {
					predicates.add(cb.equal(root.<Person> get("customer")
							.<String> get("mobile"), mobile));
				}
				if (functionType != null) {
					predicates.add(cb.equal(
							root.<FunctionHallEnquiry> get(
									"functionHallEnquiry").<String> get(
									"purpose"), functionType));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
	}

	public static Specification<Booking> search(LocalDateTime thisFormDateTime,
			LocalDateTime thisToDateTime, String mobile, String functionType) {

		return new Specification<Booking>() {

			@Override
			public Predicate toPredicate(Root<Booking> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (thisFormDateTime != null) {
					predicates.add(cb.greaterThan(root.get("fromDateTime"),
							thisFormDateTime));
				}
				if (thisToDateTime != null) {
					predicates.add(cb.lessThan(root.get("toDateTime"),
							thisToDateTime));
				}
				if (mobile != null) {
					predicates.add(cb.equal(root.<Person> get("customer")
							.<String> get("mobile"), mobile));
				}
				if (functionType != null) {
					predicates.add(cb.equal(
							root.<FunctionHallEnquiry> get(
									"functionHallEnquiry").<String> get(
									"purpose"), functionType));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};

	}

	public static Specification<Booking> searchNonBookingSummary(
			LocalDate thisFormDate, LocalDate thisToDate, Long functionHallId) {

		return new Specification<Booking>() {

			@Override
			public Predicate toPredicate(Root<Booking> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (thisFormDate != null && thisToDate != null) {
					LocalDateTime fromLocalDateTime = thisFormDate.atTime(0, 0,
							0);
					LocalDateTime toLocalDateTime = thisToDate.atTime(23, 59,
							59);

					predicates.add(cb.or(cb.between(
							root.<LocalDateTime> get("fromDateTime"),
							fromLocalDateTime, toLocalDateTime), cb.between(
							root.<LocalDateTime> get("toDateTime"),
							fromLocalDateTime, toLocalDateTime)));

				}
				if (functionHallId != null) {
					predicates.add(cb.equal(
							root.<FunctionHallEnquiry> get("functionHallEnquiry").<FunctionHall> get(
									"functionHall").<Long> get("id"), functionHallId));
				}

				predicates.add(cb.equal(
						root.<FunctionHallEnquiry> get("functionHallEnquiry")
								.<BookingStatus> get("bookingStatus"),
						BookingStatus.confirm));

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};

	}
	
	public static Specification<Booking> searchByMarriageDateAndCustomerPhoneNuberForMarriageCertificate(
			LocalDate marriageDate,String CustomerPhoneNumber) {

		return new Specification<Booking>() {

			@Override
			public Predicate toPredicate(Root<Booking> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<Predicate>();
				if (marriageDate != null) {
					LocalDateTime fromLocalDateTime = marriageDate.atTime(0, 0,
							0);
					LocalDateTime toLocalDateTime = marriageDate.atTime(23, 59,
							59);
					
					predicates.add(cb.between(
							root.<LocalDateTime> get("marriageDate"),
							fromLocalDateTime, toLocalDateTime));


					/*predicates.add(cb.equal(
							root.<LocalDateTime> get("marriageDate"),marriageDate
							));*/

				}
				if (CustomerPhoneNumber != null) {
					predicates.add(cb.equal(
							root.<FunctionHallEnquiry> get("functionHallEnquiry").<Person> get(
									"customer").<String> get("mobile"), CustomerPhoneNumber));
				}
				
				predicates.add(cb.isNotNull(root.<LocalDateTime> get("marriageDate")));
				predicates.add(cb.equal(
						root.<FunctionHallEnquiry> get("functionHallEnquiry")
								.<BookingStatus> get("bookingStatus"),
						BookingStatus.confirm));

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};

	}
}
