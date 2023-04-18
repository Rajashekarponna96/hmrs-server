package com.srmt.repository.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.srmt.model.hrms.administration.Department;
import com.srmt.model.hrms.administration.EmploymentType;
import com.srmt.model.hrms.administration.Location;
import com.srmt.model.hrms.employee.Employee;

public final class EmployeeSpecification {

	private EmployeeSpecification() {
	}

	static public Specification<Employee> Search(String employeeId, Long id,
			Long departmentId, Long employmentTypeId, Long designationId) {
		return new Specification<Employee>() {

			@Override
			public Predicate toPredicate(Root<Employee> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (employeeId != null) {
					predicates
							.add(cb.equal(root.get("employeeId"), employeeId));
				}
				if (id != null) {
					predicates.add(cb.equal(root.get("id"), id));
				}
				if (departmentId != null) {
					predicates.add(cb.equal(root.<Department> get("department")
							.<Long> get("id"), departmentId));
				}
				if (employmentTypeId != null) {
					predicates.add(cb.equal(
							root.<EmploymentType> get("employmentType")
									.<Long> get("id"), employmentTypeId));
				}
				if (employmentTypeId != null) {
					predicates.add(cb.equal(
							root.<EmploymentType> get("employmentType")
									.<Long> get("id"), employmentTypeId));
				}
				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}

	static public Specification<Employee> searchSalesRepresentativeBysalesRepCodeAndmobile(
			String salesRepCode, String mobile) {
		return new Specification<Employee>() {

			@Override
			public Predicate toPredicate(Root<Employee> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				if (salesRepCode != null) {
					predicates.add(cb.equal(root.<String> get("salesRepCode"),
							salesRepCode));
				} else {
					predicates.add(cb.isNotNull(root
							.<String> get("salesRepCode")));
				}
				if (mobile != null) {
					predicates
							.add(cb.equal(root.<String> get("mobile"), mobile));
				}

				return cb.and(predicates.toArray(new Predicate[] {}));
			}

		};
	}

	public static Specification<Employee> searchEmployeeByIdAndLocationAndDepartment(Long employeeId,Long locationId,Long departmentId){
		return new Specification<Employee>() {

			@Override
			public Predicate toPredicate(Root<Employee> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates=new ArrayList<Predicate>();
				if(employeeId!=null){
					predicates.add(cb.equal(root.<String> get("employeeId"), employeeId));
				}
				if(locationId!=null){
					predicates.add(cb.equal(root.<Department> get("department").<Location> get("location").<Long> get("id"), locationId));
				}
				
				if(departmentId!=null){
					predicates.add(cb.equal(root.<Department> get("department").<Long> get("id"), departmentId));
				}
				return cb.and(predicates.toArray(new Predicate[] {}));
			}
		};
		
	}
}
