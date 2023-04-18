package com.srmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.srmt.filter.SRMTFilter;
import com.srmt.tdv.config.SecurityConfiguration;

@ComponentScan(basePackages = { "com.srmt.*" }, basePackageClasses = {
		SRMTFilter.class, SecurityConfiguration.class })
@Configuration
@EnableWebMvc
@EnableAutoConfiguration
@SpringBootApplication
@EnableWebSecurity
public class TdvApplication {

	public static void main(String[] args) {
		SpringApplication.run(TdvApplication.class, args);
	}
}
