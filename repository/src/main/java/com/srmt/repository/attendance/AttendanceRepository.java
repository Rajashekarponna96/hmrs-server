package com.srmt.repository.attendance;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.srmt.model.hrms.attendance.Attendance;

@Repository
public interface AttendanceRepository extends
		PagingAndSortingRepository<Attendance, Long>,
		JpaSpecificationExecutor<Attendance> {

	static final String FINDBY_EMPLOYEEID_DATE = "select attendance from Attendance attendance where attendance.date=:date and attendance.employee.employeeId=:employeeId";

	static final String FIND_MONTHLY_ATTENDANCE = "select attendance from Attendance attendance where MONTH(attendance.date)=:month and YEAR(attendance.date)=:year and attendance.employee.id=:employeeId";

	
	static final String FIND_MONTHLY_ATTENDANCE_COUNT = "select count(*) from Attendance attendance where MONTH(attendance.date)=:month and YEAR(attendance.date)=:year and attendance.employee.id=:employeeId";

	List<Attendance> findByEmployee_Id(Long id);

	List<Attendance> findByDate(LocalDate localDate);

	@Query(FINDBY_EMPLOYEEID_DATE)
	Attendance findByDateAndEmployee_EmployeeId(@Param("date") LocalDate date,
			@Param("employeeId") String employeeId);

	Long countByEmployee_Id(Long id);

	@Query(FIND_MONTHLY_ATTENDANCE)
	List<Attendance> findMonthlyAttendance(
			@Param("employeeId") Long employeeId, @Param("month") int month,
			@Param("year") int year, Pageable pageRequest);
	
	@Query(FIND_MONTHLY_ATTENDANCE)
	List<Attendance> findMonthlyAttendanceCount(
			@Param("employeeId") Long employeeId, @Param("month") int month,
			@Param("year") int year);


}
