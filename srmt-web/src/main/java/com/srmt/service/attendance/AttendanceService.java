package com.srmt.service.attendance;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.employee.Document;
import com.srmt.service.GenericService;

public interface AttendanceService extends GenericService<Attendance, Long> {

	List<Attendance> findAttendanceById(Long id);

	List<Attendance> findByDate(LocalDate localDate);

	void uploadAttendance(Document document) throws IOException;

	void update(Long id, Attendance attendance);

	Long countById(Long id);

	List<Attendance> findMonthlyAttendance(Long employeeId, int month,
			int year, int page, int size);

	int findMonthlyAttendanceCount(Long employeeId, Integer month,
			Integer year);

}
