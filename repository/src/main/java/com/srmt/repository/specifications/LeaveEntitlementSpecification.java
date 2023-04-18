package com.srmt.repository.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.LeaveType;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.model.hrms.leaveaManagement.LeaveEntitlement;

@Component
public final class LeaveEntitlementSpecification {

	private LeaveEntitlementSpecification() {

	}

	public static Specification<LeaveEntitlement> searchByLeavePeriodAndLeaveTypeAndEmployee(
			Long periodId, Long leaveTypeId, Long employeeId) {

		return new Specification<LeaveEntitlement>() {
			@Override
			public Predicate toPredicate(Root<LeaveEntitlement> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (employeeId != null) {
					predicates.add(cb.equal(root.<Employee> get("employee")
							.<Long> get("id"), employeeId));
				}
				if (periodId != null) {
					predicates.add(cb.equal(
							root.<LeavePeriod> get("leavePeriod").<Long> get(
									"id"), periodId));
				}
				if (leaveTypeId != null) {
					predicates.add(cb.equal(root.<LeaveType> get("leaveType")
							.<Long> get("id"), leaveTypeId));
				}
				return cb.and(predicates.toArray(new Predicate[] {}));

			}
		};

	}
}
