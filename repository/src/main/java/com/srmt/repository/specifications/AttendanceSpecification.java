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

import com.srmt.model.hrms.administration.Department;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.employee.Employee;

@Component
public final class AttendanceSpecification {

	private AttendanceSpecification() {

	}

	public static Specification<Attendance> searchByIdAndDate(Long superiorId,
			Long employeeId, LocalDate date) {

		return new Specification<Attendance>() {

			@Override
			public Predicate toPredicate(Root<Attendance> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				predicates.add(cb.equal(root.<Employee> get("employee")
						.<Employee> get("superior").<Long> get("id"),
						superiorId));

				if (employeeId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Long> get("id"), employeeId));
				}

				if (date != null) {
					predicates.add(cb.equal(root.get("date"), date));
				}
				predicates.add(cb.equal(root.<Employee> get("employee")
						.<Long> get("active"), true));
				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}

	public static Specification<Attendance> searchByEmployeeLocationDepartmentAndDate(
			Long superiorId, Long employeeId, Long locationId,
			Long departmentId, LocalDate fromDate, LocalDate toDate) {

		return new Specification<Attendance>() {

			@Override
			public Predicate toPredicate(Root<Attendance> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				predicates.add(cb.equal(root.<Employee> get("employee")
						.<Employee> get("superior").<Long> get("id"),
						superiorId));

				if (employeeId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Long> get("id"), employeeId));
				}

				if (fromDate != null && toDate != null) {
					predicates.add(cb.between(root.get("date"), fromDate,
							toDate));
				} else {
					predicates.add(cb.equal(root.get("date"), LocalDate.now()));
				}
				if (departmentId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Department> get("department").<Long> get("id"),
							departmentId));
				}
				if (locationId != null) {
					predicates.add(cb.equal(
							root.<Employee> get("employee")
									.<Department> get("department")
									.<Location> get("location")
									.<Long> get("id"), locationId));
				}
				predicates.add(cb.equal(root.<Employee> get("employee")
						.<Long> get("active"), true));
				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}

	public static Specification<Attendance> searchAllEmployeeByEmployeeLocationDepartmentAndDate(
			Long employeeId, Long locationId, Long departmentId,
			LocalDate fromDate, LocalDate toDate) {

		return new Specification<Attendance>() {

			@Override
			public Predicate toPredicate(Root<Attendance> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				if (employeeId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Long> get("id"), employeeId));
				}

				if (fromDate != null && toDate != null) {
					predicates.add(cb.between(root.get("date"), fromDate,
							toDate));
				} else {
					predicates.add(cb.equal(root.get("date"), LocalDate.now()));
				}
				if (departmentId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Department> get("department").<Long> get("id"),
							departmentId));
				}
				if (locationId != null) {
					predicates.add(cb.equal(
							root.<Employee> get("employee")
									.<Department> get("department")
									.<Location> get("location")
									.<Long> get("id"), locationId));
				}
				predicates.add(cb.equal(root.<Employee> get("employee")
						.<Long> get("active"), true));
				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}
}
