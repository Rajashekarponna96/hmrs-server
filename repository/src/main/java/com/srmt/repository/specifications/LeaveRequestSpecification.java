package com.srmt.repository.specifications;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.hrms.leaveaManagement.LeaveRequest;
import com.srmt.model.hrms.leaveaManagement.LeaveRequestStatus;

@Component
public class LeaveRequestSpecification {

	private LeaveRequestSpecification() {

	}

	public static Specification<LeaveRequest> searchByEmployeeId(Long employeeId) {
		return new Specification<LeaveRequest>() {

			@Override
			public Predicate toPredicate(Root<LeaveRequest> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (employeeId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Long> get("id"), employeeId));
				} else {
					predicates.add(cb.equal(root.<LocalDate> get("fromDate"),
							LocalDate.now()));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
	}

	public static Specification<LeaveRequest> searchReportiesAttendanceByEmployeeId(
			Long superiorid, Long employeeId) {
		return new Specification<LeaveRequest>() {

			@Override
			public Predicate toPredicate(Root<LeaveRequest> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (employeeId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Long> get("id"), employeeId));
				}
				if (superiorid != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Employee> get("superior").<Long> get("id"),
							superiorid));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
	}

	public static Specification<LeaveRequest> validateLeaveRequest(Long empId,
			LocalDate fromDate, LocalDate toDate) {
		return new Specification<LeaveRequest>() {
			@Override
			public Predicate toPredicate(Root<LeaveRequest> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				Predicate predicate1 = cb.lessThanOrEqualTo(
						root.<LocalDate> get("fromDate"), fromDate);
				Predicate predicate2 = cb.greaterThanOrEqualTo(
						root.<LocalDate> get("toDate"), fromDate);

				Predicate condition1 = cb.and(predicate1, predicate2);

				Predicate predicate3 = cb.lessThanOrEqualTo(
						root.<LocalDate> get("fromDate"), toDate);
				Predicate predicate4 = cb.greaterThanOrEqualTo(
						root.<LocalDate> get("toDate"), toDate);

				Predicate condition2 = cb.and(predicate3, predicate4);

				predicates.add(cb.or(condition1, condition2));
				predicates.add(cb.equal(root.<Employee> get("employee")
						.<Long> get("id"), empId));
				predicates.add(cb.notEqual(
						root.<LeaveRequestStatus> get("status"), LeaveRequestStatus.Cancel));

				Predicate[] restrictions = new Predicate[predicates.size()];
				return cb.and(predicates.toArray(restrictions));
			}
		};
	}
}
