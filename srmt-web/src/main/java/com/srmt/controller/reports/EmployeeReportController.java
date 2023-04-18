package com.srmt.controller.reports;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

import com.srmt.model.hrms.employee.Employee;
import com.srmt.repository.hrms.employee.EmployeeRepository;
import com.srmt.service.employee.EmployeeService;

@RestController
@RequestMapping("/reports")
public class EmployeeReportController {

	@Autowired
	private EmployeeService employeeService;

	@RequestMapping(value = "/employee", method = RequestMethod.GET)
	public ModelAndView getEmployeeReport() throws JRException, IOException {
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		parameterMap.put("startDate", LocalDate.now());

		List<Employee> employeeList = employeeService.findAll(0, 10);
		JRDataSource JRdataSource = new JRBeanCollectionDataSource(
				employeeList, true);
		parameterMap.put("dataSource", JRdataSource);
		ModelAndView modelAndView = new ModelAndView("employeeReport",
				parameterMap);
		return modelAndView;

	}

}
