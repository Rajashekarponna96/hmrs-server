package com.srmt.repository.hrms.administration;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.administration.Holiday;
import com.srmt.model.hrms.administration.LeavePeriod;
import com.srmt.model.hrms.administration.Location;

@Repository
public interface HolidayRepository extends
		PagingAndSortingRepository<Holiday, Long>,
		JpaSpecificationExecutor<Holiday> {

	public static final class SPECIFICATIONS {
		public Specification<Holiday> findByLeavePeriodAndName(
				Long leavePeriodId, String name) {
			return new Specification<Holiday>() {
				@Override
				public Predicate toPredicate(Root<Holiday> root,
						CriteriaQuery<?> query, CriteriaBuilder cb) {

					List<Predicate> predicates = new ArrayList<Predicate>();

					predicates.add(cb.equal(
							root.<LeavePeriod> get("leavePeriod").<Long> get(
									"id"), leavePeriodId));
					predicates.add(cb.equal(root.<String> get("holidayName"),
							name));

					return cb.and(predicates.toArray(new Predicate[] {}));
				}
			};
		}
	}

	String FIND_HOLIDAY = "select holiday from Holiday holiday where holiday.leavePeriod.startDate >=:date AND holiday.leavePeriod.endDate <=:date";

	@Query(FIND_HOLIDAY)
	Holiday findHoliday(@Param("date") LocalDate date);
 
	List<Holiday> findByHolidayDateAndLocationAndHolidayName(LocalDate date, Location location, String holidayName);

}
