package com.srmt.controller.attendance;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.employee.Document;
import com.srmt.service.attendance.AttendanceService;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

	@Autowired
	private AttendanceService attendanceService;

	@RequestMapping(value = "/byDate", method = RequestMethod.GET)
	public List<Attendance> findByDate(@RequestParam("date") String localDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		LocalDate date = LocalDate.parse(localDate, formatter);
		return attendanceService.findByDate(date);
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public void uploadAttendance(@RequestBody Document document)
			throws IOException {

		attendanceService.uploadAttendance(document);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") Long id,
			@RequestBody Attendance attendance) {
		attendanceService.update(id, attendance);
	}
}
