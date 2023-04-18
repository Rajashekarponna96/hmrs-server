package com.srmt.service.attendance;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.arbiva.util.ExcelFileReader;
import com.srmt.model.hrms.attendance.Attendance;
import com.srmt.model.hrms.employee.Document;
import com.srmt.model.hrms.employee.Employee;
import com.srmt.repository.attendance.AttendanceRepository;
import com.srmt.repository.hrms.employee.EmployeeRepository;
import com.srmt.service.GenericServiceImpl;

@Service
public class AttendanceServiceImpl extends GenericServiceImpl<Attendance, Long>
		implements AttendanceService {

	@Autowired
	private AttendanceRepository attendanceRepository;

	@Autowired
	private EmployeeRepository employeeRepository;

	AttendanceServiceImpl() {
		super(Attendance.class);
	}

	@Override
	public List<Attendance> findAttendanceById(Long id) {
		return attendanceRepository.findByEmployee_Id(id);
	}

	@Override
	public List<Attendance> findByDate(LocalDate localDate) {
		return attendanceRepository.findByDate(localDate);
	}

	@Override
	public void uploadAttendance(Document document) throws IOException {
		com.arbiva.util.ExcelFileReader excelFileReader;
		XSSFSheet sheet;
		try {
			excelFileReader = new ExcelFileReader(document.getPath());

			sheet = excelFileReader.openSheet(0);
		} catch (org.apache.poi.POIXMLException ife) {
			throw new RuntimeException(
					"Invalid File Format. Please Upload only xlsx format");
		}
		Iterator<Row> rowIterator = sheet.iterator();
		Cell cell;
		Row row;
		ArrayList<Attendance> attendanceList = new ArrayList<Attendance>();
		rowIterator.next();
		try{
		while (rowIterator.hasNext()) {
			row = rowIterator.next();
			Attendance attendance = new Attendance();

			Employee employee = employeeRepository.findByEmployeeId(row
					.getCell(0).getStringCellValue());

			DateTimeFormatter dateFormatter = DateTimeFormatter
					.ofPattern("dd-MM-yyyy");
			LocalDate date = LocalDate.parse(row.getCell(1)
					.getStringCellValue(), dateFormatter);

			DateTimeFormatter timeformatter = DateTimeFormatter
					.ofPattern("HH:mm");
			LocalTime timein = LocalTime.parse(row.getCell(2)
					.getStringCellValue(), timeformatter);

			LocalTime timeout = LocalTime.parse(row.getCell(3)
					.getStringCellValue(), timeformatter);

			Attendance dayAttendance = attendanceRepository
					.findByDateAndEmployee_EmployeeId(date,
							employee.getEmployeeId());
			if (dayAttendance == null) {
				attendance.setDate(date);
				attendance.setTimeIn(timein);
				attendance.setTimeout(timeout);
				attendance.setEmployee(employee);
				attendanceList.add(attendance);
			} else {
				dayAttendance.setDate(date);
				dayAttendance.setTimeIn(timein);
				dayAttendance.setTimeout(timeout);
				dayAttendance.setEmployee(employee);
				attendanceList.add(dayAttendance);
			}

		}}
		catch(NullPointerException npe){
			throw new RuntimeException("The file or cells were not properly formatted");
		}
		attendanceRepository.save(attendanceList);

	}

	@Override
	public void update(Long id, Attendance attendance) {

		Attendance attendanceById = super.findBy(Attendance.class, id);
		attendanceById.setCommnets(attendance.getCommnets());
		attendanceById.setTimeIn(attendance.getTimeIn());
		attendanceById.setTimeout(attendance.getTimeout());
		attendanceById.setDate(attendance.getDate());
		attendanceById.setEmployee(attendance.getEmployee());
		attendanceRepository.save(attendanceById);

	}

	@Override
	public Long countById(Long id) {
		return attendanceRepository.countByEmployee_Id(id);
	}

	@Override
	public List<Attendance> findMonthlyAttendance(Long employeeId, int month,
			int year, int page, int size) {

		return attendanceRepository.findMonthlyAttendance(employeeId, month,
				year, new PageRequest(page, size));
	}

	@Override
	public int findMonthlyAttendanceCount(Long employeeId, Integer month,
			Integer year) {

		return attendanceRepository.findMonthlyAttendanceCount(employeeId,
				month, year).size();
	}
}
