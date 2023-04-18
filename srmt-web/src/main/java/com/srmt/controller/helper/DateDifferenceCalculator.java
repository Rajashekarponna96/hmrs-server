package com.srmt.controller.helper;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.arbiva.date.LocalDateRange;

@RestController
@RequestMapping("/DateDifference")
public class DateDifferenceCalculator {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public Long getDifference(@RequestParam("fromDate") String fromDate,
			@RequestParam("toDate") String toDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		LocalDate thisFromDate = LocalDate.now();
		LocalDate thisToDate = LocalDate.now();
		if (fromDate != null) {
			thisFromDate = LocalDate.parse(fromDate, formatter);
		}
		if (toDate != null) {
			thisToDate = LocalDate.parse(toDate, formatter);
		}
		if (thisFromDate.isAfter(thisToDate))
			throw new RuntimeException(
					"To-Date cannot be earlier than From-Date");

		return new LocalDateRange(thisFromDate, thisToDate).getPeriodinDays()+1;
	}
}
