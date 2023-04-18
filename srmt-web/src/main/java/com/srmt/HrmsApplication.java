package com.srmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

import com.srmt.common.CORSSecurityFilter;
import com.srmt.config.CustomUserDetailsService;
import com.srmt.config.SecurityConfiguration;
import com.srmt.controller.usermanagement.UserController;
import com.srmt.service.usermanagement.RoleService;

@SpringBootApplication
@ComponentScan(basePackages = { "com.srmt.*" }, basePackageClasses = {
		UserController.class, RoleService.class,  CORSSecurityFilter.class,
		SecurityConfiguration.class, CustomUserDetailsService.class })
@EnableWebMvc
@EnableWebSecurity
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories
@EnableJpaAuditing
@EnableAutoConfiguration
public class HrmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrmsApplication.class, args);
	}

	@Bean
	JasperReportsPdfView employeeReport() {
		JasperReportsPdfView view = new JasperReportsPdfView();
		view.setUrl("classpath:jasper/employeeReport.jrxml");
		view.setReportDataKey("dataSource");
		return view;
	}
}
