package com.srmt.tdv.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

@Configuration
public class ReportViewController {

	@Bean
	JasperReportsPdfView quotationView() {
		JasperReportsPdfView view = new JasperReportsPdfView();
		view.setUrl("classpath:jasper/quotation.jrxml");
		view.setReportDataKey("dataSource");
		return view;
	}
}
